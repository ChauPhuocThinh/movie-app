const User = require('../models/user');
const jwt = require('jsonwebtoken');
module.exports = function authenMiddleware (req, res, next){
    try{
        const token = req.headers['cookie-auth-admin']
        // var token = req.cookies.token_admin
        var result = jwt.verify(token, 'xemphim529')
        User.findOne({_id:result._id})
            .then((user)=>{
                if (user){
                    req.data = user
                    next()
                }else{res.json('Không hợp lệ')}
            })
            .catch(err=>{console.log(err)})
    }catch(err){
        res.send('error')
    }
}