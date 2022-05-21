const connection = require('../database/connection');
const queries = require('../database/queries/crud');

class TypeController{
    type(req, res){
        connection.query(queries.listtype, (err,results)=>{
            if(err){
                console.log(err);
            }else{
                res.render('type/list', {type : results, layout :"admain", title: "Loại Sản Phẩm"});
            }
        })
    }

    add(req, res){
        const data = {
            name : req.body.name,
            link : req.body.link
        }
        connection.query(queries.addType(data), (err,results)=>{
            if(err){
                console.log(err);
            }else{
                res.redirect('/admin/type/list')
            }
        })
    }

    viewEdit(req, res){
        connection.query(queries.getTypeByID(req.params.id), (err,results)=> {
            if(err){
                console.log(err);
            }else{
                res.render('type/edit', {type : results,title: "Loại Sản Phẩm", layout :"admain"});
            }
        });
    }

    update(req, res){
        const data = {
            id : req.params.id,
            name : req.body.name,
            link : req.body.link
        }
        connection.query(queries.updateTypeProduct(data), (err,results)=>{
            if(err){
                console.log(err);
            }else{
                res.redirect('/admin/type/list');
            }
        });
    }

    delete(req,res){
        connection.query(queries.deleteTypeProduct(req.params.id), (err,results)=>{
            if(err){
                console.log(err);
            }else{
                res.redirect('/admin/type/list');
            }
        })
    }
}

module.exports = new TypeController;