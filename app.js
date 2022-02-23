const express = require("express");
const data = require("./data");

const PORT = 4000;

// Importing all the pokemon for our data file
const allPokemon = require("./data");

const app = express();

// -- Define your route listeners here! --
app.use(express.json());


//1. GET /pokemon
app.get("/pokemon", (req, res) => {
    return res.status(200).json(allPokemon);
})

//2. GET /pokemon/:id
app.get("/pokemon/:id", (req, res) => {
    const { id } = req.params;
    const pokemonToGet = allPokemon.find(
        (currentPokemon) => currentPokemon.id === Number(id));
    //console.log(pokemonToGet)
    return res.status(200).json(pokemonToGet)
})

//3. GET /search
app.get("/search", (req, res) => {
    if (Object.keys(req.query)[0] === "name") {
      const foundedPokemon = allPokemon.filter((currentPokemon) => {
        return currentPokemon.name.includes(req.query.name);
      });
      return res.status(200).json(foundedPokemon);
    } else if (Object.keys(req.query)[0] === "types") {
      const foundedPokemon = allPokemon.filter((currentPokemon) => {
        return currentPokemon.types.includes(req.query.types);
      });
  
      return res.status(200).json(foundedPokemon);
    }
  
    return res.status(400).json({ msg: " ERROR " });
  });

//4. POST /pokemon
app.post("/pokemon", (req, res) => {
    const newPokemon = allPokemon.push(req.body)
    return res.status(201).json(newPokemon)
})

//5. PUT /pokemon/:id
app.put("/pokemon/:id", (req, res) => {
    const { id } = req.params;
    const pokemonToPut = allPokemon.find(
        (currentElement) => currentElement.id === Number(id)
    );

    const editPokemon = allPokemon[allPokemon.indexOf(pokemonToPut)] = {
        ...req.body
    }
    //console.log(pokemonToPut)
    return res.status(200).json(editPokemon);
})

//6. DELETE /pokemon/:id
app.delete("/pokemon/:id", (req, res) => {
    const { id } = req.params;
    const pokemonToDelete = allPokemon.find((element) => element.id === Number(id));
    allPokemon.splice(allPokemon.indexOf(pokemonToDelete), 1);
    //console.log(pokemonToDelete)
    return res.status(200).json({pokemonToDelete})
})




app.listen(PORT, () => console.log(`Server up and running at port ${PORT}`));
