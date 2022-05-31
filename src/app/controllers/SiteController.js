const connection = require('../database/connection');
const queries = require('../database/queries/crud');


class SiteController {
    index(req, res){
        var typeproduct;
        connection.query(queries.listtype, (err, result) => {
            if(err){
                console.log(err);
            }else{
                typeproduct = result;
                connection.query(queries.listcategory, (err, results) => {
                    if(err){
                        console.log(err);
                    }else{
                        if(req.signedCookies.userID){
                            connection.query(queries.getUserByID(req.signedCookies.userID), (err, user) => {
                                if(err){
                                    console.log(err);
                                }else{
                                    res.render('home', {category : results ,typeproduct : typeproduct, username : user[0].name ,title: 'Apus Tarot Shop - Hệ thống quản trị'})
                                }
                            })
                        }else{
                            res.render('home', {category : results ,typeproduct : typeproduct,title: 'Apus Tarot Shop - Hệ thống quản trị'});
                        }
                    }
                });
            }
        });
    }

    showProductCategory(req, res){
        var category;
        connection.query(queries.listcategory, (err, results)=>{
            if(err){
                console.log(err);
            }else{
                category=results;
            }
        });
        var typeproduct;
        connection.query(queries.listtype, (err, results)=>{
            if(err){
                console.log(err);
            }else{
                typeproduct = results;
            }
        });
        var perPage = 16;
        var page = (req.query.page) || 1;
        var start = (page - 1)*perPage;
        var end = page*perPage;
        var size;
        var categoryName;
        var categoryID = req.params.id;
        connection.query(queries.getProductByCategoryID(req.params.id), (err, results)=>{
            if(err){
                console.log(err);
            }else{
                size = Math.ceil(results.length/4);
                connection.query(queries.getCategoryByID(categoryID),(err, categories)=>{
                    if(err){
                        console.log(err);
                    }else{
                        categoryName = categories[0].name;
                        res.render('product-category', {products : results, category : category, typeproduct : typeproduct, count : results.length, size : size, page:page ,title : categoryName});
                    }
                })
            }
        });
    }

    showProductSearch(req, res){
        var name = req.query.search;
        var category;
        connection.query(queries.listcategory, (err, results)=>{
            if(err){
                console.log(err);
            }else{
                category=results;
            }
        });
        var typeproduct;
        connection.query(queries.listtype, (err, results)=>{
            if(err){
                console.log(err);
            }else{
                typeproduct = results;
            }
        });
        connection.query(queries.getProductByName(name), (err, results)=>{
            if(err){
                console.log(err);
            }else{
                res.render('product-category', {products : results, category : category, typeproduct : typeproduct, title: "Tìm kiếm sản phẩm",count : results.length});
            }
        });
    }

    role(req, res){
        connection.query(queries.listrole, (err, results) => {
            if(err){
                console.log(err);
            }else{
                res.render('role', {role: results, title : 'Quyền Tài Khoản', layout: 'admain'});
            }
        });
    }

    roleAdd(req, res){
        const data = {
            name : req.body.name
        }
        connection.query(queries.addRole(data),(err, results) =>{
            if(err){
                console.log(err);
            }else{
                res.redirect('/role');
            }
        })
    }

    admin(req, res){
        connection.query(queries.getUserByID(req.signedCookies.userID),(err, results) =>{
            if(err){
                console.log(err);
            }else{
                res.render('admin', {layout: 'admain', username : results[0].name});
            }
        })
    }


}

module.exports = new SiteController;