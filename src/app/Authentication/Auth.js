const connection = require('../database/connection');
const queries = require('../database/queries/crud');

module.exports.requireAuth = function (req, res, next) {
    if(!req.signedCookies.userID){
        res.redirect('/login');
        return;
    }else{
        var id = req.signedCookies.userID;
        connection.query(queries.getUserByID(id), (err, result) => {
            if(err){
                console.log(err);
            }else{
                if(!result){
                    res.redirect('/login');
                    return
                }
            }
        });
        next();
    }
}