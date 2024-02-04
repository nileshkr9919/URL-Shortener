import mongoose from 'mongoose';

export const connectMongoDB = async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${process.env.DB_NAME}`);
        console.log(`Connection to mongodb successful!!`);
    } catch (error) {
        console.log('Connection to mongodb failed: ', error);
        process.exit(1);
    }
}
