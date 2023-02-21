// options is used with the fetch of each function

const OPTIONS = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "a9be9ca417msh02ffae03380bb1bp1b69a6jsn0f580a3248bd",
    "X-RapidAPI-Host": "gogoanime2.p.rapidapi.com",
  },
};

// these are  for the search display
const RESULTS_CONTAINER = document.querySelector(".results");

// these are for the details display
const TITLE = document.querySelector(".title");
const IMAGE = document.querySelector(".picture");
const SYNOPSIS = document.querySelector(".sypnosis");

//get out data
async function searchAnime(name) {
  const response = await fetch(
    `https://gogoanime2.p.rapidapi.com/search?keyw=${name}`,
    OPTIONS
  );
  return response.json();
}

// getting and using data
export async function getAnimeName(name) {
  searchAnime(name) // getting data
    .then((info) => console.log(info)) // using data
    .catch((err) => console.error(err));
}

/* 









this seaction is for the anime details page

*/

// returns only the infomation in json format
async function searchAnimeDetails(name) {
  const response = await fetch(
    `https://gogoanime2.p.rapidapi.com/anime-details/${name}`,
    OPTIONS
  );
  return response.json();
}

/* 

searchAnimeDetails('overlord-iv') return example

{
  "animeTitle": "Overlord IV",
  "type": "Summer 2022 Anime",
  "releasedDate": "2022",
  "status": "Completed",
  "genres": [
    "Action",
    "Fantasy",
    "Game",
    "Magic",
    "Supernatural"
  ],
  "otherNames": "オーバーロード IV",
  "synopsis": "Fourth season of Overlord.",
  "animeImg": "https://gogocdn.net/cover/overlord-iv.png",
  "totalEpisodes": "13",
  "episodesList": [
    {
      "episodeId": "overlord-iv-episode-3",
      "episodeNum": "3",
      "episodeUrl": "https://gogoanime.film//overlord-iv-episode-3"
    },
    {
      "episodeId": "overlord-iv-episode-2",
      "episodeNum": "2",
      "episodeUrl": "https://gogoanime.film//overlord-iv-episode-2"
    },
    {
      "episodeId": "overlord-iv-episode-1",
      "episodeNum": "1",
      "episodeUrl": "https://gogoanime.film//overlord-iv-episode-1"
    }
  ]
}

*/

// using data from function here
async function getDetails(name) {
  searchAnimeDetails(name)
    .then((details) => setInfo(details)) // load information on to screen
    .catch((err) => setInfo(err));
}

// takes info in json format and loads it to screen
async function setInfo(info) {
  titleSet(info.animeTitle);
  imageSet(info.animeImg);
  synopsisSet(info.synopsis);
}

/* 
the functions here make up setInfo function

1. titleSet
2. imageSet
3. synopsisSet
*/

async function titleSet(title) {
  TITLE.innerHTML = "";
  const header = document.createElement("h1");
  header.innerHTML = title;
  TITLE.appendChild(header);
}

async function imageSet(src) {
  IMAGE.innerHTML = "";
  const img = document.createElement("img");
  img.src = src;
  img.alt = "anime";
  img.width = 200;
  IMAGE.appendChild(img);
}

async function synopsisSet(text) {
  SYNOPSIS.innerHTML = "";
  const synopsis = document.createElement("p");
  synopsis.innerHTML = text;
  SYNOPSIS.appendChild(synopsis);
}
