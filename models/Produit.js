const mongoose = require('mongoose');

const produitSchema = new mongoose.Schema({
    nomProduit: {
        type: String,
        required: [true, 'Le nom du produit est obligatoire'],
        trim: true
    },
    categorie: {
        type: String,
        required: [true, 'La catégorie est obligatoire'],
        trim: true
    },
    prix: {
        type: Number,
        required: [true, 'Le prix est obligatoire'],
        min: [0, 'Le prix ne peut pas être négatif']
    },
    quantiteStock: {
        type: Number,
        required: [true, 'La quantité en stock est obligatoire'],
        min: [0, 'La quantité ne peut pas être négative']
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Produit', produitSchema, 'produits');
