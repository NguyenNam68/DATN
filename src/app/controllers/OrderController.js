const connection = require('../database/connection');
const queries = require('../database/queries/crud');

class OrderController{
    showList(req, res){
        var perPage = 5;
        var page = (req.query.page) || 1;
        var start = (page - 1)*perPage;
        var end = page*perPage;
        var orders, size;
        connection.query(queries.listorder, (err, results) => {
            if(err){
                console.log(err);
            }else{
                for(var i = 0 ; i < results.length ; i++){
                    results[i].dateorder = `${results[i].dateorder.getDate()}-${results[i].dateorder.getMonth()+1}-${results[i].dateorder.getFullYear()}`;
                    results[i].intomoney = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(results[i].intomoney);
                }
                orders = results.slice(start, end);
                size = Math.ceil(results.length/perPage);
                res.render('order/list', {order : orders, size : size, currentPage : page,title : "ĐƠN HÀNG" ,layout : 'admain'});
            }
        })
    }
}

module.exports = new OrderController();