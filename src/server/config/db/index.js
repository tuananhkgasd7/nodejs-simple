const mongoose = require('mongoose');

const connect = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/shop', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log('Connection successfully!')
    } catch (error){
        console.log('Connection failure!')
    }
};

module.exports = { connect };