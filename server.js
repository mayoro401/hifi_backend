require('dotenv').config();

//creation du serveur express
const express = require('express');
const cookieSession = require('cookie-session');

//instance pou définir les routes et les middleware.
const app  = express();



//*********************************************  Logger  ********************************************** */

// Utilisation de Morgan pour le journal des requêtes(details des requetes dans le console)
const morgan = require('morgan');
app.use(morgan('dev'));


//******************************************  Coockie Session  **************************************** */
//cookie-session aide à stocker les données de session sur le client dans un cookie sans nécessiter
// de base de données/ressources côté serveur

app.use(
    cookieSession({
      name: "mayoro-session",
      keys: ["COOKIE_SECRET"],      // should use as secret environment variable
      httpOnly: true,
    })
  );




//********************************************* Securite   ********************************************** */

//importation du module cors qui empêche les requêtes faites 
//depuis un domaine différent du domaine du serveur.
const cors = require('cors');
//seules les requêtes provenant de 'https://localhost:4200' 
//sont autorisées à accéder à l'API.
var corsOption ={
    credentials: true,
    origin: 'https://localhost:4200'
};
//verification de la source des requetes
app.use(cors(corsOption));




//**********************************************  Analyseur  ********************************************* */

//const bodyParser   = require('body-parser'); Analyseur de corps 
//middleware pour permettre à notre serveur de comprendre 
//les requêtes contenant des données au format JSON.
app.use(express.json());
//les requêtes contenant des données au format URL encodé
app.use(express.urlencoded({extended: true}));


// app.use((req, res, next) => {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
//     next();
//  })

//**********************************************  Base de Donnee  ********************************************* */

//
var db = require('./models');

//connexion a la base de donnee 
db.sequelize.sync({ force: true })
    .then(() => {
        console.log("Base de données bien synchronisée.");
        // initial();
    })
    .catch((err) => {
        console.log("Echec lors de la synchronisation: " + err.message);
    });

//initialiser des donnees sur une table 

    // const dbr = require("./models");
    // const Role = dbr.role;
  
    // function initial() {
    //   Role.create({ id: 1,  nom_role: "client" });
    //   Role.create({ id: 2, nom_role: "vendeur" });
    //   Role.create({ id: 3, nom_role: "admin" });
    // }

//fin d'initialisatioon

/**********************************************  Routes  ********************************************* */

// require('./routes/auth.route')(app);
// require('./routes/personne.route')(app);


const ProduitController = require('./routes/produit.route');
app.use('/produit',ProduitController);

const PersonneController = require('./routes/personne.route');
app.use('/personne',PersonneController);

 const CategorieController = require('./routes/categorie.route');
 app.use('/categorie',CategorieController);




// simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to mayoro application." });
  });





//********************************************** lancement serveur  ********************************************* */

app.listen(process.env.port || 3000, () => {
    console.log(`Server is running on port ${process.env.port || 3000}.`);
  });
