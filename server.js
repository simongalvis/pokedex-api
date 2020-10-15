require('dotenv').config()
const express = require('express');
const morgan = require ('morgan');
const POKEDEX = require('./pokedex.json')
const cors = require('cors');
const helmet = require('helmet');

//console.log(process.env.API_TOKEN)

const app = express();

const morganSetting = process.env.NODE_ENV === 'production' ? 'tiny' : 'common'
app.use(morgan(morganSetting))
app.use(helmet())
app.use(cors())


app.use(validateBearerToken = (req, res, next) =>{


const apiToken = process.env.API_TOKEN;
const authToken = req.get('Authorization');

//console.log('validate bearer token middleware')

if(!authToken || authToken.split(' ')[1] !== apiToken){
    return res.status(401).json({error: 'Unauthorized request'})
}


// move to the next middleware
next()
})



const validTypes = [`Bug`, `Dark`, `Dragon`, `Electric`, `Fairy`, `Fighting`, `Fire`, `Flying`, `Ghost`, `Grass`, `Ground`, `Ice`, `Normal`, `Poison`, `Psychic`, `Rock`, `Steel`, `Water`]
const handleGetTypes = (req, res) =>{
res.json(validTypes)
}

app.get('/types', handleGetTypes)

const handleGetPokemon = (req, res) =>{
    const { name, type }= req.query;
    
    
    let response = POKEDEX['pokemon']
    
    if(name){
       const nameString = name.toLowerCase();
        response = response.filter(pokemon => pokemon['name'].toLowerCase().includes(nameString)) 
    }
    const typeString = type.toLowerCase();
    if(type){
       
        response = response.filter(pokemon => pokemon['type'].includes(type)) 
    }

    res.send(response);
    //res.send(typeof type);
};

app.get('/pokemon', handleGetPokemon)

const PORT = process.env.PORT || 8000;

app.listen(PORT, () =>{
    //console.log(`Listening at http://localhost:${PORT}!`)
})