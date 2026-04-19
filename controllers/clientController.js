const Client = require('../models/Client');


const create = async (req, res) => {
    try {
        const client = new Client(req.body);
        const savedClient = await client.save();
        res.status(201).json({
            success: true,
            data: savedClient,
            message: 'Client créé avec succès'
        });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({
                success: false,
                message: 'Cet email est déjà utilisé'
            });
        }
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
        const clients = await Client.find().sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            count: clients.length,
            data: clients
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
        const client = await Client.findById(req.params.id);
        if (!client) {
            return res.status(404).json({
                success: false,
                message: 'Client non trouvé'
            });
        }
        res.status(200).json({
            success: true,
            data: client
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
        const client = await Client.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!client) {
            return res.status(404).json({
                success: false,
                message: 'Client non trouvé'
            });
        }
        res.status(200).json({
            success: true,
            data: client,
            message: 'Client modifié avec succès'
        });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({
                success: false,
                message: 'Cet email est déjà utilisé'
            });
        }
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
        const client = await Client.findByIdAndDelete(req.params.id);
        if (!client) {
            return res.status(404).json({
                success: false,
                message: 'Client non trouvé'
            });
        }
        res.status(200).json({
            success: true,
            data: client,
            message: 'Client supprimé avec succès'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: `Erreur serveur: ${error.message}`
        });
    }
};

module.exports = { create, getAll, getById, update, delete: remove };
