// gatto.js

import { writeConsole } from './debug.js';
import * as CONSTANTS from './constants.js';

export var cats = Array(10).fill(null);


class Cat {

    // constructor
    constructor(id, ears, eyes, head, body, color, maxValues, minValues) 
    {
        this.id = id;
        this.color = color;
        this.currentPos = id;
        this.maxValues = maxValues;
        this.minValues = minValues;
        this.ears = this.scale(ears, 0);
        this.eyes = this.scale(eyes, 1);
        this.head = this.scale(head, 2);
        this.body = this.scale(body, 3);
    }

    moveTo(newPos)
    {
        writeConsole(`Gatto ${this.id} si sta muovendo da ${this.currentPos} verso ${newPos}!`);
        var offsetPos = this.currentPos - newPos;
        d3.selectAll(`.cat-${this.id}`)
            .transition()
            .duration(500)
            .attr("cx", function() {
                // Gestione per i cerchi
                if (this.tagName === "circle") {
                    const currentCx = +d3.select(this).attr("cx");
                    return currentCx - offsetPos * CONSTANTS.OFFSET;
                }
                return null;
            })
            .attr("x", function() {
                // Gestione per i rettangoli
                if (this.tagName === "rect") {
                    const currentX = +d3.select(this).attr("x");
                    return currentX - offsetPos * CONSTANTS.OFFSET;
                }
                return null; 
            })
            .attr("points", function() {
                // Gestione per i poligoni
                if (this.tagName === "polygon") {
                    const currentPoints = d3.select(this).attr("points")
                        .split(" ")
                        .map(point => {
                            const [x, y] = point.split(",").map(Number);
                            return `${x - offsetPos * CONSTANTS.OFFSET},${y}`; 
                        })
                        .join(" ");
                    return currentPoints;
                }
                return null; 
            });

        this.currentPos = newPos;
}

    // move cat at the starting position
    moveToStarting()
    {
        this.moveTo(this.id);
    }

    // draw cat on the current position
    drawCat(svg)
    {
        writeConsole(`Gatto ${this.id} disegnato!`);
        this.drawBody(svg);
        this.drawFace(svg);
    }
    
    drawFace(svg)
    {
        var posX = CONSTANTS.SVG_PADDING + (this.currentPos-1) * CONSTANTS.OFFSET;
        var posY = CONSTANTS.LINE_Y - this.body - this.head;
        var R = this.head;
        const angle = Math.PI / 4;
        const angleC = (Math.PI/2) - angle;

        // primo punto di contatto tra orecchio e testa
        const T = { x: posX + R * Math.cos(angle), y: posY - R * Math.sin(angle) };
        // secondo punto di contatto tra orecchio e testa
        const T2 = { x: posX - R * Math.cos(angle), y: posY - R * Math.sin(angle) };

        // triangle 1
        const trianglePoints1 = [
        { x: T.x - (this.ears/4) * Math.cos(angleC), y: T.y - (this.ears/4) * Math.sin(angleC)},
        { x: T.x + (this.ears/4) * Math.sin(angleC), y: T.y + (this.ears/4) * Math.cos(angleC)},
        { x: T.x + this.ears * Math.cos(angle), y: T.y - this.ears * Math.sin(angle)}
        ];

        // triangle 2
        const trianglePoints2 = [
        { x: T2.x + (this.ears/4) * Math.cos(angleC), y: T2.y - (this.ears/4) * Math.sin(angleC)},
        { x: T2.x - (this.ears/4) * Math.cos(angleC), y: T2.y + (this.ears/4) * Math.sin(angleC)},
        { x: T2.x - this.ears * Math.cos(angle), y: T2.y - this.ears * Math.sin(angle)}
        ];

        // Disegnamo la faccia
        svg.append('circle')
            .attr('cx', posX)
            .attr('cy', CONSTANTS.LINE_Y - this.body - this.head)
            .attr('r', this.head)
            .attr('fill', 'gray')
            .attr('stroke', 'none')
            .attr('class', `cat-${this.id}`)
            .on('click', () => {
                CONSTANTS.btnHead.click();
            });

        // Orecchio sx
        svg.append("polygon")
            .attr("points", trianglePoints1.map(d => `${d.x},${d.y}`).join(" "))
            .attr("fill", "gray")
            .attr('stroke', 'none')
            .attr('class', `cat-${this.id}`)
            .on('click', () => {
                CONSTANTS.btnEars.click();
            });

        // Orecchio dx
        svg.append("polygon")
            .attr("points", trianglePoints2.map(d => `${d.x},${d.y}`).join(" "))
            .attr("fill", "gray")
            .attr('stroke', 'none')
            .attr('class', `cat-${this.id}`)
            .on('click', () => {
                CONSTANTS.btnEars.click();
            });

        // Disegnamo gli occhi
        svg.append('circle') // Occhio sinistro
            .attr('cx', posX - this.head/2)
            .attr('cy', posY - this.head/3)
            .attr('r', this.eyes)
            .attr('fill', 'white')
            .attr('stroke', 'none')
            .attr('class', `cat-${this.id}`)
            .on('click', () => {
                CONSTANTS.btnEyes.click();
            });
        ;

        svg.append('circle') // Occhio destro
            .attr('cx', posX + this.head/2)
            .attr('cy', posY - this.head/3)
            .attr('r', this.eyes)
            .attr('fill', 'white')
            .attr('stroke', 'none')
            .attr('class', `cat-${this.id}`)
            .on('click', () => {
                CONSTANTS.btnEyes.click();
            });

        // Pupille
        svg.append('circle') // Pupilla sinistra
            .attr('cx', posX - this.head/2)
            .attr('cy', posY - this.head/3)
            .attr('r', 2)
            .attr('fill', 'black')
            .attr('stroke', 'none')
            .attr('class', `cat-${this.id}`)
            .on('click', () => {
                CONSTANTS.btnEyes.click();
            });

        svg.append('circle') // Pupilla destra
            .attr('cx', posX + this.head/2)
            .attr('cy', posY - this.head/3)
            .attr('r', 2)
            .attr('fill', 'black')
            .attr('stroke', 'none')
            .attr('class', `cat-${this.id}`)
            .on('click', () => {
                CONSTANTS.btnEyes.click();
            });

        // Disegnamo il naso
        svg.append('circle')
            .attr('cx', posX)
            .attr('cy', posY + this.head/6)
            .attr('r', this.head/6)
            .attr('fill', 'pink')
            .attr('stroke', 'none')
            .attr('class', `cat-${this.id}`);

        // Disegnamo la bocca
        svg.append('path')
            .attr('d', `M${posX - this.head/3},${posY + (this.head/3)} 
                        C${posX - this.head/6},${posY + (this.head*2/3)} 
                        ${posX + this.head/6},${posY + (this.head*2/3)} 
                        ${posX + this.head/3},${posY + (this.head/3)}`)
            .attr('stroke', 'black')
            .attr('fill', 'transparent')
            .attr('stroke', 'none')
            .attr('class', `cat-${this.id}`);

    }

