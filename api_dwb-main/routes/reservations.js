const express= require('express')
const router= express.Router() //va servir a organiser des routes par ressources

const reservationsController= require("../controllers/reservationController.js")


/**
 * @swagger
 * /Reservations:
 *   post:
 *     summary: Créer une reservation
 *     tags: [Reservations]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - date_debut
 *               - date_fin
 *               - client
 *               - logement
 *             properties:
 *               date_debut:
 *                 type: string
 *               date_fin:
 *                 type: string
 *               client:
 *                 type: string 
 *               logement:
 *                  type: string
 *     responses:
 *       201:
 *         description: Reservation créé
 */
router.post('/Reservations',reservationsController.valideReservation,reservationsController.creerReservation)
/**
 * @swagger
 * /Reservations/{id}:
 *   put:
 *     summary: Modifier une reservation
 *     tags: [Reservations]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Reservation modifié
 */
router.put('/Reservations/:id',reservationsController.valideReservation,reservationsController.majReservation)

/**
 * @swagger
 * /Reservations:
 *   get:
 *     summary: Liste de toutes les réservations
 *     tags: [Reservations]
 *     parameters:
 *       - in: query
 *         name: date_debut
 *         schema:
 *           type: string
 *           format: date
 *         description: Filtrer par date de début
 *       - in: query
 *         name: date_fin
 *         schema:
 *           type: string
 *           format: date
 *         description: Filtrer par date de fin
 *     responses:
 *       200:
 *         description: Liste renvoyée avec succès
 *       404:
 *         description: Aucune réservation trouvée
 *       500:
 *         description: Erreur serveur
 */
router.get('/Reservations' ,reservationsController.afficherReservation)
/**
 * @swagger
 * /Reservations/{id}:
 *   get:
 *     summary: Obtenir une réservation par ID
 *     tags: [Reservations]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Réservation trouvée
 *       404:
 *         description: Réservation non trouvée
 */
router.get('/Reservations/:id' ,reservationsController.reservationParID)
/**
 * @swagger
 * /Reservations/{id}:
 *   delete:
 *     summary: Supprimer une réservation
 *     tags: [Reservations]
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
router.delete('/Reservations/:id', reservationsController.supprimerReservation)
module.exports= router;
