const Film = require('../models/film');
const Viewer = require('../models/viewer')
const Infor = require('../models/infor')
const Actor = require('../models/actor')
const bcrypt = require('bcryptjs');
const nodemailer = require("nodemailer")
const jwt = require('jsonwebtoken');
const moment = require('moment');
class SiteController {
    //[GET] /home
    index(req, res, next) {
        let GetFilm = Film.find({})
        GetFilm = GetFilm.sort({
            imdbVotes: 'desc'
        }).limit(12)
        GetFilm
            .then(film => {
                res.json(film);
            })
            .catch(next);
    }
    //[GET] /search
    search(req, res, next) {
        if (req.query.q !== ''){
            Film.find({$or:
                [{'TitleVietnamese': {'$regex': req.query.q, '$options': 'i'}},
                {'Title': {'$regex': req.query.q, '$options': 'i'}}
                ]})
                .then(film => {res.json(film)})
                .catch(next)
        }else{
            res.json([])
        }
    }
    //[GET] /show
    show(req, res, next) {
        Film.find({ 'Type' : 'series'})
            .then(film => {res.json(film)})
            .catch(next)
    }
    //[GET] /movie
    movie(req, res, next) {
        Film.find({ 'Type' : 'movie'})
            .then(film => {res.json(film)})
            .catch(next)
    }
    //[GET] /browse
    browse(req, res, next) {
        //filter object
        const filter = { Type : 'movie'}
        for (const key in req.query){
            if( key === 'Genre' || key === 'Country'){
                filter[key] = {'$regex': req.query[key], '$options': 'i'}
            }else if( key === 'YearNumber'){
                if (req.query[key] === '2022-'){
                    filter[key] = { $gt :  2022}
                }else if (req.query[key] === '-2012'){
                    filter[key] = { $lt : 2012}
                }else{
                    filter[key] = Number(req.query[key])
                }
            }else if( key === 'Runtime'){
                const runtime = req.query[key].split('-')
                filter[key] = { $gt: Number(runtime[0]) , $lt: Number(runtime[1])}
            }
        }
        delete filter.sort
        delete filter.page
        //sort object
        const sort = { 'example': 'desc'}
        for (const key in sort) {
            delete sort.key
        }
        sort[req.query.sort] = 'desc'
        //pagination
        const perPage = 8
        const page = req.query.page || 1
        //
        Film
            .find(filter).sort(sort)
            .skip((perPage * page) - perPage) // Trong page ?????u ti??n s??? b??? qua gi?? tr??? l?? 0
            .limit(perPage)
            .exec((err, films) => {
                Film.find(filter).countDocuments((err, count) => { // ?????m ????? t??nh c?? bao nhi??u trang
                if (err) return next(err);
                res.json({
                    films: films,
                    pages: Math.ceil(count/perPage)})// Tr??? v??? d??? li???u c??c s???n ph???m theo ?????nh d???ng nh?? JSON, XML,...
                });
            });
    }

    //[POST] /signup
    async signup(req, res, next){
        const codeActiveEmail = Math.random().toString(36).slice(2, 7) + Math.random().toString(36).slice(2, 7)
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
            from: "XemPhim529 ??? <thinhst@gmail.com>", // sender address
            to: req.body.email, // list of receivers
            subject: "K??ch ho???t t??i kho???n XemPhim529", // Subject line
            text: "K??ch ho???t t??i kho???n XemPhim529", // plaintext body
            html: `<b>Welcome ${req.body.fullName} ???? ????ng k?? t??i kho???n t???i XemPhim529, h??y nh???n <a href='https://movie-app-cpthinh.netlify.app/signup/active?code=${codeActiveEmail}'>v??o ????y</a> ????? k??ch ho???t t??i kho???n c???a b???n.</b><br>
            <p>Vui l??ng b??? qua email n??y n???u b???n kh??ng ph???i l?? ng?????i ????ng k??.</p>` // html body
        }
        
