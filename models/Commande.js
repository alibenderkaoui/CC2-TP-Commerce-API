const mongoose = require('mongoose');

const produitCommandeSchema = new mongoose.Schema({
    produit: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Produit',
        required: true
    },
    quantite: {
        type: Number,
        required: true,
        min: [1, 'Quantité minimum: 1']
    }
}, { _id: false });

const commandeSchema = new mongoose.Schema({
    dateCommande: {
        type: Date,
        default: Date.now
    },
    client: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Client',
        required: true
    },
    produits: {
        type: [produitCommandeSchema],
        required: true,
        validate: {
            validator: (v) => v && v.length > 0,
            message: 'Au moins un produit requis'
        }
    },
    montantTotal: {
        type: Number,
        required: true,
        min: [0, 'Le montant ne peut pas être négatif']
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Commande', commandeSchema, 'commandes');
