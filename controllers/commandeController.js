const mongoose = require('mongoose');
const Commande = require('../models/Commande');
const Client = require('../models/Client');
const Produit = require('../models/Produit');


const create = async (req, res) => {
    try {
        const { client, produits } = req.body;

        // Vérifier que le client existe
        const clientExists = await Client.findById(client);
        if (!clientExists) {
            return res.status(400).json({
                success: false,
                message: 'Client non trouvé'
            });
        }

        let montantTotal = 0;
        for (const item of produits) {
            const produit = await Produit.findById(item.produit);
            if (!produit) {
                return res.status(400).json({
                    success: false,
                    message: `Produit non trouvé: ${item.produit}`
                });
            }
            
            if (produit.quantiteStock < item.quantite) {
                return res.status(400).json({
                    success: false,
                    message: `Stock insuffisant pour le produit: ${produit.nomProduit}. Stock disponible: ${produit.quantiteStock}`
                });
            }
            montantTotal += produit.prix * item.quantite;
        }

       
        const commande = new Commande({
            client,
            produits,
            montantTotal
        });
        const savedCommande = await commande.save();

        for (const item of produits) {
            await Produit.findByIdAndUpdate(item.produit, {
                $inc: { quantiteStock: -item.quantite }
            });
        }

        const populatedCommande = await Commande.findById(savedCommande._id)
            .populate('client', 'nomComplet email telephone ville')
            .populate('produits.produit', 'nomProduit categorie prix');

        res.status(201).json({
            success: true,
            data: populatedCommande,
            message: 'Commande créée avec succès'
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
        const commandes = await Commande.find()
            .populate('client', 'nomComplet email telephone ville')
            .populate('produits.produit', 'nomProduit categorie prix')
            .sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            count: commandes.length,
            data: commandes
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
        const commande = await Commande.findById(req.params.id)
            .populate('client', 'nomComplet email telephone ville')
            .populate('produits.produit', 'nomProduit categorie prix');
        if (!commande) {
            return res.status(404).json({
                success: false,
                message: 'Commande non trouvée'
            });
        }
        res.status(200).json({
            success: true,
            data: commande
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

        const existingCommande = await Commande.findById(req.params.id);
        if (!existingCommande) {
            return res.status(404).json({
                success: false,
                message: 'Commande non trouvée'
            });
        }

       
        for (const item of existingCommande.produits) {
            await Produit.findByIdAndUpdate(item.produit, {
                $inc: { quantiteStock: item.quantite }
            });
        }

        const { client, produits } = req.body;

        if (client) {
            const clientExists = await Client.findById(client);
            if (!clientExists) {
                return res.status(400).json({
                    success: false,
                    message: 'Client non trouvé'
                });
            }
        }

        let montantTotal = 0;
        for (const item of produits) {
            const produit = await Produit.findById(item.produit);
            if (!produit) {
                return res.status(400).json({
                    success: false,
                    message: `Produit non trouvé: ${item.produit}`
                });
            }
            if (produit.quantiteStock < item.quantite) {
                return res.status(400).json({
                    success: false,
                    message: `Stock insuffisant pour: ${produit.nomProduit}`
                });
            }
            montantTotal += produit.prix * item.quantite;
        }

        const updateData = { produits, montantTotal };
        if (client) updateData.client = client;

        const commande = await Commande.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true, runValidators: true }
        );

        for (const item of produits) {
            await Produit.findByIdAndUpdate(item.produit, {
                $inc: { quantiteStock: -item.quantite }
            });
        }

        const populatedCommande = await Commande.findById(commande._id)
            .populate('client', 'nomComplet email telephone ville')
            .populate('produits.produit', 'nomProduit categorie prix');

        res.status(200).json({
            success: true,
            data: populatedCommande,
            message: 'Commande modifiée avec succès'
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
        const commande = await Commande.findByIdAndDelete(req.params.id);
        if (!commande) {
            return res.status(404).json({
                success: false,
                message: 'Commande non trouvée'
            });
        }

       
        for (const item of commande.produits) {
            await Produit.findByIdAndUpdate(item.produit, {
                $inc: { quantiteStock: item.quantite }
            });
        }

        res.status(200).json({
            success: true,
            data: commande,
            message: 'Commande supprimée avec succès - Stock restauré'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: `Erreur serveur: ${error.message}`
        });
    }
};

module.exports = { create, getAll, getById, update, delete: remove };
