var express = require('express');
var category = require('./index');

module.exports = {
    register(router) {
        router.get('/api/category', function (req, res) {
            //res.json(status);
            category.get(function (items) {
                res.json(items);
            });
        });

        router.get('/api/category/menu', function (req, res) {
            //res.json(status);
            category.menu(function (items) {
                res.json(items);
            });
        });
    }
}
