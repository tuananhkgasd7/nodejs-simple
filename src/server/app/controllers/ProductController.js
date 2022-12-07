const Product = require('../models/Product');
const sendMail = require('../../config/email');
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
        let data = req.body;

        //check xml
        if(req.headers['content-type'].includes("xml"))
        {
            //xml to json
            const builder = new xml2js.Builder({
                renderOpts: { 'pretty': false }
            });
            var parser = new xml2js.Parser({explicitArray : false});

            parser.parseString(builder.buildObject(data), function (err, result) {
                console.dir(JSON.stringify(result));
                data = result.product;
            })
        }

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
        let data = req.body;
        
        //check xml
        if(req.headers['content-type'].includes("xml"))
        {
            //xml to json
            const builder = new xml2js.Builder({
                renderOpts: { 'pretty': false }
            });
            var parser = new xml2js.Parser({explicitArray : false});

            parser.parseString(builder.buildObject(data), function (err, result) {
                console.dir(JSON.stringify(result));
                data = result.product;
            })
        }
        
        Product.updateOne({ _id: data._id }, data)
        .then(() => {
            res.json({'message': 'updated',  ...data});
            sendMail({type: 'PUT', content: data});
        })
        .catch(next);
    }

    //[DELETE] delete
    delete(req, res, next) {
        let data = req.body;
        
        //check xml
        if(req.headers['content-type'].includes("xml"))
        {
            //xml to json
            const builder = new xml2js.Builder({
                renderOpts: { 'pretty': false }
            });
            var parser = new xml2js.Parser({explicitArray : false});

            parser.parseString(builder.buildObject(data), function (err, result) {
                console.dir(JSON.stringify(result));
                data = result.product;
            })
        }

        Product.deleteOne({ _id: data._id })
        .then( () => {
            res.json({'message': 'deleted',  ...data});
            sendMail({type: 'DELETE', content: data});
        })
        .catch(next);
    }
    
}

module.exports = new NewsController;
