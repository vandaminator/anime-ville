// options is used with the fetch of each function

const OPTIONS = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "a9be9ca417msh02ffae03380bb1bp1b69a6jsn0f580a3248bd",
    "X-RapidAPI-Host": "gogoanime2.p.rapidapi.com",
  },
};

/*

    THE CONSTANTS HERE ARE FOR SEARCHING ANIME DISPLAY

*/
const DISPLAY_ELEMENTS = document.querySelectorAll(".display");

// to get the input in the search box
const SEARCH_BAR = document.querySelector("#searchbar");
const SEARCH_BTN = document.querySelector("#search-btn");

// used to display results
const RESULTS_CONTAINER = document.querySelector(".show-results");
const RESULTS_DISPLAY = document.querySelector(".results");

/*

       THE CONSTANTS HERE ARE FOR THE ANIME DETAILS

*/

const DETAILS_DISPLAY = document.querySelector(".details");

// these are for the details display
const INFORMATION = document.querySelector(".information");
const SYNOPSIS = document.querySelector(".synopsis");
const GENRES = document.querySelector(".genres");
const EPISODES = document.querySelector(".episodes");

/*









    THESE FUNCTIONS ARE FOR SEARCHING ANIME

*/

//get out data
async function searchAnime(name, page) {
  const response = await fetch(
    `https://api.consumet.org/anime/gogoanime/${name}?page=${page}
    `,
    OPTIONS
  );
  return response.json();
}

/*

searchAnime('naruto', 1) exapmle

see examples_output.json

searchAnime('naruto', 2) exapmle

see examples_output2.json

*/

// getting and using data
async function getAnime() {
  RESULTS_CONTAINER.innerHTML = "";
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
  const results = data.results;
  const numData = results.length;
  let item = 0;
  for (item; item < numData; item++) {
    const anime = data.results[item];
    const animeTitle = anime.title;
    const animeImage = anime.image;
    const animeId = anime.id;
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
  RESULTS_CONTAINER.appendChild(resultItem);
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

/* 
KEYS ARE: 

animeTitle
type
releasedDate
status
genre : List[Strings]
otherNames
synopsis
animeImg
totalEpisodes
episodesList : [
  episodeId
  episodeNum
  episodeUrl
]


*/

// takes info in json format and loads it to screen
async function setInfo(info) {
  const {
    animeTitle,
    type,
    releasedDate,
    status,
    genres,
    otherNames,
    synopsis,
    animeImg,
    totalEpisodes,
    episodesList,
  } = info;

  const infoArray = [
    animeTitle,
    type,
    releasedDate,
    status,
    otherNames,
    animeImg,
    totalEpisodes,
  ];
  informationSet(infoArray);
  genreSet(genres);
  synopsisSet(synopsis);
  episodeSet(episodesList);
}

/* 
the functions here make up setInfo function

1. titleSet
2. synopsisSet
*/

async function informationSet(infoArray) {
  INFORMATION.innerHTML = "";

  const [
    animeTitle,
    animetype,
    releaseDate,
    status,
    otherNames,
    animeImg,
    totalEpisodes,
  ] = infoArray;

  INFORMATION.innerHTML = `
  
  <h1> ${animeTitle} </h1>
  <p> Othernames: ${otherNames} </p>
  <p> AnimeType: ${animetype} </p>
  <p> Release date: ${releaseDate} </p>
  <p> Status: ${status} </p>
  <img src='${animeImg}' alt='image' />
  <p> Total episodes: ${totalEpisodes} </p>

  `;
}

async function genreSet(genre) {
  GENRES.innerHTML = "";

  let genreElementsText = "";

  genre.forEach((element) => {
    genreElementsText += `
    \n <div>
      <p> ${element} </p>
    </div>
    `;

    GENRES.innerHTML = genreElementsText + "\n";
  });
}

async function synopsisSet(text) {
  SYNOPSIS.innerHTML = "";

  const synopsis = document.createElement("p");
  synopsis.innerHTML = text;

  SYNOPSIS.appendChild(synopsis);
}

async function episodeSet(episodeList) {
  EPISODES.innerHTML = "";
  let episodeElementsText = "";

  episodeList.forEach((element) => {
    const { episodeNum, episodeUrl } = element;
    episodeElementsText += `\n <div>
      <a href="${episodeUrl}" >
        ${episodeNum}
      </a>
    </div>`;
  });

  EPISODES.innerHTML = episodeElementsText + "\n";
}

/* 
  
  
  
  
  
  
  
  
  
  
      FUNCTIONS HERE ARE FOR MOVING BETWEEN DISPLAYS
  
  */

function clearDetails() {
  INFORMATION.innerHTML = "";
  SYNOPSIS.innerHTML = "";
  GENRES.innerHTML = "";
  EPISODES.innerHTML = "";
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

function check(event) {
  const key = event.key;
  if (key === "Enter") {
    getAnime();
  }
}
