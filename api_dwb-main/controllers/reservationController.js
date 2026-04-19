const {PrismaClient}= require('@prisma/client') //c une classe fournie par @prima/client
const prisma= new PrismaClient()


exports.afficherReservation= async (req,res)=>{

   try{

    const { date_debut,date_fin} = req.query
    const filtre = {}

    if (date_debut) filtre.date_debut = date_debut
    if (date_fin) filtre.date_fin = date_fin 

    const reservations= await prisma.reservation.findMany({
        where: filtre,
        include:{
            logement:true,
            client:true
        }
    });

    if (Object.keys(filtre).length > 0 && reservations.length === 0) {
      return res.status(404).json({ error: "Aucune reservation trouvé" });
    }

    res.json(reservations);
   }catch(err){
    res.status(500).json({error: err.message});
   }
}



exports.valideReservation = (req,res,next) => {

    const{ date_debut, date_fin, client, logement} = req.body

    if(!date_debut || !date_fin || !client || !logement){
        const error = new Error("date de debut ou date de fin ou client ou logement NON RENSEIGNER !!!")
        error.status = 400
        throw error
    }

    if(date_debut.length != 10 || date_fin.length != 10){
        // return res.status(400).json({error:"Prix Négatif !!!!"})
        const error = new Error("Format date de debut ou date de fin INCORRECTE !!!")
        error.status = 400
        throw error
    }

    next();
}

exports.reservationParID= async(req,res)=>{
    
    try{

    const {id}= req.params

    const reservations= await prisma.reservation.findUnique({
        where: {id: id},
        include:{
            logement:true,
            client:true
        }
    })
    if(!reservations){
        return res.status(404).json({error: "Reservations non trouvé"})
    }
    res.json(reservations)
    }catch(err){
        res.status(500).json({error: err.message})
    }
    
}



exports.creerReservation= async(req,res)=>{
        
const { date_debut, date_fin, client, logement } = req.body

const newReservation = await prisma.reservation.create({
    data: {
        date_debut,
        date_fin,
        client: {
        connect: { id: client }
        },
        logement: {
        connect: { id: logement }
        }
    }
    })
    res.status(201).json(newReservation)
}


exports.supprimerReservation= async(req,res)=>{

    try{
        const {id}= req.params
         await prisma.reservation.delete({
            where:{id: id}
        })
        res.status(204).send()

    }catch(err){
        res.status(500).json({error: err.message})
    }
}

exports.majReservation= async(req,res)=>{

    const {id}= req.params
    const{date_debut, date_fin, client, logement}= req.body
    const updateReservation= await prisma.reservation.update({
        where: {id: id},
        data: {
            date_debut,
            date_fin,
            client: {
            connect: { id: client }
            },
            logement: {
            connect: { id: logement }
            }
        }    
    })
    res.json(updateReservation)
}