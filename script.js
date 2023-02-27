// options is used with the fetch of each function

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
const RESULTS_PAGES = document.querySelector(".result-pages");

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
    `
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
async function getAnime(page) {
  RESULTS_CONTAINER.innerHTML = "";
  showScreen("results");
  const input = SEARCH_BAR.value;
  searchAnime(input, page) // getting data
    .then((info) => setResults(info)) // using data
    .catch((err) => console.error(err));
}

function searchBtn() {
  getAnime(1);
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
async function searchAnimeDetails(id) {
  const response = await fetch(
    `https://api.consumet.org/anime/gogoanime/info/${id}`
  );
  return response.json();
}

/* 

searchAnimeDetails('blue-lock') return example

see example in details folder


*/

// takes info in json format and loads it to screen
async function setInfo(info) {
  const {
    title,
    type,
    releasedDate,
    status,
    genres,
    otherNames,
    description,
    image,
    totalEpisodes,
    episodes,
  } = info;

  const infoArray = [
    title,
    type,
    releasedDate,
    status,
    otherNames,
    image,
    totalEpisodes,
  ];
  informationSet(infoArray);
  genreSet(genres);
  synopsisSet(description);
  episodeSet(episodes);
}

/* 
the functions here make up setInfo function

1. titleSet
2. synopsisSet
*/

async function informationSet(infoArray) {
  INFORMATION.innerHTML = "";

  const [
    title,
    animetype,
    releaseDate,
    status,
    otherNames,
    image,
    totalEpisodes,
  ] = infoArray;

  INFORMATION.innerHTML = `
  
  <h1> ${title} </h1>
  <p> Othernames: ${otherNames} </p>
  <p> AnimeType: ${animetype} </p>
  <p> Release date: ${releaseDate} </p>
  <p> Status: ${status} </p>
  <img src='${image}' alt='image' />
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
    const { number, url } = element;
    episodeElementsText += `\n <div>
      <a href="${url}" >
        ${number}
      </a>
    </div>`;
  });

  EPISODES.innerHTML = episodeElementsText + "\n";
}

function setPage(number) {
  RESULTS_PAGES.innerHTML += `\n 
  <button onclick="getAnime(${page})" > ${page} </button> 
  `;
}

async function getPageResults(name) {
  let nextPage = true;
  while (nextPage === true) {
    searchAnime(name).then((info) => {
      if (info.hasNextPage === true) {
        setPage(info.currentPage);
      } else {
        nextPage = false;
      }
    });
  }
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
