// sorting.js

// sorting by head size
export function orderByHead(catsDict) {
    var sortedKeys = Object.keys(catsDict).sort((a, b) => catsDict[b].head_size - catsDict[a].head_size);
    var result = Array.from({ length: Object.keys(catsDict).length }, (_, index) => sortedKeys.indexOf((index + 1).toString()) + 1);
    return result;

}

// sorting by ears length
export function orderByEars(catsDict) {
    var sortedKeys = Object.keys(catsDict).sort((a, b) => catsDict[b].ear_length - catsDict[a].ear_length);
    var result = Array.from({ length: Object.keys(catsDict).length }, (_, index) => sortedKeys.indexOf((index + 1).toString()) + 1);
    return result;

}

// sorting by eyes size
export function orderByEyes(catsDict) {
    var sortedKeys = Object.keys(catsDict).sort((a, b) => catsDict[b].eyes_width - catsDict[a].eyes_width);
    var result = Array.from({ length: Object.keys(catsDict).length }, (_, index) => sortedKeys.indexOf((index + 1).toString()) + 1);
    return result;
}

// sorting by body size
export function orderByBody(catsDict) {
    var sortedKeys = Object.keys(catsDict).sort((a, b) => catsDict[b].body_size - catsDict[a].body_size);
    var result = Array.from({ length: Object.keys(catsDict).length }, (_, index) => sortedKeys.indexOf((index + 1).toString()) + 1);
    return result;
}


export function getMaxValues(data) {
    // Array per i valori massimi e minimi
    var maxValues = [Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY];

    for (const key in data) {
        var item = data[key];

        maxValues[0] = Math.max(maxValues[0], item.ear_length);
        maxValues[1] = Math.max(maxValues[1], item.eyes_width);
        maxValues[2] = Math.max(maxValues[2], item.head_size);
        maxValues[3] = Math.max(maxValues[3], item.body_size);

    }

    return maxValues;
}

export function getMinValues(data) {
    // Array per i valori massimi e minimi
    var minValues = [Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY];

    for (const key in data) {
        var item = data[key];

        minValues[0] = Math.min(minValues[0], item.ear_length);
        minValues[1] = Math.min(minValues[1], item.eyes_width);
        minValues[2] = Math.min(minValues[2], item.head_size);
        minValues[3] = Math.min(minValues[3], item.body_size);
    }

    return minValues;
}




