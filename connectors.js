import Mongoose from 'mongoose'


Mongoose.Promise = global.Promise

// const mongo = Mongoose.connect(`mongodb://test:123@graphql-poc-shard-00-00-trxb2.mongodb.net:27017,graphql-poc-shard-00-01-trxb2.mongodb.net:27017,graphql-poc-shard-00-02-trxb2.mongodb.net:27017/test?ssl=true&replicaSet=GraphQL-POC-shard-0&authSource=admin`, { })
const mongo = Mongoose.connect(`mongodb://docker:docker@localhost:27017?retryWrites=true`, {
  useNewUrlParser: true
})
const db = Mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))

export { db }
