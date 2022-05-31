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
        var perPage = 4;
        var page = (req.query.page) || 1;
        var start = (page - 1)*perPage;
        var end = page*perPage;
        var products, size;
        connection.query(queries.listproduct,(err, results) => {
            if(err){
                console.log(err);
            }else{
                products = results.slice(start, end);
                size = Math.ceil(results.length/perPage);
                res.render('product/list', {products : products, category: category, size : size, currentPage : page ,title: "Sản Phẩm", layout: "admain"});
            }
        });
    }

    showProduct(req, res){
        var category, discount;
        connection.query(queries.listcategory, (err, results)=>{
            if(err){
                console.log(err);
            }else{
                category = results;
            }
        });
        connection.query(queries.getProductID(req.params.id),(err, results) => {
            if(err){
                console.log(err);
            }else{
                if(results[0].newprice){
                    discount = 100 - (100*results[0].newprice)/results[0].price;
                }else{
                    discount = 0;
                }
                res.render('product/edit', {products : results, category: category, id : results[0].category_id, discount : discount ,title: "Sản Phẩm", layout: "admain"});
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

    update(req, res){
        var now = new Date();
        var year = now.getFullYear();
        var month = now.getMonth();
        var date = now.getDate();
        var time = `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
        var dateupdate = `${year}-${month}-${date} ${time}`;
        var newprice;
        if(typeof req.body.capture === "undefined"){
            req.body.capture = 0;
        }
        if(typeof req.body.new === "undefined"){
            req.body.new = 0;
        }
        if(typeof req.body.discount === "undefined"){
            newprice = 0;
        }else{
            newprice = parseInt(req.body.price)-(parseInt(req.body.discount)*parseInt(req.body.price))/100;
        }
        const data = {
            id : req.params.id,
            name : req.body.name,
            link : req.body.link,
            shortdescription : req.body.shortdescription,
            detaildescription : req.body.detaildescription,
            price : req.body.price,
            newprice : newprice,
            new : req.body.new,
            capture : req.body.capture,
            dateupdate : dateupdate,
            category_id : req.body.category_id
        };
        connection.query(queries.updateProduct(data), (err, results) =>{
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