

const mongoose = require("mongoose");


const dbConfig = {
    mongoURL: process.env.MONGO_URL
}

mongoose.connect(dbConfig.mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    poolSize: 350,
    bufferMaxEntries: 0
})
    .then(() => console.log('MongoDB Connected')).catch((err) => console.log(err))
mongoose.Promise = global.Promise
mongoose.set('useFindAndModify', false);
// mongoose.set('debug', true);
let mongo = mongoose.connection
mongo.on('error', console.error.bind(console, 'MongoDB connection error:'))

module.exports = mongo



