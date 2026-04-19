
const express= require('express')
const logementsRoutes= require("./routes/logements")
const utilisateursRoutes= require("./routes/utilisateurs")
const reservationsRoutes= require("./routes/reservations")


const {PrismaClient}= require('@prisma/client')
const prisma= new PrismaClient()

const app=express()
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const options = {
 definition: {
 openapi: '3.0.0',
 info: {
 title: 'API Users Demo',
 version: '1.0.0',
 description: 'API pour une plateforme de location de logements au ski qui permet de consulter,ajouter, modifier et supprimer des logements, ainsi que de gérer les utilisateurs et réservations.' }
 },
 apis: ['./routes/*.js'] 
};
const specs = swaggerJsdoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.use(express.json())

app.use(logementsRoutes)
app.use(utilisateursRoutes)
app.use(reservationsRoutes)

app.use((err,req,res,next) => {
    console.log(err);
    res.status(err.status || 500).json({
        error:err.message || "Internal server error"
    })
})

app.listen(3000, ()=>{
    console.log('serveur lancé sur le port 3000');
});

