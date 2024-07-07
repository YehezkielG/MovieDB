const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhMWQyZDcxM2U5MWM3MzJjYWMzNGQ0ZTdjNGRhOWUzZCIsInN1YiI6IjY2NjliMzg4NDc0MmYyZmM1NjViM2Y5MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Y6ALOgzkxh_hL3sBPJAGSa1LfpwYfKbDKdnU7saFHKQ'
  }
};

let url = {
  Trendingmovie: fetch('https://api.themoviedb.org/3/trending/movie/day?language=en-US', options).then(response => response.json()),
  Trendingtv: fetch('https://api.themoviedb.org/3/trending/tv/day?language=en-US', options).then(response => response.json())
}

const monthFormat = ["Jan", "Feb", "Mar", "Apr", "May", "June", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

async function request(url) {
  let displayResponse = Object.keys(url);
  url = Object.values(url);
  let request = await Promise.all(url);
  let result = request;
  console.log(result);
  result.forEach((value, index) => {
    document.querySelector(`#${displayResponse[index]}`).innerHTML = "";
    value.results.forEach((v) => {
      const date = Object.values(v)[11];
      const year = date.substr(0, 4);
      const month = monthFormat[parseInt(date.substr(6, 7)) - 1];
      const div = document.createElement("div");
      div.className = "text-black inline-block p-2 rounded-xl m-2 shadow-xl border-2 border-gray-50 cursor-pointer";
      div.style.Width = "200px";
      div.innerHTML = `
    <img src="https://image.tmdb.org/t/p/w300${v.poster_path}" alt="" style = "min-width: 200px;" style='m-4'>
    <p class="truncate font-bold" style="width:200px">${Object.values(v)[4]}</p>
    <p class="my-1">
    <span class="text-sm text-gray-500"> ${month} ${year}</span>
    <span class="float-right">${v.vote_average.toPrecision(2)}⭐</span>
    </p>
    `
      document.querySelector(`#${displayResponse[index]}`).appendChild(div);
    })
  })
}

function skeleton_loading(url) {
  let displayResponse = Object.keys(url);
  displayResponse.forEach((v) => {
    let skeleton = "";
    for (let i = 0; i < 20; i++) {
      skeleton +=
        `<div class="text-black inline-block p-2 rounded-xl m-2 shadow-xl border-2 border-gray-50 cursor-pointer ">
      <div class="animate-pulse">
        <div class="bg-zinc-200" style="width:200PX; height:300px;"></div>
        <p class="my-2 bg-zinc-200 h-4"></p>
        <p class="my-1 bg-zinc-200 h-4"></p>
      </div>
      </div>`
    }
    document.querySelector(`#${v}`).innerHTML = skeleton;
  })
}

function setDayTrending(element) {
  const day = element.innerHTML == "hari ini" ? "day" : "week";
  const url = {};
  url["Trending" + element.value] = fetch(`https://api.themoviedb.org/3/trending/${element.value}/${day}?language=en-US`, options).then(response => response.json());
  console.log(url);
  skeleton_loading(url);
  setTimeout(() => {
    request(url);
  }, 700);
}

document.body.onload = () => {
  skeleton_loading(url);
  setTimeout(() => {
    request(url);
  }, 700)
}