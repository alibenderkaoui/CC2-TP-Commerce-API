const express = require('express');
const connectDB = require('./config/db');
const clientRoutes = require('./routes/clientRoutes');
const produitRoutes = require('./routes/produitRoutes');
const commandeRoutes = require('./routes/commandeRoutes');

const app = express();

// Middleware pour parser le JSON
app.use(express.json());

// Logger middleware
app.use((req, res, next) => {
    console.log(`${req.method} ${req.originalUrl} - ${new Date().toISOString()}`);
    next();
});

// Routes
app.use('/api/clients', clientRoutes);
app.use('/api/produits', produitRoutes);
app.use('/api/commandes', commandeRoutes);

// Health check
app.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Mini Commercial REST API',
        version: '1.0.0',
        endpoints: {
            clients: '/api/clients',
            produits: '/api/produits',
            commandes: '/api/commandes'
        }
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: `Route non trouvée: ${req.originalUrl}`
    });
});

// Gestionnaire d'erreurs global
app.use((err, req, res, next) => {
    console.error(`Erreur serveur: ${err.message}`);
    res.status(500).json({
        success: false,
        message: `Erreur serveur: ${err.message}`
    });
});

const PORT = process.env.PORT || 3000;

const startServer = async () => {
    await connectDB();
    app.listen(PORT, () => {
        console.log(`\nServeur démarré avec succès`);
        console.log(`  URL: http://localhost:${PORT}`);
        console.log(`  API: http://localhost:${PORT}/api/clients`);
        console.log(`  API: http://localhost:${PORT}/api/produits`);
        console.log(`  API: http://localhost:${PORT}/api/commandes\n`);
    });
};

startServer();
