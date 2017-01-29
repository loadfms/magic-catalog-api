var postgres = require('./../../helpers/postgrecon');
var config = require('./../../config.json');

module.exports = {
    get: function (category, callback) {
        var query = 'select p.* from ' + config.app +'_products p inner join ' + config.app +'_categories_products cp on cp.product_id = p.id inner join ' + config.app +'_categories c on c.id = cp.category_id where p.status = true and c.name = \'' + category + '\'';
        postgres.doquery(query, callback);
    }
}