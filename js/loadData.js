// loadData.js

// read json and return dictionary
export async function readJsonToDictionary(filePath) 
{
    const response = await fetch(filePath); 
    const outerJson = await response.json();

    // Il JSON è già un oggetto, quindi possiamo restituirlo direttamente
    const dictionary = { ...outerJson }; 

    return dictionary;
}



