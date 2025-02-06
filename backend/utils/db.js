import mongoose from "mongoose";

const connectDB = async () => {
    // try {
    //     await mongoose.connect(`${process.env.MONGODB_URI}/JobPortal`);
    //     console.log('mongodb connected successfully');
    // } catch (error) {
    //     console.log(error);
    // }
    mongoose.connection.on('connected', ()=>{
        console.log('DataBase Connected')
      })
    
      await mongoose.connect(`${process.env.MONGODB_URI}`)
}
export default connectDB;