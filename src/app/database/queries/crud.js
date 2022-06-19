const crud = {
    listcategory : `SELECT * FROM CATEGORY`,
    listtype : `SELECT * FROM TYPEPRODUCT`,
    listproduct : `SELECT * FROM PRODUCT`,
    listproductDate : `SELECT * FROM apustarot.product where month(datecreate)-5>0 ORDER BY datecreate DESC LIMIT 8;`,
    listrole : `SELECT * FROM ROLE`,
    listuser : `SELECT * FROM USER WHERE USER.role_id = 5`,
    listslider : `SELECT * FROM SLIDER`,
    listorder : `SELECT * FROM APUSTAROT.ORDER ORDER BY dateorder`,
    listorderdetail : `SELECT * FROM APUSTAROT.DETAILORDER`,
    listamountorder : `SELECT * FROM apustarot.detailorder inner join apustarot.order on apustarot.detailorder.order_id = apustarot.order.id where apustarot.order.status = 0;`,
    listuserwithrole : `SELECT apustarot.user.id, apustarot.user.image ,apustarot.user.name, apustarot.user.phone ,apustarot.role.name as role from apustarot.user 
                        inner join apustarot.role on apustarot.user.role_id = apustarot.role.id where apustarot.user.role_id != 5;`,
    listpost : `SELECT apustarot.post.id, title, content, apustarot.post.link, apustarot.post.datecreate, apustarot.post.status, apustarot.user.name as username, apustarot.category.name as categoryname from apustarot.post, apustarot.user, apustarot.category where apustarot.post.creater = apustarot.user.id and apustarot.post.category_id = apustarot.category.id;`,

    addCategory : (data) =>{
        return `INSERT INTO CATEGORY (id, name, link, child) VALUES (NULL, '${data.name}', '${data.link}', '${data.child}');`
    },
    addType : (data) =>{
        return `INSERT INTO TYPEPRODUCT (id, name, link) VALUES (NULL, '${data.name}', '${data.link}');`
    },
    addProduct : (data) =>{
        return `INSERT INTO PRODUCT (id, name, link, shortdescription, detaildescription, price, newprice, image, new, capture, datecreate, dateupdate, status, category_id) 
        VALUES (NULL, '${data.name}', '${data.link}', '${data.shortdescription}', '${data.detaildescription}', '${data.price}', NULL, '${data.image}', 
        NULL, NULL, '${data.datecreate}', NULL, 0, '${data.category_id}');`
    },
    addProductImage : (data) =>{
        return `INSERT INTO IMAGEPRODUCT (id, image, product_id) VALUES (NULL, '${data.image}', '${data.id}');`
    },
    addRole : (data) => {
        return `INSERT INTO ROLE (id, name) VALUES (NULL, '${data.name}');`
    },
    addUser : (data) => {
        return `INSERT INTO USER (id, username, password, email, name, address, birthday, datecreate, dateupdate, status, role_id, gender)
        VALUES (NULL, '${data.username}', '${data.password}', '${data.email}', NULL, NULL, NULL,'${data.datecreate}' , NULL, 1, 5, NULL);`
    },
    addSlider : (data) => {
        return `INSERT INTO SLIDER (id, content, status, link) VALUES (NULL, '${data.content}', NULL, '${data.link}');`
    },
    addImageSlider : (data) => {
        return `INSERT INTO IMAGESLIDER (id, image, slider_id, text, detail) VALUES (NULL, '${data.image}', '${data.slider_id}', '${data.text}', '${data.detail}');`
    },
    addOrder : (data) => {
        return `INSERT INTO APUSTAROT.ORDER (id, dateorder, intomoney, name, phone, email, address, note, feeship, discount, typediscount, paymentmethod, reasoncancel, totalamount, totalmoney, status) VALUES
                ('${data.id}', '${data.dateorder}', '${data.intomoney}', '${data.name}', '${data.phone}', '${data.email}', '${data.address}', NULL, '${data.feeship}', NULL, NULL, 1, NULL,
                '${data.totalamount}', '${data.totalmoney}', 1);`
    },
    addDetailOrder : (data) =>{
        return `INSERT INTO DETAILORDER (id, amount, unitprice, order_id, product_id) VALUES (NULL, ${data.amount}, ${data.unitprice}, ${data.order_id}, ${data.product_id});`
    },
    addPost : (data) => {
        return `INSERT INTO POST (id, title, content, link, datecreate, dateupdate, status, creater, fixter, category_id) VALUES (NULL, '${data.title}', '${data.content}', '${data.link}', '${data.datecreate}', NULL, 1, '${data.creater}', '${data.creater}', '${data.category_id}')`
    },

    getCategoryByID : (id) =>{
        return `SELECT * FROM CATEGORY WHERE CATEGORY.id = ${id};`
    },
    getTypeByID : (id) =>{
        return `SELECT * FROM TYPEPRODUCT WHERE TYPEPRODUCT.id = ${id};`
    },
    getProductID : (id) =>{
        return `SELECT * FROM PRODUCT WHERE PRODUCT.id = ${id};`
    },
    getProductByName : (name) =>{
        return `SELECT * FROM PRODUCT WHERE PRODUCT.name LIKE '%${name}%';`
    },
    getProductByCategoryID : (id) =>{
        return `SELECT * FROM PRODUCT WHERE PRODUCT.category_id = ${id};`
    },
    getProductandCategory : (id) => {
        return `SELECT * FROM PRODUCT INNER JOIN CATEGORY ON PRODUCT.category_id = CATEGORY.id;`
    },
    getUserByID : (id) =>{
        return `SELECT * FROM USER WHERE USER.id = ${id};`
    },
    getUserByUserName : (username) =>{
        return `SELECT * FROM USER WHERE USER.username = '${username}';`
    },
    getUserByEmail : (email) =>{
        return `SELECT * FROM USER WHERE USER.email = '${email}';`
    },
    getSliderByID : (id) =>{
        return `SELECT * FROM SLIDER WHERE SLIDER.id = '${id}';`
    },
    getSliderByStatus : `SELECT * FROM SLIDER WHERE SLIDER.STATUS = 1;`,
    getImageSliderByID : (id) =>{
        return `SELECT * FROM IMAGESLIDER WHERE IMAGESLIDER.slider_id = '${id}';`
    },
    getImageProductByPrID : (id) =>{
        return `SELECT * FROM IMAGEPRODUCT WHERE product_id = ${id};`
    },
    getOrderByID : (id) =>{
        return `SELECT * FROM APUSTAROT.ORDER WHERE APUSTAROT.ORDER.id = '${id}';`
    },
    getRoleByID : (id) =>{
        return `SELECT * FROM APUSTAROT.ROLE WHERE APUSTAROT.ROLE.id = '${id}';`
    },

    updateCategory : (data) =>{
        return `UPDATE CATEGORY SET
                name = '${data.name}',
                link = '${data.link}',
                child = '${data.child}'
                WHERE CATEGORY.id = ${data.id};`
    },
    updateTypeProduct : (data) =>{
        return `UPDATE TYPEPRODUCT SET
                name = '${data.name}',
                link = '${data.link}'
                WHERE TYPEPRODUCT.id = ${data.id};`
    },
    updateProduct : (data) => {
        return `UPDATE PRODUCT SET
                name = '${data.name}',
                link = '${data.link}', 
                shortdescription = '${data.shortdescription}',
                detaildescription = '${data.detaildescription}',
                price = '${data.price}',
                newprice = '${data.newprice}',
                new = '${data.new}',
                capture = '${data.capture}',
                dateupdate = '${data.dateupdate}',
                category_id = '${data.category_id}'
                WHERE PRODUCT.id = ${data.id};`
    },
    updateStatusSlide : (data) =>{
        return `UPDATE SLIDER SET
                status = '${data.status}'
                WHERE SLIDER.id = ${data.id};`
    },

    deleteCategory : (id) => {
        return `DELETE FROM CATEGORY WHERE id = ${id};`
    },
    deleteTypeProduct : (id) => {
        return `DELETE FROM TYPEPRODUCT WHERE id = ${id};`
    },
    deleteProduct : (id) => {
        return `DELETE FROM PRODUCT WHERE id = ${id};`
    },
    deleteSlider : (id) => {
        return `DELETE FROM SLIDER WHERE id = ${id};`
    },
    deleteImageSlider : (id) => {
        return `DELETE FROM APUSTAROT.IMAGESLIDER WHERE APUSTAROT.IMAGESLIDER.slider_id = ${id};`
    }
};

module.exports = crud;