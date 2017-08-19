var postgres = require('./../../helpers/postgrecon');

export class componentProduct {
    constructor(router) {
        this.register(router);
    }
    getall(app, callback) {
        var query = 'select * from tb_' + app + '_product order by name'
        postgres.doquery(query, callback);
    }
    getbycategory(app, category, callback) {
        var query = 'select p.* from tb_' + app + '_product p inner join tb_' + app + '_category_product cp on cp.product_id = p.id inner join tb_' + app + '_category c on c.id = cp.category_id where p.status = true and lower(unaccent(c.name)) = \'' + category + '\''
        postgres.doquery(query, callback);
    }
    save(app, body, callback) {
        postgres.doquery('insert into tb_' + app + '_product (name, description, image, status) values (\'' + body.name + '\', \'' + body.description + '\', \'' + body.image + '\', true)', callback)
    }
    update(app, body, callback) {
        postgres.doquery('update tb_' + app + '_product set name = \'' + body.name + '\' , description = \'' + body.description + '\', image = \'' + body.image + '\', status = ' + body.status + ' where id = ' + body.id, callback)
    }
    delete(app, id, callback) {
        postgres.doquery('update tb_' + app + '_product set status = false where id = ' + id, callback);
    }
    register(router) {
        router.get('/api/:app/product', (req, res) => {
            this.getall(req.params.app, (items) => {
                res.json(items);
            })
        });
        router.get('/api/:app/product/:category', (req, res) => {
            this.getbycategory(req.params.app, req.params.category, (items) => {
                res.json(items);
            })
        });
        router.post('/api/:app/product', (req, res) => {
            this.save(req.params.app, req.body, (result) => {
                res.json(result);
            })
        });
        router.put('/api/:app/product', (req, res) => {
            this.update(req.params.app, req.body, (result) => {
                res.json(result);
            })
        });
        router.delete('/api/:app/product/:id', (req, res) => {
            this.delete(req.params.app, req.params.id, (result) => {
                res.json(result);
            })
        });
    }

}