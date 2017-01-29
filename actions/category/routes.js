var express = require('express');
var category = require('./index');

module.exports = {
    register(router) {
        router.get('/api/:app/category', function (req, res) {
            category.get(function (items) {
                res.json(items);
            }, req.params.app);
        });

        router.get('/api/:app/category/menu', function (req, res) {
            category.menu(function (items) {
                res.json(items);
            }, req.params.app);
        });
    }
}
