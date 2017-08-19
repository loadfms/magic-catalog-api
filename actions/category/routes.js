var express = require('express');
var category = require('./index');

module.exports = {
    register(router) {
        router.get('/api/:app/category', function (req, res) {
            category.get(function (items) {
                res.json(items);
            }, req.params.app);
        });

        router.post('/api/:app/category', function (req, res) {
            category.post(function (result) {
                res.json(result);
            }, req.params.app, req.body)
        });

        router.put('/api/:app/category', function (req, res) {
            category.put(function (result) {
                res.json(result);
            }, req.params.app, req.body)
        });

        router.delete('/api/:app/category/:id', function (req, res) {
            category.delete(function (result) {
                res.json(result);
            }, req.params.app, req.params.id)
        });

        router.get('/api/:app/category/menu', function (req, res) {
            category.menu(function (items) {
                res.json(items);
            }, req.params.app);
        });

        router.get('/api/:app/category/product/:productid', function (req, res) {
            category.getbyproduct(function (items) {
                res.json(items);
            }, req.params.app, req.params.productid);
        });
    }
}
