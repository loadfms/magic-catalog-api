var postgres = require('./../../helpers/postgrecon');
var config = require('./../../config.json');

module.exports = {
    get: function (callback) {
        postgres.doquery('select * from ' + config.app + '_categories', callback);
    },
    menu: function (callback) {
        postgres.doquery('select * from ' + config.app + '_categories where parent_id is null', callback);
    }

}