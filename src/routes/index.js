const siteRouter = require('./site');
const categoryRouter = require('./category');
const typeproductRouter = require('./typeproduct');
const userRouter = require('./user');
const productRouter = require('./product');
const sliderRouter = require('./slider');
const orderRouter = require('./order');
const authMiddleware = require('../app/Authentication/Auth');

function route(app){
    app.use('/admin/type', authMiddleware.requireAuth, typeproductRouter);
    app.use('/admin/category', authMiddleware.requireAuth, categoryRouter);
    app.use('/admin/product', authMiddleware.requireAuth, productRouter);
    app.use('/admin/slider', authMiddleware.requireAuth, sliderRouter);
    app.use('/admin/order', authMiddleware.requireAuth, orderRouter);
    app.use('/', userRouter);
    app.use('/', siteRouter);
}

module.exports = route;