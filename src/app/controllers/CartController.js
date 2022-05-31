const connection = require('../database/connection');
const queries = require('../database/queries/crud');

class CartController{
    showCart(req, res){
        res.render('cart');
    }
}

module.exports = new CartController;