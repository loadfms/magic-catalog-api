var postgres = require('./../../helpers/postgrecon');

module.exports = {
    get: function(callback, app){
        var query = 'select * from tb_' + app + '_product'
        postgres.doquery(query, callback);
    },
    getbycategory: function (category, callback, app) {
        var query = 'select p.* from tb_' + app + '_product p inner join tb_' + app + '_category_product cp on cp.product_id = p.id inner join tb_' + app +'_category c on c.id = cp.category_id where p.status = true and lower(unaccent(c.name)) = \'' + category + '\''
        postgres.doquery(query, callback);
    }
}