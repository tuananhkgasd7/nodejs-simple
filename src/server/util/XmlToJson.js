const xml2js = require('xml2js');

const xmlToJson = (req) => {
    if(req.headers['content-type'].includes("xml"))
    {
        let data;
        //xml to json
        const builder = new xml2js.Builder({
            renderOpts: { 'pretty': false }
        });
        var parser = new xml2js.Parser({explicitArray : false});

        parser.parseString(builder.buildObject(req.body), function (err, result) {
            console.log(result.product)
            data = result.product;
        })
        return data;
    }
    else{
        return req.body;
    }
}

module.exports = xmlToJson;