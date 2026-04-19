const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
    nomComplet: {
        type: String,
        required: [true, 'Le nom complet est obligatoire'],
        trim: true
    },
    email: {
        type: String,
        required: [true, "L'email est obligatoire"],
        unique: true,
        lowercase: true,
        trim: true,
        match: [/^\S+@\S+\.\S+$/, 'Email invalide']
    },
    telephone: {
        type: String,
        required: [true, 'Le téléphone est obligatoire'],
        trim: true
    },
    ville: {
        type: String,
        required: [true, 'La ville est obligatoire'],
        trim: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Client', clientSchema, 'clients');
