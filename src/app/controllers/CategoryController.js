const connection = require('../database/connection');
const queries = require('../database/queries/crud');

class CategoryController{
    category(req, res){
        connection.query(queries.listcategory, (err, results) => {
            if(err){
                console.log(err);
            }else{
                res.render('category/list', {category: results, title: "danh mục", layout: "admain"});
            }
        })
    }

    add(req, res){
        var data;
        if(typeof req.body.child==="undefined"){
            data = {
                name : req.body.name,
                link : req.body.link,
                child : 1
            }
        }else{
            data = {
            name : req.body.name,
            link : req.body.link,
            child : req.body.child
            }
        }
        connection.query(queries.addCategory(data), (err, results)=>{
            if(err){
                console.log(err);
            }else{
                res.redirect('/admin/category/list');
            }
        })
    }

    viewEdit(req, res) {
        connection.query(queries.getCategoryByID(req.params.id), (err, results) => {
            if(err){
                console.log(err);
            }else{
                res.render('category/edit', {category: results, title: "danh mục", layout: "admain"});
            }
        })
    }

    update(req, res){
        var data;
        if(typeof req.body.child==="undefined"){
            data = {
                id : req.params.id,
                name : req.body.name,
                link : req.body.link,
                child : 1
            }
        }else{
            data = {
                id : req.params.id,
                name : req.body.name,
                link : req.body.link,
                child : req.body.child
            }
        }
        connection.query(queries.updateCategory(data),(err,results)=>{
            if(err){
                console.log(err);
            }else{
                res.redirect('/admin/category/list');
            }
        })
    }

    delete(req, res) {
        connection.query(queries.deleteCategory(req.params.id),(err, results)=>{
            if(err){
                console.log(err);
            }else{
                res.redirect('/admin/category/list')
            }
        })
    }
}

module.exports = new CategoryController;