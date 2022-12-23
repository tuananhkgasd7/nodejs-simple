const Product = require('../models/Product');
const sendEmailToReceiver = require('../../config/email');
const xmlToJson = require('../../util/xmlToJson');
const {typeDatabase} = require('../../config/base');
const {executeSqlCommand, sql, executeStoreProcedure} = require('../../service/database');
class NewsController {
    //[GET] /
    async index(req, res, next){
        if(typeDatabase === 'sql'){
            const response = await executeSqlCommand(`dbo.sp_GET_PRODUCTS`);
            res.json(response);
        }
        else {
            Product.find({})
            .then(
                products => {
                    res.json(products);
                }
            )
            .catch(next);
        }
    }

    //[POST] create
    async create(req, res) {
        const productDetail = xmlToJson(req);
        
        //create product
        const product = new Product(productDetail);
        if(typeDatabase === 'sql'){
            await executeStoreProcedure(`dbo.sp_CREATE_PRODUCT`, productDetail);
            res.json({'message': 'created',  productDetail});
            sendEmailToReceiver('POST', productDetail);
        }
        else {
            product.save().then(
                () => {
                    res.json({'message': 'created',  ...productDetail});
                    sendEmailToReceiver('POST', productDetail)
                }
            )
            .catch(next);
        }

    }

    //[PUT] update
    async update(req, res, next) {
        const productDetail = xmlToJson(req);

        if(typeDatabase === 'sql'){
            await executeStoreProcedure(`dbo.sp_UPDATE_PRODUCT`, productDetail);
            res.json({'message': 'updated',  ...productDetail});
            sendEmailToReceiver('PUT', productDetail);
        }
        else {
            Product.updateOne({ _id: productDetail._id }, productDetail)
            .then(() => {
                res.json({'message': 'updated',  ...productDetail});
                sendEmailToReceiver('PUT', productDetail);
            })
            .catch(next);
        }
    }

    //[DELETE] delete
    async delete(req, res, next) {
        const productDetail = xmlToJson(req);

        if(typeDatabase === 'sql'){
            await executeStoreProcedure(`dbo.sp_DELETE_PRODUCT`, productDetail);
            res.json({'message': 'deleted',  ...productDetail});
            sendEmailToReceiver('DELETE', productDetail);
        }
        else {
            Product.deleteOne({ _id: productDetail._id })
            .then( () => {
                res.json({'message': 'deleted',  ...productDetail});
                sendEmailToReceiver('DELETE', productDetail);
            })
            .catch(next);
        }
    }
    
}

module.exports = new NewsController;
