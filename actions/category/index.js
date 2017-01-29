var postgres = require('./../../helpers/postgrecon');

module.exports = {
    get: function (callback, app) {
        postgres.doquery('select * from ' + app + '_categories', callback);
    },
    menu: function (callback, app) {
        postgres.doquery('select * from ' + app + '_categories where parent_id is null', callback);
    }

}