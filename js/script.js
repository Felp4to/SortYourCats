// script.js

import { readJsonToDictionary } from './loadData.js';
import { orderByHead, orderByEars, orderByEyes, orderByBody, getMinValues, getMaxValues } from './sorting.js';
import * as CONSTANTS from './constants.js';
import { cats } from './cat.js'; 
import Cat from './cat.js';

// Un esempio di codice JavaScript
document.addEventListener("DOMContentLoaded", async () => {

    // read data
    var data = await readJsonToDictionary('./json/data.json');

    // sorting
    var orderHead = orderByHead(data);
    var orderEars = orderByEars(data);
    var orderEyes = orderByEyes(data);
    var orderBody = orderByBody(data);

    // create cats
    for (let key in data)
    {

        let ear_length = parseInt(data[key].ear_length, 10);
        let eyes_width = parseInt(data[key].eyes_width, 10);
        let head_size = parseInt(data[key].head_size, 10);
        let body_size = parseInt(data[key].body_size, 10);
        
        cats[key-1] = new Cat(key, ear_length, 
                                    eyes_width, 
                                    head_size, 
                                    body_size, 
                                   'red', 
                                    getMaxValues(data),
                                    getMinValues(data));
    }
    
    // define svg
    const svg = d3.select("#mySVG")
        .attr("width", CONSTANTS.SVG_WIDTH)                 // Imposta la larghezza
        .attr("height", CONSTANTS.SVG_HEIGHT)               // Imposta l'altezza
        //.style("border", "1px solid black")                 // Contorno nero
        //.attr("stroke", "black")                            // Colore del contorno (se applicabile)
        //.attr("stroke-width", 2);                           // Spessore del contorno

    // draw cats
    cats.forEach( element => element.drawCat(svg));

    // handle button click
    document.getElementById("btnHead").addEventListener("click", function() {
        cats.forEach( (element, index) => element.moveTo(orderHead[index]));
    });
    document.getElementById("btnEyes").addEventListener("click", function() {
        cats.forEach( (element, index) => element.moveTo(orderEyes[index]));
    });
    document.getElementById("btnEars").addEventListener("click", function() {
        cats.forEach( (element, index) => element.moveTo(orderEars[index]));
    });
    document.getElementById("btnBody").addEventListener("click", function() {
        cats.forEach( (element, index) => element.moveTo(orderBody[index]));
    });
    document.getElementById("btnShuffle").addEventListener("click", function() {
        cats.forEach( element => element.moveToStarting());
    });


}); 







