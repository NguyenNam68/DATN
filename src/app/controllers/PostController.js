const connection = require('../database/connection');
const queries = require('../database/queries/crud');

class PostController{
    showList(req, res){
        var perPage = 10;
        var page = (req.query.page) || 1;
        var start = (page - 1)*perPage;
        var end = page*perPage;
        var posts, size, user;
        connection.query(queries.getUserByID(req.signedCookies.userID),(err, users) =>{
            if(err){
                console.log(err);
            }else{
                user = users;
                connection.query(queries.listpost, (err, results) => {
                    if(err){
                        console.log(err);
                    }else{
                        for(var i = 0 ; i < results.length ; i++){
                            results[i].datecreate = `${results[i].datecreate.getDate()}-${results[i].datecreate.getMonth()+1}-${results[i].datecreate.getFullYear()}`;
                        }
                        posts = results.slice(start, end);
                        size = Math.ceil(results.length/perPage);
                        res.render('post/list', {post : posts, size : size, currentPage : page,title : "BÀI VIẾT" ,layout : 'admain', username : user[0].name, image : user[0].image});
                    }
                });
            }
        });
    }

    showAdd(req, res){
        var category;
        connection.query(queries.listcategory, (err, results)=>{
            if(err){
                console.log(err);
            }else{
                category=results;
            }
        });
        connection.query(queries.getUserByID(req.signedCookies.userID),(err, results) =>{
            if(err){
                console.log(err);
            }else{
                res.render('post/add', {title : "BÀI VIẾT", layout : 'admain', category : category, username : results[0].name, image : results[0].image});
            }
        });
    }

    addPost(req, res){
        var now = new Date();
        var year = now.getFullYear();
        var month = now.getMonth() + 1;
        var date = now.getDate();
        var time = `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
        var datecreate = `${year}-${month}-${date} ${time}`;

        connection.query(queries.getUserByID(req.signedCookies.userID),(err, user) =>{
            if(err){
                console.log(err);
            }else{
                const data = {
                    title : req.body.title,
                    content : req.body.content,
                    link : req.body.link,
                    datecreate : datecreate,
                    creater : user[0].id,
                    fixter : user[0].id,
                    category_id : req.body.category_id
                }
                connection.query(queries.addPost(data), (err, results)=>{
                    if(err){
                        console.log(err);
                    }else{
                        res.redirect('/admin/post/list');
                    }
                });
            }
        });
    }
}

module.exports = new PostController();