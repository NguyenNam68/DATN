const connection = require('../database/connection');
const queries = require('../database/queries/crud');

class SiteController {
    index(req, res){
        var typeproduct, slider, sliderID, arraySlider=[];
        connection.query(queries.getSliderByStatus, (err, sliders)=>{
            if(err){
                console.log(err);
            }else{
                if(sliders.length==1){
                    sliderID = sliders[0].id;
                    connection.query(queries.getImageSliderByID(sliderID), (err, results)=>{
                        if(err){
                            console.log(err);
                        }else{
                            slider = results;
                        }
                    })
                }else{
                    for(var i = 0; i < sliders.length; i++){
                        connection.query(queries.getImageSliderByID(sliders[i].id), (err, results)=>{
                            if(err){
                                console.log(err);
                            }else{
                                arraySlider.push(results);
                            }
                        });
                    }
                }
            }
        });
        connection.query(queries.listtype, (err, result) => {
            if(err){
                console.log(err);
            }else{
                typeproduct = result;
                connection.query(queries.listcategory, (err, results) => {
                    if(err){
                        console.log(err);
                    }else{
                        if(req.signedCookies.userID){
                            connection.query(queries.getUserByID(req.signedCookies.userID), (err, user) => {
                                if(err){
                                    console.log(err);
                                }else{
                                    res.render('home', {category : results ,typeproduct : typeproduct, slider : slider ,name : user[0].name, username : user[0].username, userID : req.signedCookies.userID ,title: 'Apus Tarot Shop - Hệ thống quản trị'})
                                }
                            })
                        }else{
                            res.render('home', {category : results ,typeproduct : typeproduct, slider : slider, title: 'Apus Tarot Shop - Hệ thống quản trị'});
                        }
                    }
                });
            }
        });
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
        var perPage = 8;
        var page = (req.query.page) || 1;
        var start = (page - 1)*perPage;
        var end = page*perPage;
        var size, products;
        var categoryName;
        var categoryID = req.params.id;
        connection.query(queries.getProductByCategoryID(req.params.id), (err, results)=>{
            if(err){
                console.log(err);
            }else{
                products = results.slice(start, end);
                size = Math.ceil(results.length/perPage);
                connection.query(queries.getCategoryByID(categoryID),(err, categories)=>{
                    if(err){
                        console.log(err);
                    }else{
                        categoryName = categories[0].name;
                        res.render('product-category', {products : products, category : category, typeproduct : typeproduct, count : results.length, size : size, page:page ,title : categoryName});
                    }
                })
            }
        });
    }

    showProductDetail(req,res){
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
        connection.query(queries.getImageProductByPrID(req.params.id), (err, imageProducts)=>{
            if(err){
                console.console(err);
            }else{
                var imageprs = imageProducts;
                connection.query(queries.getProductID(req.params.id), (err, results)=>{
                    if(err){
                        console.log(err);
                    }else{
                        var nameProduct = results[0].name
                        res.render('detail',{category : category, typeproduct : typeproduct, detail : results, nameProduct : nameProduct, imagePr : imageprs});
                    }
                });
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
                res.render('product-category', {products : results, category : category, typeproduct : typeproduct, title: "Tìm kiếm sản phẩm",count : results.length});
            }
        });
    }

    showCart(req,res){
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
                res.render('cart', {category : category, typeproduct : results, title: "Giỏ hàng"});
            }
        });
    }

    showPayment(req, res){
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
                res.render('payment', {category : category, typeproduct : results, title: "Thanh toán"});
            }
        });
    }

    payment(req, res){
        var now = new Date();
        var year = now.getFullYear();
        var month = now.getMonth() + 1;
        var date = now.getDate();
        var time = `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
        var dateorder = `${year}-${month}-${date} ${time}`;
        var idOrder = req.body.phone.slice(7);
        var feeship = 35000;
        var random = Math.floor(Math.random() * 101);
        connection.query(queries.getOrderByID(idOrder), (err, results)=>{
            if(err){
                console.log(err);
            }else{
                if(results){
                    idOrder = parseInt(idOrder) + random;
                }
                const data = {
                    id : idOrder,
                    dateorder : dateorder,
                    intomoney : req.body.totalPrice,
                    name :  req.body.name,
                    phone : req.body.phone,
                    email : req.body.email,
                    address : req.body.address,
                    feeship : feeship,
                    totalamount : req.body.totalamount,
                    totalmoney : req.body.totalPrice
                }
                var sum = req.body.productID.length;
                connection.query(queries.addOrder(data), (err, orders)=>{
                    if(err){
                        console.log(err);
                    }else{
                        for(var i = 0; i<sum; i++){
                            const db = {
                                amount : req.body.productAmount[i],
                                unitprice : req.body.productPrice[i],
                                order_id : idOrder,
                                product_id : req.body.productID[i]
                            };
                            connection.query(queries.addDetailOrder(db), (err, details)=>{
                                if(err){
                                    console.log(err);
                                }else{
                                }
                            });
                        }
                        res.redirect('/success');
                    }
                });
            }
        });
    }

    showSuccess(req, res){
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
                res.render('success', {category : category, typeproduct : results, title: "Thành Công Mua Hàng"})
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
        var productSaleSum = 0, moneySum = 0, userSum = 0, productSum = 0, orderCancel = 0, orderSale = 0;
        var userRole = [];
        connection.query(queries.listamountorder, (err, detailorders)=>{
            if(err){
                console.log(err);
            }else{
                for(var i = 0; i < detailorders.length; i++){
                    productSaleSum += detailorders[i].amount;
                }
            }
        });
        connection.query(queries.listorder, (err, orders)=>{
            if(err){
                console.log(err);
            }else{
                for(var i = 0; i < orders.length; i++){
                    if(orders[i].status == 0){
                        moneySum += orders[i].intomoney;
                        orderSale++;
                    }else{
                        orderCancel++;
                    }
                }
                moneySum = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(moneySum);
            }
        });
        connection.query(queries.listuser, (err, users)=>{
            if(err){
                console.log(err);
            }else{
                for(var i = 0 ; i < users.length; i++){
                    if(users[i].role_id == 5){
                        userSum++;
                    }
                }
            }
        });
        connection.query(queries.listuserwithrole, (err, userRoles)=>{
            if(err){
                console.log(err);
            }else{
                userRole  = userRoles;
            }
        });

        connection.query(queries.listproduct, (err, results)=>{
            if(err){
                console.log(err);
            }else{
                productSum = results.length;
            }
        });
        connection.query(queries.getUserByID(req.signedCookies.userID),(err, results) =>{
            if(err){
                console.log(err);
            }else{
                res.render('admin', {layout: 'admain', userRole : userRole ,productSum : productSum ,productSaleSum : productSaleSum, 
                moneySum : moneySum, userSum : userSum, orderSale : orderSale, orderCancel : orderCancel, username : results[0].name, image : results[0].image});
            }
        });
    }

}

module.exports = new SiteController;