// options is used with the fetch of each function

const OPTIONS = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "a9be9ca417msh02ffae03380bb1bp1b69a6jsn0f580a3248bd",
    "X-RapidAPI-Host": "gogoanime2.p.rapidapi.com",
  },
};

const MAIN_CONTAINER = document.querySelector("main");
const DISPLAY_ELEMENTS = document.querySelectorAll(".display");

/*

    THE CONSTANTS HERE ARE FOR NEW ANIME DISPLAY

*/

const RELEASE_DISPLAY = document.querySelector(".releases");
const NEW_EPISODES_DISPLAY = document.querySelector(".new");

/*

    THE CONSTANTS HERE ARE FOR SEARCHING ANIME DISPLAY

*/

// to get the input in the search box
const SEARCH_BAR = document.getElementById("search_bar");

// used to display results
const RESULTS_DISPLAY = document.querySelector(".results");

/*

       THE CONSTANTS HERE ARE FOR THE ANIME DETAILS

*/
// used to display the details of an anime
const DETAILS_DISPLAY = document.querySelector(".details");

// these are for the details display
const TITLE = document.querySelector(".title");
const IMAGE = document.querySelector(".picture");
const SYNOPSIS = document.querySelector(".sypnosis");

/*











    THE FUNCTIONS HERE ARE FOR SHOWING NEW RELEASES OF ANIME

*/

async function searchNewReleases() {
  const response = await fetch(
    "https://gogoanime2.p.rapidapi.com/recent-release?type=1&page=1",
    OPTIONS
  );
  return response.json();
}

/*
[
  {
    "episodeId": "deep-insanity-the-lost-child-episode-9",
    "animeTitle": "Deep Insanity: The Lost Child",
    "episodeNum": "9",
    "subOrDub": "SUB",
    "animeImg": "https://cdnimg.xyz/cover/deep-insanity-the-lost-child.png",
    "episodeUrl": "https://www1.gogoanime.cm//deep-insanity-the-lost-child-episode-9"
  }
]
*/

async function getNewReleases() {
  NEW_EPISODES_DISPLAY.innerHTML = "";
  showScreen("releases");
  searchNewReleases()
    .then((info) => setRelease(info))
    .catch((err) => console.error(err));
}

// to show content
getNewReleases();

/*









    THESE FUNCTIONS ARE FOR SEARCHING ANIME

*/

//get out data
async function searchAnime(name) {
  const response = await fetch(
    `https://gogoanime2.p.rapidapi.com/search?keyw=${name}`,
    OPTIONS
  );
  return response.json();
}

/*

searchAnime('naruto') exapmle

[
  {
    "animeId": "naruto",
    "animeTitle": "Naruto",
    "animeUrl": "https://www1.gogoanime.cm//category/naruto",
    "animeImg": "https://gogocdn.net/images/anime/N/naruto.jpg",
    "status": "Released: 2002"
  }
]
*/

// getting and using data
async function getAnime() {
  RESULTS_DISPLAY.innerHTML = "";
  showScreen("results");
  const input = SEARCH_BAR.value;
  searchAnime(input) // getting data
    .then((info) => setResults(info)) // using data
    .catch((err) => console.error(err));
}
/*




    THE FUNCTIONS HERE ARE FOR RESULTS DISPLAY

*/
async function setResults(data) {
  const numData = data.length;
  let item = 0;
  for (item; item < numData; item++) {
    const anime = data[item];
    const animeTitle = anime.animeTitle;
    const animeImage = anime.animeImg;
    const animeId = anime.animeId;
    addResult(animeTitle, animeImage, animeId);
  }
}

async function addResult(title, img_src, id) {
  const resultItem = document.createElement("div");
  resultItem.setAttribute("onclick", `showDetails('${id}')`);
  const htmlText = `
  <h4>${title}</h4>
  <img src="${img_src}" alt='image' width="150">
  `;
  resultItem.innerHTML = htmlText;
  RESULTS_DISPLAY.appendChild(resultItem);
}

/*




    THE FUNCTIONS HERE ARE FOR RELEASE DISPLAY

*/

async function setRelease(data) {
  const numData = data.length;
  let item = 0;
  for (item; item < numData; item++) {
    const episode = data[item];
    const animeTitle = episode.animeTitle;
    const animeImage = episode.animeImg;
    const episodeNum = episode.episodeNum;
    const episodeUrl = episode.episodeUrl;
    addRelease(animeTitle, animeImage, episodeNum, episodeUrl);
  }
}

async function addRelease(title, img_src, number, url) {
  const releaseItem = document.createElement("a");
  releaseItem.setAttribute("href", `${url}`);
  const htmlText = `
  <img src="${img_src}" alt='image' width="150">
  <h4>${title}</h4>
  <p>${number}</p>
  `;
  releaseItem.innerHTML = htmlText;
  RELEASE_DISPLAY.appendChild(releaseItem);
}

/* 









THESE FUNCTIONS ARE FOR GETTING INFORMATION ABOUT AN ANIME

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

/* 










    FUNCTIONS HERE ARE FOR MOVING BETWEEN DISPLAYS

*/

function clearDetails() {
  TITLE.innerHTML = "";
  IMAGE.innerHTML = "";
  SYNOPSIS.innerHTML = "";
}

function switchDisplays() {
  RESULTS_DISPLAY.classList.toggle("hide");
  DETAILS_DISPLAY.classList.toggle("hide");
}

async function showDetails(name) {
  clearDetails();
  switchDisplays();
  getDetails(name);
}

console.log(DISPLAY_ELEMENTS);

async function showScreen(display) {
  const numDisplays = DISPLAY_ELEMENTS.length;
  let element = 0;
  for (element; element < numDisplays; element++) {
    let child = DISPLAY_ELEMENTS[element];
    let childClasses = child.classList;
    let notResultsElement = !childClasses.contains(display);
    if (notResultsElement) {
      child.classList.add("hide");
    } else {
      child.classList.remove("hide");
    }
  }
}
