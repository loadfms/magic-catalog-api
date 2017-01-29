var postgres = require('./../../helpers/postgrecon');

module.exports = {
    get: function (category, callback, app) {
        var query = 'select p.* from ' + app +'_products p inner join ' + app +'_categories_products cp on cp.product_id = p.id inner join ' + app +'_categories c on c.id = cp.category_id where p.status = true and c.name = \'' + category + '\'';
        postgres.doquery(query, callback);
    }
}