    drawBody(svg)
    {
        // Posizione verticale iniziale, costante
        const bodyY = CONSTANTS.LINE_Y;
        var bodyMappedValue = this.body;
        let bodyWidth = (bodyMappedValue * 3) / 4;
        let legHeight = bodyMappedValue / 2;

        var posX = CONSTANTS.SVG_PADDING + (this.currentPos-1) * CONSTANTS.OFFSET;

        // Disegno del corpo    
        svg.append('rect')
            .attr('x', posX - bodyWidth / 2)       
            .attr('y', CONSTANTS.LINE_Y - bodyMappedValue)           
            .attr('width', bodyWidth)                       
            .attr('height', bodyMappedValue)                   
            .attr('fill', 'gray')                  
            .attr('rx', 5)              
            .attr('ry', 5)
            .attr('stroke', 'none')
            .attr('class', `cat-${this.id}`)
            .on('click', () => {
                CONSTANTS.btnBody.click();
            });

          // Disegno delle gambe con angoli leggermente arrotondati
        svg.append('rect')
            .attr('x', posX - bodyMappedValue / 2)            
            .attr('y', CONSTANTS.LINE_Y - legHeight)          
            .attr('width', bodyMappedValue)                
            .attr('height', legHeight)                
            .attr('fill', 'gray')                  
            .attr('rx', 5)                   
            .attr('ry', 5)
            .attr('stroke', 'none') 
            .attr('class', `cat-${this.id}`)
            .on('click', () => {
                CONSTANTS.btnBody.click();
            });

    }

    scale(value, idFeature) {

        // Recupera i valori minimi e massimi dall'oggetto di configurazione
        const minInput = this.minValues[idFeature];
        const maxInput = this.maxValues[idFeature];
        const minOutput = CONSTANTS.MAPPED_VALUE_MIN[idFeature];
        const maxOutput = CONSTANTS.MAPPED_VALUE_MAX[idFeature];

        // Assicurati che i valori siano validi
        if (minInput === undefined || maxInput === undefined || minOutput === undefined || maxOutput === undefined) {
            throw new Error(`I valori per idFeature "${idFeature}" non sono validi.`);
        }

        // Definisci la scala lineare
        const scale = d3.scaleLinear()
            .domain([minInput, maxInput]) // Intervallo di input
            .range([minOutput, maxOutput]); // Intervallo di output

        // Applica la scala al valore
        return scale(value);
    }


    // Metodo per stampare le proprietà dell'oggetto
    print()
    {
        console.log(`Cat ID: ${this.id},
             Ears: ${this.ears},
              Head: ${this.head},
               Eyes: ${this.eyes},
                Body: ${this.body},
                 Color: ${this.color},
                  Current Position: ${this.currentPos}`);
    }

}

export default Cat;