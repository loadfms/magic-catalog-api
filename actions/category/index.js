var postgres = require('./../../helpers/postgrecon');

module.exports = {
    get: function (callback, app) {
        postgres.doquery('select * from tb_' + app + '_category', callback);
    },
    post: function (callback, app, body) {
        postgres.doquery('insert into tb_' + app + '_category (name) values (\'' + body.name + '\')', callback)
    },
    put: function (callback, app, body) {
        postgres.doquery('update tb_' + app + '_category set name = \'' + body.name + '\' where id = ' + body.id, callback)
    },
    delete: function (callback, app, id) {
        postgres.doquery('delete from tb_' + app + '_category where id = ' + id, callback)
    },
    getbyproduct: function (callback, app, productid) {
        var query = 'select p.* from tb_' + app + '_category p inner join tb_' + app + '_category_product cp on cp.category_id = p.id inner join tb_' + app + '_product pr on cp.product_id = pr.id where pr.image is not null and cp.product_id = ' + productid
        var result = [];
        postgres.doquery(query, function (items) {
            items.rows.map((object, id) => {
                result.push(object.id);
            });
            callback(result);
        });
    }
}