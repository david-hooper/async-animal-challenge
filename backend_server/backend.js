const express = require('express');
const cors = require('cors');


const app = express();
const port = 3000;
app.use(cors());

function character(animal_name, emogi, next) {
    this.name = animal_name;
    this.next = next;
    this.image = emogi;
    this.question = `${animal_name}, ${animal_name}, what do you see?`;
    this.response = `I see a ${next} looking at me.`;
}
characterArray = [];
characterArray.push(new character("Bear", "🐻", "Panda"));
characterArray.push(new character("Panda", "🐼", "Frog"));
characterArray.push(new character("Frog", "🐸", "Dog"));
characterArray.push(new character("Dog", "🐶", "Cat"));
characterArray.push(new character("Cat", "🐱", "Mouse"));
characterArray.push(new character("Mouse", "🐭", "Horse"));
characterArray.push(new character("Horse", "🐴", "Cow"));
characterArray.push(new character("Cow", "🐮", "Pig"));
characterArray.push(new character("Pig", "🐷", "Sheep"));
characterArray.push(new character("Sheep", "🐑", "Chicken"));
characterArray.push(new character("Chicken", "🐔", "Duck"));
characterArray.push(new character("Duck", "🦆", null));

app.get('/' , (req, res) => {
    res.send('✅ Async Animal Server is up and running');
});

app.get('/api/animals', (req, res) => {
    let animals = [];
    for (let i = 0; i < characterArray.length; i++) {
        animals.push(characterArray[i].name);
    }
    res.send(animals);
});

app.get('/api/animals/:name', (req, res) => {
    let name = req.params.name;
    let animal = characterArray.find((animal) => {
        return animal.name.toLowerCase() === name.toLowerCase();
    })
    //delay resoponse by random amount between .5 and 1 second.
    setTimeout(() => {
        res.send(animal);
    }, Math.random() * 500 + 500);
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});
