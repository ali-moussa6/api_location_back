const {PrismaClient}= require('@prisma/client')
const prisma= new PrismaClient()



exports.afficherUtil = async (req, res) => {
  try {
    const { nom, prenom, tel, mail } = req.query;

    const filtre = {};
    if (nom)    filtre.nom    = nom;
    if (prenom) filtre.prenom = prenom;
    if (tel)    filtre.tel    = tel;
    if (mail)   filtre.mail   = mail;

    const utilisateurs = await prisma.utilisateur.findMany({
      where: filtre 
    });

    if (Object.keys(filtre).length > 0 && utilisateurs.length === 0) {
      return res.status(404).json({ error: "Aucun utilisateur trouvé" });
    }

    res.json(utilisateurs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.afficherUtilID= async(req,res)=>{
    
    try{
        const {id}= req.params;
        const  utilisateurs= await prisma.utilisateur.findUnique({
             where: {id: id}
        })
         if(!utilisateurs){
        return res.status(404).json({error: "utilisateurs non trouvé"});
         }
         res.json(utilisateurs)

    }catch(err){
        res.status(500).json({error: err.message});
    }
   
}

exports.valideUtilisateur = (req,res,next) => {

    const {nom,prenom,tel,mail} = req.body
    if(!req.body.nom || typeof req.body.nom !== "string"){
        // return res.status(400).json({error:"type saisi incorrect ou saisi vide"})
        const error = new Error("nom vide ou type != string")
        error.status = 400
        throw error
    }
    if(!req.body.prenom || typeof req.body.prenom !== "string"){
        // return res.status(400).json({error:"type saisi incorrect ou saisi vide"})
        const error = new Error("prenom vide ou type != string")
        error.status = 400
        throw error
    }if(!req.body.tel || typeof req.body.tel !== "string" || req.body.tel.length !== 10){
        // return res.status(400).json({error:"type saisi incorrect ou saisi vide ou saisie trop longue"})
        const error = new Error("tel vide ou type != string ou format tel non valide")
        error.status = 400
        throw error
        
    }
    if(!req.body.mail || typeof req.body.mail !== "string" || !req.body.mail.includes('@')){
        // return res.status(400).json({error:"type saisi incorrect ou saisi vide"})
        const error = new Error("mail vide ou type != string ou format mail non valide")
        error.status = 400
        throw error
    }
    next()

}



exports.creerUtilisateur= async(req,res)=>{

    try{
        const nom= req.body.nom
        const prenom= req.body.prenom
        const tel= req.body.tel
        const mail= req.body.mail

        const newUtilisateur= await prisma.utilisateur.create(
            {data: {nom,prenom,tel,mail}}
        )
        res.status(201).json(newUtilisateur)
    }catch(err){
         res.status(500).json({error: err.message})

    }
};

exports.suppUtilisateur = async(req,res) => {

     try{
        const {id}= req.params
         await prisma.utilisateur.delete({
            where:{id: id}
        })
        res.status(204).send()

    }catch(err){
        res.status(500).json({error: err.message})
    }

};

exports.majUtilisateur = async(req,res) => {
    try{
        const {id}= req.params
        const{nom,prenom,tel,mail}= req.body

        const updateUtilisateur= await prisma.utilisateur.update({
            where: {id: id},
            data: {nom,prenom,tel,mail}
        })
        res.json(updateUtilisateur)
    }
    catch(err){
        res.status(500).json({error:err.message})
    }
}