import mongoose from "mongoose";


const dbConnect = async()=>{
   try {
     const connectionInstance = await mongoose.connect(`${process.env.MONGO_URL}`);
     console.log(`Database Connected Successfully !! at Port : ${process.env.PORT}`);
   } catch (error) {
    console.log(`Failed while connecting to database :${error}`);
    process.exit(1);
   }
}

export default dbConnect;