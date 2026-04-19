const mongoose = require('mongoose');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/commerce_db';

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(MONGO_URI);
        console.log(`MongoDB connecté avec succès`);
        console.log(`  Hôte: ${conn.connection.host}`);
        console.log(`  Base: ${conn.connection.name}`);
        return conn;
    } catch (error) {
        console.error(`Erreur de connexion: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;
