const Product = require('../models/Product');

class NewsController {
    //[GET] /
    index(req, res, next){
        Product.find({})
        .then(
            products => {
                res.json(products);
            }
        )
        .catch(next);
    }

    //[POST] create
    create(req, res) {
        const data = req.body;
        const product = new Product(data);
        product
        .save()
        .then(
            res.json(data)
        )
        .catch((error) => {});
    }

    //[PUT] update/:_id
    update(req, res, next) {
        Product.updateOne({ _id: req.params._id }, req.body)
        .then( res.json({'message': "updated"}))
        .catch(next);
    }

    //[DELETE] delete/:_id
    delete(req, res, next) {
        Product.deleteOne({ _id: req.params._id })
        .then( res.json({'message': "deleted"}))
        .catch(next);
    }
    
}

module.exports = new NewsController;
