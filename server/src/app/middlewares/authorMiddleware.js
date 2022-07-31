module.exports = function authorMiddleware(req,res,next){
    var role = req.data.role
    if (role === 'Admin'){
        next()
    }else{
        res.send('Not permission')
    }
}