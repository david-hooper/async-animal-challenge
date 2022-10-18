
let characterNamesArray = [];
let characterArray = [];
const ulElement = document.querySelector('.animals');
let animalTable = document.querySelector("tbody");

//Call the backend server to get the list of animals
fetch('http://localhost:3000/animals')
    .then(response => response.json())  //convert the response to json
    .then(animals => {
        //create a character name for each animal to show on the page
        //and store the animal name in an array
        for (let i = 0; i < animals.length; i++) {
            characterNamesArray.push(animals[i]);
            let liElement = document.createElement("li");
            liElement.textContent = animals[i];
            ulElement.appendChild(liElement);
        }
    }).then(() => {
        //fetch the data for each animal
        for (let i = 0; i < characterNamesArray.length; i++) {
            fetch(`http://localhost:3000/animals/${characterNamesArray[i]}`)
                .then(response => response.json())  //convert the response to json
                .then(animal => {
                    console.log(animal.name);
                    //create a character table row for each animal
                    animalTable.innerHTML+= 
                    `<tr>
                        <td>
                            <div class="character">
                                <div class="character__image">${animal.image}</div>
                                <div class="character__question">${animal.question}</div>
                                <div class="character__response">${animal.response}</div>
                            </div>
                        </td>
                    </tr>`;
                });
        }
    })
    .catch(error => console.log(error));

