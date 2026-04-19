const express= require('express')
const router= express.Router() //va servir a organiser des routes par ressources

const logementsController= require("../controllers/logementsController")

/**
 * @swagger
 * /Logements/{id}:
 *   put:
 *     summary: Modifier un logement
 *     tags: [Logements]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Logement modifié
 */
router.put('/Logements/:id', logementsController.valideLogement,logementsController.majLogement)

/**
 * @swagger
 * /Logements:
 *   post:
 *     summary: Créer un logement
 *     tags: [Logements]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - titre
 *               - ville
 *               - prix
 *             properties:
 *               titre:
 *                 type: string
 *               ville:
 *                 type: string
 *               prix:
 *                 type: number
 *     responses:
 *       201:
 *         description: Logement créé
 */
router.post('/Logements',logementsController.valideLogement ,logementsController.creerLogement)

/**
 * @swagger
 * /Logements:
 *   get:
 *     summary: Liste de tous les logements
 *     tags: [Logements]
 *     parameters:
 *       - in: query
 *         name: ville
 *         schema:
 *           type: string
 *         description: Filtrer par ville
 *       - in: query
 *         name: prix
 *         schema:
 *           type: number
 *         description: Filtrer par prix
 *       - in: query
 *         name: titre
 *         schema:
 *           type: string
 *         description: Filtrer par titre
 *     responses:
 *       200:
 *         description: Liste renvoyée avec succès
 *       404:
 *         description: Aucun logement trouvé
 *       500:
 *         description: Erreur serveur
 */
router.get('/Logements' ,logementsController.afficherLogements)
/**
 * @swagger
 * /Logements/{id}:
 *   get:
 *     summary: Obtenir un logement par ID
 *     tags: [Logements]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Logement trouvé
 *       404:
 *         description: Logement non trouvé
 */
router.get('/Logements/:id', logementsController.logementsParID)
/**
 * @swagger
 * /Logements/{id}:
 *   delete:
 *     summary: Supprimer un logement
 *     tags: [Logements]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Supprimé avec succes
 */
router.delete('/Logements/:id', logementsController.supprimerlogement)
module.exports= router;
