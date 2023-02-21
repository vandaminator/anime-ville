// code for searching

//get out data
async function searchAnime(name) {
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "a9be9ca417msh02ffae03380bb1bp1b69a6jsn0f580a3248bd",
      "X-RapidAPI-Host": "gogoanime2.p.rapidapi.com",
    },
  };
  const response = await fetch(
    `https://gogoanime2.p.rapidapi.com/search?keyw=${name}`,
    options
  );
  return response.json();
}

// getting and using data
async function getAnimeName(name) {
  searchAnime(name) // getting data
    .then((info) => console.log(info.length)) // using data
    .catch((err) => console.error(err));
}

async function searchAnimeDetails(name) {
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "a9be9ca417msh02ffae03380bb1bp1b69a6jsn0f580a3248bd",
      "X-RapidAPI-Host": "gogoanime2.p.rapidapi.com",
    },
  };

  const response = await fetch(
    `https://gogoanime2.p.rapidapi.com/anime-details/${name}`,
    options
  );
  return response.json();
}

async function getDetails(name, info) {
  searchAnimeDetails(name)
    .then((details) => console.log(details[info]))
    .catch((err) => console.error(err));
}

getDetails("blue-lock", `synopsis`);
