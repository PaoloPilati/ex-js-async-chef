// In questo esercizio, utilizzerai async/await per creare la funzione getChefBirthday(id). Questa funzione accetta un id di una ricetta e deve:
// Recuperare la ricetta da https://dummyjson.com/recipes/{id}
// Estrarre la proprietà userId dalla ricetta
// Usare userId per ottenere le informazioni dello chef da https://dummyjson.com/users/{userId}
// Restituire la data di nascita dello chef
// Note del docente
// Scrivi la funzione getChefBirthday(id), che deve:
// Essere asincrona (async).
// Utilizzare await per chiamare le API.
// Restituire una Promise con la data di nascita dello chef.
// Gestire gli errori con try/catch
// Esempio di utilizzo
// getChefBirthday(1)
//   .then(birthday => console.log("Data di nascita dello chef:", birthday))
//   .catch(error => console.error("Errore:", error.message));
// Esempio di output atteso
// Data di nascita dello chef: 1990-06-15
// 🎯 Bonus 1
// Attualmente, se la prima richiesta non trova una ricetta, la seconda richiesta potrebbe comunque essere eseguita causando errori a cascata.

// Modifica getChefBirthday(id) per intercettare eventuali errori prima di fare la seconda richiesta.
// 🎯 Bonus 2
// Utilizza la libreria dayjs per formattare la data di nascita nel formato giorno/mese/anno.
// Esempio di output atteso con formattazione
// Data di nascita dello chef: 15/06/1990

//Funzione helper (converte res.json in oggetto)
async function fetchUrl(url) {
    const response = await fetch(url);
    //  if (!response.ok) {
    //     throw new Error(`HTTP error: ${response.status}`);
    // } https://developer.mozilla.org/en-US/docs/Web/API/Response/ok
    const data = await response.json();
    
    return data;
}

//Funzione che raccoglie i dati della ricetta
async function getChefBirthday(id) {
    let recipe;
    try{
        recipe = await fetchUrl(`https://dummyjson.com/recipes/${id}`);
    }catch(error){
        console.error(error);
         throw new Error(`Unable to get recipe #${id}`);
    }
    if (recipe.message){
        throw new Error(recipe.message)
    }
    let chef;
        try{
            chef = await fetchUrl(`https://dummyjson.com/users/${recipe.userId}`);
        }catch(error){
            console.error(error);
            throw new Error(`Unable to get chef's birthday for chef #${recipe.userId}`);
        }if(chef.message) {
            throw new Error(chef.message)
        }

    const chefBirthday = chef.birthDate;
    return chefBirthday;
}

// getChefBirthday(1)
//     .then((birthday) => {
//         console.log("Chef's birthday:", birthday);
//     })
//     .catch((error) => {
//         console.error("Error:", error.message);
//     });

// IIFE 
(async() => {
    try{
        const birthday = await getChefBirthday(1);
        console.log("Chef's birthday:", birthday)
        console.log('Code executed!')
    }catch(error){
        console.error("Error:", error.message);
    }finally{
        console.log("END!!!")
    }
})();

