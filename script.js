
// code for searching

/* 
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'a9be9ca417msh02ffae03380bb1bp1b69a6jsn0f580a3248bd',
		'X-RapidAPI-Host': 'gogoanime2.p.rapidapi.com'
	}
};

fetch('https://gogoanime2.p.rapidapi.com/search?keyw=naruto&page=1', options)
	.then(response => response.json())
	.then(response => console.log(response))
	.catch(err => console.error(err));
*/


//get out data
async function searchAnime(name) {
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'a9be9ca417msh02ffae03380bb1bp1b69a6jsn0f580a3248bd',
            'X-RapidAPI-Host': 'gogoanime2.p.rapidapi.com'
        }
    };
    const response  = await fetch(`https://gogoanime2.p.rapidapi.com/search?keyw=${name}`, options)
    return response.json()
}


// getting and using data
async function getAnimeName (name) {
    searchAnime(name) // getting data
    .then((info) => console.log(info.length)) // using data
    .catch(err =>  console.error(err))
}

getAnimeName('blue lock')