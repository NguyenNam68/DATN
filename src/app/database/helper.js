const connection = require('../database/connection');
const queries = require('../database/queries/crud');

class Helper{
    Category(category){
        connection.query(queries.listcategory, (err, results)=>{
            if(err){
                console.log(err);
            }else{
                category = results;
            }
        })
        return category;
    }
}

module.exports = new Helper;