const connection = require('../database/connection');
const queries = require('../database/queries/crud');


class SiteController {
    index(req, res){
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
                res.render('home', {category : results ,typeproduct : typeproduct,title: 'Apus Tarot Shop - Hệ thống quản trị'});
            }
        })
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
        // var categoryName;
        // connection.query(queries.getCategoryByID(req.params.id), (err, results)=>{
        //     if(err){
        //         console.log(err);
        //     }else{
        //         categoryName = results[0].name;
        //     }
        // });
        connection.query(queries.getProductByCategoryID(req.params.id), (err, results)=>{
            if(err){
                console.log(err);
            }else{
                res.render('product-category', {products : results, category : category, typeproduct : typeproduct});
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
                res.render('product-category', {products : results, category : category, typeproduct : typeproduct});
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
        res.render('admin', {layout: 'admain'});
    }


}

module.exports = new SiteController;