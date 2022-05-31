const crud = {
    listcategory : `SELECT * FROM CATEGORY`,
    listtype : `SELECT * FROM TYPEPRODUCT`,
    listproduct : `SELECT * FROM PRODUCT`,
    listrole : `SELECT * FROM ROLE`,
    listuser : `SELECT * FROM USER`,
    listslider : `SELECT * FROM SLIDER`,

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

    getProductandCategory : (id) => {
        return `SELECT * FROM PRODUCT INNER JOIN CATEGORY ON PRODUCT.category_id = CATEGORY.id;`
    }
};

module.exports = crud;