const express= require('express')
const router= express.Router()
const utilisateursController= require("../controllers/utilisateursController.js");
const { check,validationResult } = require('express-validator');

const userValidationRules = [
 check('nom').notEmpty().withMessage('Le nom est obligatoire'),
 check('prenom').notEmpty().withMessage('Le prenom est obligatoire'),
 check('mail').isEmail().withMessage('Email invalide'),
 check('tel')
    .notEmpty().withMessage('Le téléphone est obligatoire')
    .isLength({ min: 10, max: 10 }).withMessage('téléphone invalide (10 chiffres)'),
];


/**
 * @swagger
 * /Utilisateurs:
 *   post:
 *     summary: Créer un utilisateur
 *     tags: [Utilisateurs]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nom
 *               - prenom
 *               - tel
 *               - mail
 *             properties:
 *               nom:
 *                 type: string
 *               prenom:
 *                 type: string
 *               tel:
 *                 type: string
 *               mail:
 *                 type: string
 *                 format: email
 *     responses:
 *       201:
 *         description: Utilisateur créé avec succes
 *       500:
 *         description: Erreur coté serveur
 */
router.post('/utilisateurs', userValidationRules ,(req,res,next)=>{
const errors=validationResult(req)

if(!errors.isEmpty()){
    return res.status(400).json({errors: errors.array()});
}
next() //pour passer au controller
}, utilisateursController.creerUtilisateur);

/**
 * @swagger
 * /Utilisateurs/{id}:
 *   put:
 *     summary: Modifier un utilisateur
 *     tags: [Utilisateurs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Utilisateur modifié
 */
router.put('/utilisateurs/:id',utilisateursController.valideUtilisateur ,utilisateursController.majUtilisateur);

/**
 * @swagger
 * /Utilisateurs:
 *   get:
 *     summary: Liste des utilisateurs
 *     tags: [Utilisateurs]
 *     parameters:
 *       - in: query
 *         name: nom
 *         schema:
 *           type: string
 *         description: filtrer par nom
 *       - in: query
 *         name: prenom
 *         schema:
 *           type: string
 *         description: filtrer par prenom
 *       - in: query
 *         name: tel
 *         schema:
 *           type: string
 *         description: filtrer par téléphone
 *       - in: query
 *         name: mail
 *         schema:
 *           type: string
 *         description: filtrer par email
 *     responses:
 *       200:
 *         description: La liste est renvoyee avec succes 
 *       404:
 *         description: Aucun utilisateur trouvé
 *       500:
 *         description: Erreur coté serveur
 */
router.get('/utilisateurs', utilisateursController.afficherUtil);
/**
 * @swagger
 * /Utilisateurs/{id}:
 *   get:
 *     summary: Obtenir un utilisateur par ID
 *     tags: [Utilisateurs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Utilisateur trouvé
 *       404:
 *         description: Utilisateur non trouvé
 */
router.get('/utilisateurs/:id', utilisateursController.afficherUtilID);
/**
 * @swagger
 * /Utilisateurs/{id}:
 *   delete:
 *     summary: Supprimer un utilisateur
 *     tags: [Utilisateurs]
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
router.delete('/utilisateurs/:id', utilisateursController.suppUtilisateur);

module.exports= router;

