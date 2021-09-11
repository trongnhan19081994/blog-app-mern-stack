import mongoose from 'mongoose'
const URI = process.env.MONGODB_URL

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
}
const connectDB = async () => {
    await mongoose.connect(`${URI}`, options, err => {
        if(err) throw err
        console.log('MongoDB connection SUCCESS!')
    })
}
 export default connectDB
