const Film = require('../models/film');
const User = require('../models/user');
const Actor = require('../models/actor');
const Viewer = require('../models/viewer');
const bcrypt = require('bcryptjs');
const nodemailer = require("nodemailer")
const jwt = require('jsonwebtoken');
const moment = require('moment');
class adminController {
    //[GET] /films
    films(req, res, next){
        Film.find({})
            .then(films => res.json(films))
            .catch(next)
    }
    //[POST] /films/create
    createFilm(req, res, next){
        Film.findOne({imdbID : req.body.imdbID})
            .then((film)=>{
                if (film === null){
                    Film.create(req.body)
                    res.status(201).send('Created!')
                }else{
                    res.status(404).send('Duplicate!')
                }
            })
            .catch((err)=>{
                console.log(err)
            })
    }
    //[GET] /films/:id
    film(req, res, next){
        Film.findOne({imdbID: req.params.id})
            .then((film)=> res.json(film))
            .catch(next)
    }
    //[PUT] /films/:id/update
    updateFilm(req, res, next){
        Film.updateOne({imdbID: req.params.id}, req.body)
            .then(()=>res.status(201).send('Updated!'))
            .catch(next)
    }
    //[POST] /admin/login
    async login(req, res, next){
        try {
            const user = await User.findOne({ email: req.body.email });
            if (user) {
                const cmp = await bcrypt.compare(
                    req.body.password,
                    user.password,
                );
                if (cmp) {
                    var token = jwt.sign({
                        _id: user._id
                    },'xemphim529')
                    return res.json({
                        message: 'successfully',
                        token: token
                    })
                } else {
                    return res.send('invalid')
                }
            } else {
                return res.send('invalid');
            }
        } catch (error) {
            console.log(error);
            res.status(500).send('error');
        }
    }
    //[GET] /home
    index(req, res, next){
        const user = req.data
        
        res.json({user,data:{abc:'abc'}})
    }
    //[GET] /users
    users(req, res, next){
        User.find({role: 'Mod'})
            .then(users => res.json(users))
            .catch(next)
    }
    //[GET] /users/:id
    user(req, res, next){
        User.findOne({_id: req.params.id})
            .then((user)=> res.json(user))
            .catch(next)
    }
    //[PUT] /users/:id/update
    async updateUser(req, res, next){
        try{
            const saltRounds = 10;
            const hashedPwd = await bcrypt.hash(req.body.password, saltRounds);
            const update = await User.updateOne({_id: req.params.id},{
                password: hashedPwd
            })
                .then(()=>res.send('Updated'))
                .catch(err=>console.log(err))
        }catch(err){
            res.status(500).send('error')
        }
        
    }
    //[DELETE] /user/:id/delete
    deleteUser(req, res, next){
        User.deleteOne({_id: req.params.id})
            .then(()=>res.send('deleted'))
            .catch((err)=> res.status(500).send('error'))
    }
    //[DELETE] /film/:id/delete
    deleteFilm(req, res, next){
        Film.deleteOne({_id: req.params.id})
            .then(()=>res.send('deleted'))
            .catch((err)=> res.status(500).send('error'))
    }
    //[DELETE] /actor/:id/delete
    deleteActor(req, res, next){
        Actor.deleteOne({_id: req.params.id})
            .then(()=>res.send('deleted'))
            .catch((err)=> res.status(500).send('error'))
    }
    //[DELETE] /viewer/:id/delete
    deleteViewer(req, res, next){
        Viewer.deleteOne({_id: req.params.id})
            .then(()=>res.send('deleted'))
            .catch((err)=> res.status(500).send('error'))
    }
    //[POST] /signup
    async signup(req, res, next){
        var smtpTransport = nodemailer.createTransport({
            service: "gmail",
            host: 'smtp.gmail.com',
            port: 465,
            secure: true, 
            auth: {
                user: process.env.NODEMAILER_EMAIL,
                pass: process.env.NODEMAILER_PASSWORD
            }
        });
        var mailOptions = {
            from: "XemPhim529 ✔ <thinhst@gmail.com>", // sender address
            to: req.body.email, // list of receivers
            subject: "Admin XemPhim529 vừa tạo tài khoản dành cho bạn", // Subject line
            text: "Admin XemPhim529 vừa tạo tài khoản dành cho bạn", // plaintext body
            html: `<b>Welcome ${req.body.fullName} đã gia nhập Ban quản trị tại XemPhim529!!! <br>
            Sau đây là thông tin tài khoản của bạn: email đăng ký: ${req.body.email} - mật khẩu: ${req.body.password}.<br>
            ,hãy nhấn <a href='https://movie-app-cpthinh.netlify.app/admin/login'>vào đây</a> để đăng nhập tài khoản của bạn.</b>` // html body
        }
        
        try {
            const saltRounds = 10;
            const hashedPwd = await bcrypt.hash(req.body.password, saltRounds);
            const user = await User.findOne({ email: req.body.email });
            if (user) {
                res.send('email-duplicate');
            } else {
                const insertResult = await User.create({
                    fullName: req.body.fullName,
                    email: req.body.email,
                    phoneNumber: req.body.phoneNumber,
                    password: hashedPwd,
                    role: 'Mod',
                });
                smtpTransport.sendMail(mailOptions, function(error, response){
                    if(error){
                        console.log(error);
                    }else{
                        console.log("Message sent: " + response.message);
                    }
                })
                res.send('created');
            }
        } catch (error) {
            res.status(500).send('Internal Server error Occured');
        }
    }
    //[GET] /viewers
    viewers(req, res, next){
        Viewer.find({})
            .then(viewers => res.json(viewers))
            .catch(next)
    }
    //[GET] /actors
    actors(req, res, next){
        Actor.find({})
            .then(actors => res.json(actors))
            .catch(next)
    }
    //[POST] /actors/create
    createActor(req, res, next){
        Actor.findOne({id : req.body.id})
            .then((actor)=>{
                if (actor === null){
                    Actor.create(req.body)
                    res.status(201).send('Created!')
                }else{
                    res.status(404).send('Duplicate!')
                }
            })
            .catch((err)=>{
                console.log(err)
            })
    }
    //[GET] /actors/:id
    actor(req, res, next){
        Actor.findOne({id: req.params.id})
            .then((actor)=> res.json(actor))
            .catch(next)
    }
    //[PUT] /actors/:id/update
    updateActor(req, res, next){
        Actor.updateOne({id: req.params.id}, req.body)
            .then(()=>res.status(201).send('Updated!'))
            .catch(err=>res.send('error'))
    }
    //[GET] //views-chart
    viewsChart(req, res, next){
        Viewer.find({})
            .then((viewer)=>{
                //Tạo ds 7 ngày trong tuần
                var toDay = moment(new Date()).format("DD/MM/YYYY")
                var weekDays = [toDay]
                for(var i = 1; i <= 6; i++){
                    weekDays.push(moment(moment().subtract(i, 'day').toDate()).format("DD/MM/YYYY"))
                }
                var data = []
                //Lấy ra ds ngày xem+lượt xem trong 1 tuần
                for(var n = 0; n < weekDays.length; n++){
                    var listOnDay = []
                    for(var i = 0; i < viewer.length; i++){
                        for(var j = 0; j < viewer[i].collectionFilms.length; j++){
                            var watchDay = moment(viewer[i].collectionFilms[j].watchedAt).format("DD/MM/YYYY")
                            if(watchDay === weekDays[n]){
                                listOnDay.push(viewer[i].collectionFilms[j])
                            }
                        }
                    }
                    data.push({day: weekDays[n].slice(0, 5), views: listOnDay.length})
                }
                res.json(data.reverse())
            })
            .catch(next)
    }
    viewer(req, res, next){
        Viewer.findOne({_id: req.params.id})
            .then(viewer => res.json(viewer))
            .catch(err => res.json(err))
    }
}

module.exports = new adminController();
