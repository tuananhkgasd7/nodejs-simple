const Product = require('../models/Product');
const sendMail = require('../../config/email');
const xmlToJson = require('../../util/xmlToJson');
const xml2js = require('xml2js')

class NewsController {
    //[GET] /
    index(req, res, next){
        Product.find({})
        .then(
            products => {
                res.json(products);
                sendMail({type: 'GET', content: products});
            }
        )
        .catch(next);
    }

    //[POST] create
    create(req, res) {
        const data = xmlToJson(req);
        
        //create product
        const product = new Product(data);
        product.save().then(
            () => {
                res.json({'message': 'created',  ...data});
                sendMail({type: 'POST', content: data})
            }
        )
        .catch((error) => {});

    }

    //[PUT] update
    update(req, res, next) {
        const data = xmlToJson(req);
        
        Product.updateOne({ _id: data._id }, data)
        .then(() => {
            res.json({'message': 'updated',  ...data});
            sendMail({type: 'PUT', content: data});
        })
        .catch(next);
    }

    //[DELETE] delete
    delete(req, res, next) {
        const data = xmlToJson(req);

        Product.deleteOne({ _id: data._id })
        .then( () => {
            res.json({'message': 'deleted',  ...data});
            sendMail({type: 'DELETE', content: data});
        })
        .catch(next);
    }
    
}

module.exports = new NewsController;
