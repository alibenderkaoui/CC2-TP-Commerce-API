const mongoose = require('mongoose');
const Produit = require('../models/Produit');


const create = async (req, res) => {
    try {
        const produit = new Produit(req.body);
        const savedProduit = await produit.save();
        res.status(201).json({
            success: true,
            data: savedProduit,
            message: 'Produit créé avec succès'
        });
    } catch (error) {
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({
                success: false,
                message: messages.join(', ')
            });
        }
        res.status(500).json({
            success: false,
            message: `Erreur serveur: ${error.message}`
        });
    }
};


const getAll = async (req, res) => {
    try {
        const filter = {};
        if (req.query.categorie) {
            filter.categorie = req.query.categorie;
        }
        if (req.query.minPrix || req.query.maxPrix) {
            filter.prix = {};
            if (req.query.minPrix) filter.prix.$gte = Number(req.query.minPrix);
            if (req.query.maxPrix) filter.prix.$lte = Number(req.query.maxPrix);
        }
        const produits = await Produit.find(filter).sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            count: produits.length,
            data: produits
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: `Erreur serveur: ${error.message}`
        });
    }
};


const getById = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({
                success: false,
                message: 'Identifiant invalide'
            });
        }
        const produit = await Produit.findById(req.params.id);
        if (!produit) {
            return res.status(404).json({
                success: false,
                message: 'Produit non trouvé'
            });
        }
        res.status(200).json({
            success: true,
            data: produit
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: `Erreur serveur: ${error.message}`
        });
    }
};


const update = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({
                success: false,
                message: 'Identifiant invalide'
            });
        }
        const produit = await Produit.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!produit) {
            return res.status(404).json({
                success: false,
                message: 'Produit non trouvé'
            });
        }
        res.status(200).json({
            success: true,
            data: produit,
            message: 'Produit modifié avec succès'
        });
    } catch (error) {
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({
                success: false,
                message: messages.join(', ')
            });
        }
        res.status(500).json({
            success: false,
            message: `Erreur serveur: ${error.message}`
        });
    }
};


const remove = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({
                success: false,
                message: 'Identifiant invalide'
            });
        }
        const produit = await Produit.findByIdAndDelete(req.params.id);
        if (!produit) {
            return res.status(404).json({
                success: false,
                message: 'Produit non trouvé'
            });
        }
        res.status(200).json({
            success: true,
            data: produit,
            message: 'Produit supprimé avec succès'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: `Erreur serveur: ${error.message}`
        });
    }
};

module.exports = { create, getAll, getById, update, delete: remove };
