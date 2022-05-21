const siteRouter = require('./site');
const categoryRouter = require('./category');
const typeproductRouter = require('./typeproduct');
const userRouter = require('./user');
const productRouter = require('./product');

function route(app){
    app.use('/admin', typeproductRouter);
    app.use('/admin', categoryRouter);
    app.use('/admin', productRouter);
    app.use('/', userRouter);
    app.use('/', siteRouter);
}

module.exports = route;