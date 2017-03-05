var postgres = require('./../../helpers/postgrecon');

module.exports = {
    get: function (callback, app) {
        postgres.doquery('select * from tb_' + app + '_category', callback);
    },
    post: function(callback, app, body){
        postgres.doquery('insert into tb_' + app + '_category (name) values (\'' + body.name + '\')', callback)
    },
    delete: function(callback, app, id){
        postgres.doquery('delete from tb_' + app + '_category where id = ' + id, callback)
    }
}