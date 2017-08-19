var postgres = require('./../../helpers/postgrecon');

export class CategoryProduct {
    constructor(router) {
        this.register(router);
    }
    save(app, productid, categories, callback) {
        postgres.doquery('delete from tb_' + app + '_category_product where product_id = ' + productid, () => {
            categories.map((object, index) => {
                postgres.doquery('insert into tb_' + app + '_category_product (product_id, category_id) values (' + productid + ',' + object + ')', callback)
            })
        })
    }
    register(router) {
        router.post('/api/:app/categoryproduct/:productid/:categories', (req, res) => {
            let categoriesArray = [];
            categoriesArray = req.params.categories.split(',');
            this.save(req.params.app, req.params.productid, categoriesArray, () => {
                res.json({ status: "ok" });
            });
        })
    }
}