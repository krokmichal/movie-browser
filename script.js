import { MY_API_KEY } from "config.js";

const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": MY_API_KEY,
    "X-RapidAPI-Host": "online-movie-database.p.rapidapi.com",
  },
};

async function fetchData() {
  let keyword = document.querySelector("#searchbox").value;
  let url =
    "https://online-movie-database.p.rapidapi.com/auto-complete?q=" + keyword;
  const resultsContainer = document.querySelector("#results");

  try {
    const response = await fetch(url, options);
    const result = await response.text();
    console.log(result);
    return result;
  } catch (error) {
    console.error(error);
  }
}

function scanForMovies() {
  event.preventDefault();
  let div = document.querySelector("#results");
  div.innerHTML = '';
  fetchData().then((data) => {
    const jsonData = JSON.parse(data);
    jsonData.d.forEach((item) => {
      if (item.qid === "movie" || item.qid === "tvSeries") {
        let movie = item.i;
        div.innerHTML += `<div><img src="${movie.imageUrl}"><div>Title: ${item.l}</div>`;
      }
    });
  });
}

document
  .getElementById("search-form")
  .addEventListener("submit", scanForMovies);
