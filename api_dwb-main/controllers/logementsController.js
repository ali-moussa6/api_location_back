const {PrismaClient}= require('@prisma/client') //c une classe fournie par @prima/client
const prisma= new PrismaClient()


exports.afficherLogements= async (req,res)=>{

   try{

    const { ville, prix, titre  } = req.query
    const filtre = {}

    if (ville) filtre.ville = ville
    if (prix) filtre.prix = Number(prix)
    if (titre) filtre.titre = titre 

    const logements= await prisma.logement.findMany({
        where: filtre
    });

    if (Object.keys(filtre).length > 0 && logements.length === 0) {
      return res.status(404).json({ error: "Aucun logement trouvé" });
    }

    res.json(logements);
   }catch(err){
    res.status(500).json({error: err.message});
   }
}

exports.valideLogement = (req,res,next) => {

    const{ville,prix,titre} = req.body

    if(!ville|!prix||!titre){
        // return res.status(400).json({error:"ville , prix ou titre vide"})
        const error = new Error("ville ou prix ou titre vide !!")
        error.status = 400
        throw error
    }

    if(prix < 0){
        // return res.status(400).json({error:"Prix Négatif !!!!"})
        const error = new Error("Prix Négatif !!")
        error.status = 400
        throw error
    }


    next();
}

exports.logementsParID= async(req,res)=>{
    
    try{

    const {id}= req.params

    const logements= await prisma.logement.findUnique({
        where: {id: id}
    })
    if(!logements){
        return res.status(404).json({error: "Logement non trouvé"})
    }
    res.json(logements)
    }catch(err){
        res.status(500).json({error: err.message})
    }
    
}



exports.creerLogement= async(req,res)=>{
    try{
        const titre= req.body.titre
        const ville= req.body.ville
        const prise= req.body.prise
        const prix= req.body.prix

        const newlogement= await prisma.logement.create({
            data: {titre,ville,prise,prix}
        })
        res.status(201).json(newlogement)
    }catch(err){
        res.status(500).json({error: err.message})
    }
}


exports.supprimerlogement= async(req,res)=>{

    try{
        const {id}= req.params
         await prisma.logement.delete({
            where:{id: id}
        })
        res.status(204).send()

    }catch(err){
        res.status(500).json({error: err.message})
    }
}

exports.majLogement= async(req,res)=>{

    try{
        const {id}= req.params
        const{titre,ville,prise,prix}= req.body

        const updateLogements= await prisma.logement.update({
            where: {id: id},
            data: {titre,ville,prise,prix}
        })
        res.json(updateLogements)
    }
    catch(err){
        res.status(500).json({error:err.message})
    }
}