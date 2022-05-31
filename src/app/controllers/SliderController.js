const connection = require('../database/connection');
const queries = require('../database/queries/crud');

class SliderController{
    slider(req, res){
        connection.query(queries.listslider, (err, results) => {
            if(err){
                console.log(err);
            }else{
                res.render('slider/list', {slider : results, title: "Slider", layout : "admain"});
            }
        });
    }

    add(req, res){
        if(req.body.link ==="undefined"){
            req.body.link = NULL;
        }
        const data = {
            content : req.body.content,
            link : req.body.link
        };
        connection.query(queries.addSlider(data), (err, results)=>{
            if(err){
                console.log(err);
            }else{
                res.redirect('/admin/slider/list');
            }
        });
    }

    viewAddImage(req, res){
        connection.query(queries.getSliderByID(req.params.id), (err, results)=>{
            if(err){
                console.log(err);
            }else{
                res.render('slider/image', {slider : results, title :"Slider", layout:"admain"});
            }
        })
    }

    addImage(req, res){
        if(req.body.text === "undefined"){
            req.body.text = NULL;
        };
        const data = {
            image : req.file.filename,
            slider_id : req.params.id,
            text : req.body.text
        };
        connection.query(queries.addImageSlider(data), (err, results)=>{
            if(err){
                console.log(err);
            }else{
                res.redirect('/admin/slider/list');
            }
        })
    }

    deleteSlider(req, res){
        connection.query(queries.deleteSlider(req.params.id), (err, results)=>{
            if(err){
                console.log(err);
            }else{
                res.redirect('/admin/slider/list');
            }
        })
    }
}

module.exports = new SliderController;