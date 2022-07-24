const connection = require('../database/connection');
const queries = require('../database/queries/crud');

class SiteController {
    index(req, res){
        var typeproduct, slider, sliderID, arraySlider=[], productDate;
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
        connection.query(queries.listproductDate, (err, results)=>{
            if(err){
                console.log(err);
            }else{
                for(var i = 0; i < results.length; i++){
                    results[i].price = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(results[i].price);
                    if(results[i].newprice){
                        results[i].newprice = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(results[i].newprice);
                    }
                }
                productDate = results;
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
                                    res.render('home', {size : 1, currentPage: 1, category : results ,typeproduct : typeproduct, slider : slider , productDate : productDate, name : user[0].name, username : user[0].username, userID : req.signedCookies.userID ,title: 'Apus Tarot Shop - Hệ thống quản trị'})
                                }
                            })
                        }else{
                            res.render('home', {size : 1, currentPage: 1, category : results ,typeproduct : typeproduct, slider : slider, title: 'Apus Tarot Shop - Hệ thống quản trị', productDate : productDate});
                        }
                    }
                });
            }
        });
    }

    showIntroduce(req, res){
        var typeproduct;
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
                                    res.render('introduce', {size : 1, currentPage: 1, category : results ,typeproduct : typeproduct  , name : user[0].name, username : user[0].username, userID : req.signedCookies.userID ,title: 'Apus Tarot Shop - Hệ thống quản trị'})
                                }
                            })
                        }else{
                            res.render('introduce', {size : 1, currentPage: 1, category : results ,typeproduct : typeproduct, title: 'Apus Tarot Shop - Hệ thống quản trị' });
                        }
                    }
                });
            }
        });
    }

    showBlog(req, res){
        var typeproduct, post;
        var perPage = 3;
        var page = (req.query.page) || 1;
        var start = (page - 1)*perPage;
        var end = page*perPage;
        var size;
        connection.query(queries.listtype, (err, result) => {
            if(err){
                console.log(err);
            }else{
                typeproduct = result;
                connection.query(queries.listpost, (err, posts)=>{
                    if(err){
                        console.log(err);
                    }else{
                        for(var i = 0 ; i < posts.length ; i++){
                            posts[i].datecreate = `Ngày ${posts[i].datecreate.getDate()} Tháng ${posts[i].datecreate.getMonth()+1} Năm ${posts[i].datecreate.getFullYear()}`;
                        }
                        post = posts.slice(start, end);
                        size = Math.ceil(posts.length/perPage);
                        connection.query(queries.listcategory, (err, results) => {
                            if(err){
                                console.log(err);
                            }else{
                                if(req.signedCookies.userID){
                                    connection.query(queries.getUserByID(req.signedCookies.userID), (err, user) => {
                                        if(err){
                                            console.log(err);
                                        }else{
                                            res.render('blog', {category : results ,typeproduct : typeproduct  , size : size, currentPage:page, name : user[0].name, post : post,username : user[0].username, userID : req.signedCookies.userID ,title: 'Apus Tarot Shop - Hệ thống quản trị'})
                                        }
                                    })
                                }else{
                                    res.render('blog', {category : results ,typeproduct : typeproduct, post : post, title: 'Apus Tarot Shop - Hệ thống quản trị', size : size, currentPage:page });
                                }
                            }
                        });
                    }
                });
            }
        });
    }

    showPost(req,res){
        var typeproduct, post, samepost;
        connection.query(queries.listtype, (err, result) => {
            if(err){
                console.log(err);
            }else{
                typeproduct = result;
                connection.query(queries.getPostByID(req.params.id), (err, posts)=>{
                    if(err){
                        console.log(err);
                    }else{
                        posts[0].datecreate = `Ngày ${posts[0].datecreate.getDate()} Tháng ${posts[0].datecreate.getMonth()+1} Năm ${posts[0].datecreate.getFullYear()}`;
                        post = posts;
                        connection.query(queries.getPostByUserID(posts[0].creater), (err, author)=>{
                            if(err){
                                console.log(err);
                            }else{
                                samepost = author;
                                connection.query(queries.listcategory, (err, results) => {
                                    if(err){
                                        console.log(err);
                                    }else{
                                        if(req.signedCookies.userID){
                                            connection.query(queries.getUserByID(req.signedCookies.userID), (err, user) => {
                                                if(err){
                                                    console.log(err);
                                                }else{
                                                    res.render('post', {size : 1, currentPage: 1, samepost: samepost, category : results ,typeproduct : typeproduct , name : user[0].name, post : post ,username : user[0].username, userID : req.signedCookies.userID ,title: 'Apus Tarot Shop - Hệ thống quản trị'})
                                                }
                                            })
                                        }else{
                                            res.render('post', {size : 1, currentPage: 1, samepost: samepost, category : results ,typeproduct : typeproduct, post : post, title: 'Apus Tarot Shop - Hệ thống quản trị'});
                                        }
                                    }
                                });
                            }
                        });
                    }
                });
            }
        });
    }

    showBlogSearch(req, res){
        var typeproduct, post;
        var perPage = 3;
        var page = (req.query.page) || 1;
        var start = (page - 1)*perPage;
        var end = page*perPage;
        var size;
        var name = req.query.titlepost;
        console.log(name);
        connection.query(queries.listtype, (err, result) => {
            if(err){
                console.log(err);
            }else{
                typeproduct = result;
                connection.query(queries.getPostByName(name), (err, posts)=>{
                    if(err){
                        console.log(err);
                    }else{
                        for(var i = 0 ; i < posts.length ; i++){
                            posts[i].datecreate = `Ngày ${posts[i].datecreate.getDate()} Tháng ${posts[i].datecreate.getMonth()+1} Năm ${posts[i].datecreate.getFullYear()}`;
                        }
                        post = posts.slice(start, end);
                        size = Math.ceil(posts.length/perPage);
                        connection.query(queries.listcategory, (err, results) => {
                            if(err){
                                console.log(err);
                            }else{
                                if(req.signedCookies.userID){
                                    connection.query(queries.getUserByID(req.signedCookies.userID), (err, user) => {
                                        if(err){
                                            console.log(err);
                                        }else{
                                            res.render('blog', {size:size, currentPage: page,category : results ,typeproduct : typeproduct  , size : size, currentPage:page, name : user[0].name, post : post,username : user[0].username, userID : req.signedCookies.userID ,title: 'Apus Tarot Shop - Hệ thống quản trị'})
                                        }
                                    })
                                }else{
                                    res.render('blog', {size:size, currentPage: page,category : results ,typeproduct : typeproduct, post : post, title: 'Apus Tarot Shop - Hệ thống quản trị', size : size, currentPage:page });
                                }
                            }
                        });
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
                        if(req.signedCookies.userID){
                            connection.query(queries.getUserByID(req.signedCookies.userID), (err, user) => {
                                if(err){
                                    console.log(err);
                                }else{
                                    res.render('product-category', {products : products, category : category, typeproduct : typeproduct, count : results.length, size : size, currentPage:page ,title : categoryName, name : user[0].name, username : user[0].username, userID : req.signedCookies.userID});
                                }
                            })
                        }else{
                            res.render('product-category', {products : products, category : category, typeproduct : typeproduct, count : results.length, size : size, currentPage:page ,title : categoryName});
                        }
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
                console.log(err);
            }else{
                var imageprs = imageProducts;
                connection.query(queries.getProductID(req.params.id), (err, results)=>{
                    if(err){
                        console.log(err);
                    }else{
                        var nameProduct = results[0].name;
                        results[0].price = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(results[0].price);
                        if(results[0].newprice){
                            results[0].newprice = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(results[0].newprice);
                        }
                        res.render('detail',{size : 1, currentPage: 1, category : category, typeproduct : typeproduct, detail : results, nameProduct : nameProduct, imagePr : imageprs});
                    }
                });
            }
        });
    }

    showProductSearch(req, res){
        var name = req.query.search;
        var perPage = 8;
        var page = (req.query.page) || 1;
        var start = (page - 1)*perPage;
        var end = page*perPage;
        var size;
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
                results = results.slice(start,end);
                size = Math.ceil(results.length/perPage);
                res.render('product-category', {currentPage : page, size: size, products : results, category : category, typeproduct : typeproduct, title: "Tìm kiếm sản phẩm",count : results.length});
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
                typeproduct = results;
                if(req.signedCookies.userID){
                    connection.query(queries.getUserByID(req.signedCookies.userID), (err, user) => {
                        if(err){
                            console.log(err);
                        }else{
                            res.render('cart', {category : category, typeproduct : typeproduct, title: "Giỏ hàng", size : 1, currentPage:1 , name : user[0].name, username : user[0].username, userID : req.signedCookies.userID});
                        }
                    })
                }else{
                    res.render('cart', {category : category, typeproduct : typeproduct, title: "Giỏ hàng", size : 1, currentPage:1});
                }
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
        var sum = 0;
        connection.query(queries.listtype, (err, results)=>{
            if(err){
                console.log(err);
            }else{
                typeproduct=results;
                if(req.signedCookies.userID){
                    connection.query(queries.getUserByID(req.signedCookies.userID), (err, user) => {
                        if(err){
                            console.log(err);
                        }else{
                            sum = 1;
                            res.render('payment', {user:user, sum : sum, category : category, typeproduct : typeproduct, title: "Thanh toán", size : 1, currentPage:1 , name : user[0].name, username : user[0].username, userID : req.signedCookies.userID});
                        }
                    })
                }else{
                    res.render('payment', {sum : sum, category : category, typeproduct : typeproduct, title: "Thanh toán", size : 1, currentPage:1});
                }
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
        var category, typeproduct;
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
                typeproduct= results;
                if(req.signedCookies.userID){
                    connection.query(queries.getUserByID(req.signedCookies.userID), (err, user) => {
                        if(err){
                            console.log(err);
                        }else{
                            res.render('success', {category : category, typeproduct : typeproduct, title: "Thành Công Mua Hàng", size : 1, currentPage:1 , name : user[0].name, username : user[0].username, userID : req.signedCookies.userID});
                        }
                    })
                }else{
                    res.render('success', {category : category, typeproduct : typeproduct, title: "Thành Công Mua Hàng"});
                }
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