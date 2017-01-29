var postgres = require('./../../helpers/postgrecon');

module.exports = {
    get: function (category, callback) {
        var query = 'select p.* from products p inner join categories_products cp on cp.product_id = p.id inner join categories c on c.id = cp.category_id where p.status = true and c.name = \'' + category + '\'';
        postgres.doquery(query, callback);
    }
}