        try {
            const saltRounds = 10;
            const hashedPwd = await bcrypt.hash(req.body.password, saltRounds);
            const viewer = await Viewer.findOne({ email: req.body.email });
            if (viewer) {
                res.send('email-duplicate');
            } else {
                const insertResult = await Viewer.create({
                    fullName: req.body.fullName,
                    email: req.body.email,
                    password: hashedPwd,
                    codeActiveEmail: codeActiveEmail,
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
    //[PUT] /signup/active
    async active(req, res, next){
        const valid = await Viewer.findOne({codeActiveEmail: req.query.code})
        if (valid){
            const active = await Viewer.updateOne({codeActiveEmail: req.query.code},{activedEmail: true})
            res.send('actived')
        }else{
            res.send('invalid')
        }
    }
    //[POST] /forgot
    async forgot(req, res, next){
        const code = Math.floor(Math.random() * (9999 - 1000 + 1) ) + 1000;
        const valid = await Viewer.findOne({email: req.body.email})
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
            from: "XemPhim529 ??? <thinhst@gmail.com>", // sender address
            to: req.body.email, // list of receivers
            subject: "?????t l???i m???t kh???u XemPhim529", // Subject line
            text: "?????t l???i m???t kh???u XemPhim529", // plaintext body
            html: `<b>B???n v???a y??u c???u ?????t l???i m???t kh???u t??? XemPhim529. M?? x??c nh???n c???a b???n l?? <h1>${code}</h1> h??y nh???n <a href='https://movie-app-cpthinh.netlify.app/forgot/change-password'>v??o ????y</a> ????? thay ?????i m???t kh???u c???a b???n.</b><br>
            <p>Vui l??ng b??? qua email n??y n???u b???n kh??ng ph???i l?? ng?????i th???c hi???n y??u c???u.</p>` // html body
        }
        if (valid){
            const codeConfirm = await Viewer.updateOne({email: req.body.email},{codeConfirm: code})
            smtpTransport.sendMail(mailOptions, function(error, response){
                if(error){
                    console.log(error);
                }else{
                    console.log("Message sent: " + response.message);
                }
            })
            res.send('sended-confirm-email')
        }else{
            res.send('email-unavailable')
        }
    }
    //[PUT] /forgot/change-password
    async changePassword(req, res, next){
        const valid = await Viewer.findOne({codeConfirm: req.body.codeConfirm})
        const saltRounds = 10;
        const hashedPwd = await bcrypt.hash(req.body.newPassword, saltRounds);
        if (valid){
            const changePassword = await Viewer.updateOne({codeConfirm: req.body.codeConfirm},{password: hashedPwd})
            res.send('changed-password')
        }else{
            res.send('codeConfirm-invalid')
        }
    }
    //[POST] /login
    async login(req, res, next){
        try {
            const viewer = await Viewer.findOne({ email: req.body.email });
            if (viewer) {
                const cmp = await bcrypt.compare(
                    req.body.password,
                    viewer.password,
                );
                if (cmp) {
                    var token = jwt.sign({
                        _id: viewer._id
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
    //[GET] /authenticator
    authenticator(req, res, next){
        try{
            const token = req.headers['cookie-auth']
            // var token = req.cookies.token
            var result = jwt.verify(token, 'xemphim529')
            if(result){
                Viewer.findOne({_id:result._id})
                    .then((viewer)=>res.json(viewer))
                    .catch(next)
            }
        }catch(err){
            res.send('error')
        }
    }
    //[GET] /movie/:id
    movieDetail(req,res,next){
        Film.findOne({imdbID: req.params.id})
            .then(film=>res.json(film))
            .catch(err=>console.log(err))
    }
    //[GET] /series/:id
    seriesDetail(req,res,next){
        Film.findOne({imdbID: req.params.id})
            .then(film=>res.json(film))
            .catch(err=>console.log(err))
    }
    //[GET] /watch/:id
    watch(req, res, next){
        Film.findOne({imdbID: req.params.id})
            .then(film=>res.json(film))
            .catch(err=>console.log(err))
    }
    //[PUT] /add-collections/:email
    addCollections(req, res, next){
        Viewer.findOne({email:req.params.email})
            .then((viewer)=>{
                if(viewer !== null){
                    var valid
                    if(viewer.collectionFilms.length !== 0){
                        for(var i=0; i < viewer.collectionFilms.length; i++){
                            var toDay = moment(new Date()).format("DD/MM/YYYY")
                            var watchDay = moment(viewer.collectionFilms[i].watchedAt).format("DD/MM/YYYY")
                            if(viewer.collectionFilms[i]._id === req.body._id && toDay === watchDay){
                                valid = false
                                break
                            }else{
                                valid = true
                            }
                            
                        }
                    }else{
                        valid = true
                    }
                    if(valid){
                        Viewer.updateOne({email:req.params.email},{$push: {collectionFilms: req.body}})
                            .then(()=>res.send('updated'))
                            .catch((err)=>console.log(err))
                    }
                }
            })
            .catch(next)
            
    }
    //[GET] /films-hot-today
    filmsHot2Day(req, res, next){
        Viewer.find({})
            .then((viewer)=>{
                var toDay = moment(new Date()).format("DD/MM/YYYY")
                var listFull = []
                //L???y ra ds ?????y ????? c???a c??c phim ???????c xem trong ng??y 
                for(var i = 0; i < viewer.length; i++){
                    for(var j = 0; j < viewer[i].collectionFilms.length; j++){
                        var watchDay = moment(viewer[i].collectionFilms[j].watchedAt).format("DD/MM/YYYY")
                        if(watchDay === toDay){
                            listFull.push(viewer[i].collectionFilms[j])
                        }
                    }
                }
                //T???o ds ???? ???????c lo???i b??? c??c phim tr??ng l???p
                const seen = new Set();
                const listFullNotDup = listFull.filter(el => {
                    const duplicate = seen.has(el.imdbID);
                    seen.add(el.imdbID);
                    return !duplicate;
                  });
                //ts danh s??ch v???i s??? l???n xem c???a m???i phim
                var listIdAndViews = {};
                for (var i = 0; i < listFull.length; i += 1) {
                    listIdAndViews[listFull[i].imdbID] = (listIdAndViews[listFull[i].imdbID] || 0) + 1;
                }
                for (var imdbID in listIdAndViews) {
                    if (listIdAndViews[imdbID] > 1) {
                        listFullNotDup.find(x => x.imdbID === imdbID).views = listIdAndViews[imdbID]
                    }
                }
                //S???p x???p ds theo th??? t??? l?????t xem t??? cao->th???p
                var sortedHotList = listFullNotDup.sort(function(a, b){return a.views + b.views});
                //G???i v??? client
                res.json(sortedHotList)
            })
            .catch(()=>res.send('error'))
    }
    // [GET] /films-hot-week
    filmsHot2Week(req, res, next){
        Viewer.find({})
            .then((viewer)=>{
                //T???o ds 7 ng??y trong tu???n
                var toDay = moment(new Date()).format("DD/MM/YYYY")
                var weekDays = [toDay]
                for(var i = 1; i <= 6; i++){
                    weekDays.push(moment(moment().subtract(i, 'day').toDate()).format("DD/MM/YYYY"))
                }
                var listFull = []
                //L???y ra ds ?????y ????? c???a c??c phim ???????c xem trong tu???n
                for(var i = 0; i < viewer.length; i++){
                    for(var j = 0; j < viewer[i].collectionFilms.length; j++){
                        var watchDay = moment(viewer[i].collectionFilms[j].watchedAt).format("DD/MM/YYYY")
                        for(var n = 0; n < weekDays.length; n++){
                            if(watchDay === weekDays[n]){
                                listFull.push(viewer[i].collectionFilms[j])
                            }
                        }
                        
                    }
                }
                //T???o ds ???? ???????c lo???i b??? c??c phim tr??ng l???p
                const seen = new Set();
                const listFullNotDup = listFull.filter(el => {
                    const duplicate = seen.has(el.imdbID);
                    seen.add(el.imdbID);
                    return !duplicate;
                  });
                //ts danh s??ch v???i s??? l???n xem c???a m???i phim
                var listIdAndViews = {};
                for (var i = 0; i < listFull.length; i += 1) {
                    listIdAndViews[listFull[i].imdbID] = (listIdAndViews[listFull[i].imdbID] || 0) + 1;
                }
                for (var imdbID in listIdAndViews) {
                    if (listIdAndViews[imdbID] > 1) {
                        listFullNotDup.find(x => x.imdbID === imdbID).views = listIdAndViews[imdbID]
                    }
                }
                //S???p x???p ds theo th??? t??? l?????t xem t??? cao->th???p
                var sortedHotList = listFullNotDup.sort(function(a, b){return a.views + b.views});
                //G???i v??? client
                res.json(sortedHotList)
            })
            .catch(next)
    }
    // [GET] /films-hot-month
    filmsHot2Month(req, res, next){
        Viewer.find({})
            .then((viewer)=>{
                //T???o ds 30 ng??y trong th??ng
                var toDay = moment(new Date()).format("DD/MM/YYYY")
                var monthDays = [toDay]
                for(var i = 1; i <= 29; i++){
                    monthDays.push(moment(moment().subtract(i, 'day').toDate()).format("DD/MM/YYYY"))
                }
                var listFull = []
                //L???y ra ds ?????y ????? c???a c??c phim ???????c xem trong tu???n
                for(var i = 0; i < viewer.length; i++){
                    for(var j = 0; j < viewer[i].collectionFilms.length; j++){
                        var watchDay = moment(viewer[i].collectionFilms[j].watchedAt).format("DD/MM/YYYY")
                        for(var n = 0; n < monthDays.length; n++){
                            if(watchDay === monthDays[n]){
                                listFull.push(viewer[i].collectionFilms[j])
                            }
                        }
                        
                    }
                }
                //T???o ds ???? ???????c lo???i b??? c??c phim tr??ng l???p
                const seen = new Set();
                const listFullNotDup = listFull.filter(el => {
                    const duplicate = seen.has(el.imdbID);
                    seen.add(el.imdbID);
                    return !duplicate;
                  });
                //ts danh s??ch v???i s??? l???n xem c???a m???i phim
                var listIdAndViews = {};
                for (var i = 0; i < listFull.length; i += 1) {
                    listIdAndViews[listFull[i].imdbID] = (listIdAndViews[listFull[i].imdbID] || 0) + 1;
                }
                for (var imdbID in listIdAndViews) {
                    if (listIdAndViews[imdbID] > 1) {
                        listFullNotDup.find(x => x.imdbID === imdbID).views = listIdAndViews[imdbID]
                    }
                }
                //S???p x???p ds theo th??? t??? l?????t xem t??? cao->th???p
                var sortedHotList = listFullNotDup.sort(function(a, b){return a.views + b.views});
                //G???i v??? client
                res.json(sortedHotList)
            })
            .catch(next)
    }
    //[GET] /actor/:name
    actor(req, res, next){
        Actor.findOne({name: req.params.name})
            .then(actor=>res.json(actor))
            .catch(()=> res.send('not found'))
    }
    //[PUT] /add-favorite/:email
    addFavorite(req, res, next){
        Viewer.findOne({email:req.params.email})
            .then((viewer)=>{
                if(viewer !== null){
                    var valid
                    if(viewer.favorite.length !== 0){
                        for(var i=0; i < viewer.favorite.length; i++){
                            if(viewer.favorite[i].imdbID === req.body.imdbID){
                                valid = false
                                break
                            }else{
                                valid = true
                            }
                            
                        }
                    }else{
                        valid = true
                    }
                    if(valid){
                        Viewer.updateOne({email:req.params.email},{$push: {favorite: req.body}})
                            .then(()=>res.send('updated'))
                            .catch((err)=>console.log(err))
                    }
                }
            })
            .catch(next)
            
    }
    //[PUT] /remove-favorite/:email
    removeFavorite(req, res, next){
        Viewer.findOne({email:req.params.email})
            .then((viewer)=>{
                if(viewer !== null){
                    Viewer.updateOne({email:req.params.email},{$pull: {favorite: {imdbID: req.body.imdbID}}})
                        .then(()=>res.send('updated'))
                        .catch((err)=>console.log(err))
                }
            })
            .catch(next)
            
    }
    //[POST] /check-favorite/:email
    checkFavorite(req, res, next){
        Viewer.findOne({email:req.params.email})
            .then((viewer)=>{
                if(viewer !== null){
                    var added
                    if(viewer.favorite.length !== 0){
                        for(var i=0; i < viewer.favorite.length; i++){
                            if(viewer.favorite[i].imdbID === req.body.imdbID){
                                added = true
                                break
                            }else{
                                added = false
                            }
                            
                        }
                    }else{
                        added = false
                    }
                    res.json({added: added})
                }
            })
            .catch(next)
            
    }
    //[GET] /favorite/:email
    favorite(req, res, next){
        Viewer.findOne({email:req.params.email})
            .then((viewer)=>{
                if(viewer !== null){
                    res.json(viewer.favorite)
                }
            })
            .catch(next)
    }
}
module.exports = new SiteController();
