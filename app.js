const express = require('express');
const axios = require('axios');
const app = express();
const cors = require('cors');
const PORT = 4000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use(cors())



app.get('/characters', async (req, res) => {
    const url = 'https://rickandmortyapi.com/api/character/';
    
    try {
        const response = await axios.get(url);
        const characters = response.data;
        
        res.json(characters);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los personajes' });
    }
});



app.get('/characters/:name', async (req, res) => {
    const name = req.params.name;
    console.log(`Buscando personaje: ${name}`);
    
    const url = `https://rickandmortyapi.com/api/character/?name=${name}`;
    
    try {
        const response = await axios.get(url);
        const character = response.data.results[0];
        
        if (character) {
            const { name, status, species, gender, origin, image } = character;
            res.json({ name, status, species, gender, origin: origin.name, image });
        } else {
            res.status(404).json({ error: `Personaje no encontrado` });
        }
    } catch (error) {
        console.error(error);
        res.status(404).json({ error: `Personaje no encontrado o error en la búsqueda` });
    }
});


app.listen(PORT,()=>{
    console.log(`Servidor escuchando en puerto http://localhost:${PORT}`)
})