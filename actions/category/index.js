var postgres = require('./../../helpers/postgrecon');

module.exports = {
    get: function (callback) {
        postgres.doquery('select * from categories', callback);
    },
    menu: function (callback) {
        postgres.doquery('select * from categories where parent_id is null', callback);
    }

}