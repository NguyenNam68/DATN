const connection = require('../database/connection');
const queries = require('../database/queries/crud');
const bcrypt = require('bcrypt');

class UserController{
    showRegister(req, res){
        var typeproduct;
        connection.query(queries.listtype, (err, results) => {
            if(err){
                console.log(err);
            }else{
                typeproduct = results;
            }
        })
        connection.query(queries.listcategory, (err, results) => {
            if(err){
                console.log(err);
            }else{
                res.render('register', {category : results, typeproduct : typeproduct});
            }
        })
    }

    register(req, res){
        var now = new Date();
        var year = now.getFullYear();
        var month = now.getMonth();
        var date = now.getDate();
        var time = `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
        var datecreate = `${year}-${month}-${date} ${time}`;
        var hashPassword;
        var category;
        connection.query(queries.listcategory, (err, results) => {
            if(err){
                console.log(err);
            }else{
                category = results;
            }
        })
        var typeproduct;
        connection.query(queries.listtype, (err, results) => {
            if(err){
                console.log(err);
            }else{
                typeproduct = results;
            }
        })

        var errors = [];

        bcrypt.genSalt(4, function(err, salt) {
            bcrypt.hash(req.body.password, salt, function(err, hash){
                hashPassword = hash;

                const data = {
                    username : req.body.username,
                    email : req.body.email,
                    password : hashPassword, 
                    datecreate : datecreate
                }

                connection.query(queries.getUserByUserName(data.username), (err, user)=>{
                    if(err){
                        console.log(err);
                    }else{
                        if(user.length){
                            errors.push('Tên tài khoản đã tồn tại');
                            res.render('register', {errors : errors, category : category, typeproduct : typeproduct})
                            return;
                        }else{
                            connection.query(queries.addUser(data), (err, results) => {
                                if(err){
                                    console.log(err);
                                }else{
                                    connection.query(queries.getUserByUserName(data.username), (err, users) => {
                                        res.cookie('userID', users[0].id, {
                                            signed: true
                                        });
                                        res.redirect('/');
                                    });
                                }
                            })
                        }
                    }
                })
            })
        });
    }

    showLogin(req, res){
        if(req.cookies.userID){
            res.redirect('/account');
        }else{
            var typeproduct;
            connection.query(queries.listtype, (err, results) => {
                if(err){
                    console.log(err);
                }else{
                    typeproduct = results;
                }
            })
            connection.query(queries.listcategory, (err, results) => {
                if(err){
                    console.log(err);
                }else{
                    res.render('login', {category : results, typeproduct : typeproduct});
                }
            })
        }
    }
    
    login(req, res){
        const data = {
            username : req.body.username,
            password : req.body.password
        }
        var errors = [];
        var category;
        connection.query(queries.listcategory, (err, results) => {
            if(err){
                console.log(err);
            }else{
                category = results;
            }
        });
        var typeproduct;
        connection.query(queries.listtype, (err, results) => {
            if(err){
                console.log(err);
            }else{
                typeproduct = results;
            }
        });
        connection.query(queries.getUserByUserName(data.username), (err, user)=>{
            if(!user.length){
                errors.push('Tên tài khoản không tồn tại');
                res.render('login', {errors : errors, category : category, typeproduct : typeproduct});
                return;
            }else{
                bcrypt.compare(data.password, user[0].password, (err, results)=>{
                    if(results == true){
                        res.cookie('userID', user[0].id, {
                            signed : true
                        });
                        if(user[0].role_id == 2 || user[0].role_id == 3){
                            res.redirect('/admin');
                        }else{
                            res.redirect('/');
                        }
                    }else{
                        errors.push('Mật khẩu không đúng');
                        res.render('login', {errors : errors, category : category, typeproduct : typeproduct});
                        return;
                    }
                })
            }
        })
    }

    logout(req, res){
        res.clearCookie('userID');
        res.redirect('/');
    }

    showList(req, res){
        connection.query(queries.listuser, (err, results)=>{
            if(err){
                console.log(err);
            }else{
                res.render('user/list', {title: "Người Dùng", layout : "admain", user : results});
            }
        });
    }
}

module.exports = new UserController;