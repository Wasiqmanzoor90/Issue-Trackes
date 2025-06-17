const mongoose = require('mongoose');
const connectDb = async () => {
    try {
        const url = "mongodb://localhost:27017/nodeDb";
        const res = await mongoose.connect(url);
        if (res) {
            console.log("Connected to database");
        }
    } catch (error) {
        console.error("Error connecting to database:", error);
    }
}
module.exports = connectDb;