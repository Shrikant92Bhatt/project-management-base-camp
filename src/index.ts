import dotenv from 'dotenv';
import app from './app';
import connectDB from './db';
dotenv.config();


connectDB().then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`✅ Server is running on http://localhost:${process.env.PORT} 🚀`);
    }).on('error', (error) => {
        console.log('❌ Error starting server', error);
        process.exit(1);
    });
}).catch((error) => {
    console.log('❌ Error connecting to MongoDB', error);
    process.exit(1);
});



