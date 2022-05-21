const connection = require('../database/connection');
const queries = require('../database/queries/crud');

class ProductController{
    showList(req, res){
        var category;
        connection.query(queries.listcategory, (err, results)=>{
            if(err){
                console.log(err);
            }else{
                category=results;
            }
        });
        connection.query(queries.listproduct,(err, results) => {
            if(err){
                console.log(err);
            }else{
                res.render('product/list', {products : results, category: category, title: "Sản Phẩm", layout: "admain"});
            }
        });
    }

    add(req, res){
        var now = new Date();
        var year = now.getFullYear();
        var month = now.getMonth();
        var date = now.getDate();
        var time = `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
        var datecreate = `${year}-${month}-${date} ${time}`;
        const data = {
            name : req.body.name,
            link : req.body.link,
            shortdescription : req.body.shortdescription,
            detaildescription : req.body.detaildescription,
            price : req.body.price,
            image : req.file.filename,
            datecreate : datecreate,
            category_id : req.body.category_id
        };
        connection.query(queries.addProduct(data), (err, results) =>{
            if(err){
                console.log(err);
            }else{
                res.redirect('/admin/product/list');
            }
        });
    }

    delete(req, res){
        connection.query(queries.deleteProduct(req.params.id), (err, results) =>{
            if(err){
                console.log(err);
            }else{
                res.redirect('/admin/product/list');
            }
        })
    }
}

module.exports = new ProductController;