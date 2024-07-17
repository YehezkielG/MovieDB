const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhMWQyZDcxM2U5MWM3MzJjYWMzNGQ0ZTdjNGRhOWUzZCIsInN1YiI6IjY2NjliMzg4NDc0MmYyZmM1NjViM2Y5MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Y6ALOgzkxh_hL3sBPJAGSa1LfpwYfKbDKdnU7saFHKQ'
  }
};

let url = {
  Trendingmovie: fetch('https://api.themoviedb.org/3/trending/movie/day?language=en-US', options).then(response => response.json()),
  Trendingtv: fetch('https://api.themoviedb.org/3/trending/tv/day?language=en-US', options).then(response => response.json()),
  mendatang: fetch('https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1',options).then(response => response.json())
}

const monthFormat = ["Jan", "Feb", "Mar", "Apr", "May", "June", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

async function request(url) {
  let displayResponse = Object.keys(url);
  url = Object.values(url);
  let request = await Promise.all(url);
  let result = request;
  console.log(result);
  result.forEach((value, index) => {
    console.log(value.results);
    document.querySelector(`#${displayResponse[index]}`).innerHTML = "";
    value.results.forEach((v) => {
      const date = index == 2 ? v.release_date : Object.values(v)[11];
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
        <div class="bg-zinc-200" style="width:200PX; height:303px;"></div>
        <p class="my-2 bg-zinc-200 h-4"></p>
        <p class="my-1 bg-zinc-200 h-4"></p>
      </div>
      </div>`
    }
    document.querySelector(`#${v}`).innerHTML = skeleton;
  })
}

const type = ['movie','tv'];

document.querySelectorAll("#selectDay").forEach((select,index)=>{
  select.addEventListener("input",()=>{
    console.log(type[index]);
    setTrending(select.value,type[index]);
  })
})

function setTrending(day,type) {
  const url = {};
  url["Trending" + type] = fetch(`https://api.themoviedb.org/3/trending/${type}/${day}?language=en-US`, options).then(response => response.json());
  console.log(url);
  skeleton_loading(url);
  setTimeout(() => {
    request(url);
  }, 700);
}

async function orang(){
  const request = await fetch('https://api.themoviedb.org/3/person/popular?language=en-US&page=1', options);
  const response = await request.json();
  console.log(response)
  const results = response.results.slice(0,5);
  console.log(results)
  results.forEach((people)=>{
    const div = document.createElement("div");
    let known = people.known_for;
    known = known.map((value)=>value.title)
    div.className = "bg-white rounded-ss-xl rounded-se-xl overflow-hiddenn shadow-sm"
    div.innerHTML = `
    <img src="https://image.tmdb.org/t/p/w300${people.profile_path}" alt="" class="">
    <p class="bg-white font-semibold">${people.name}</p>
    <p class="text-gray-600">${known}</p>
    `;

    document.getElementById("People").appendChild(div);
  })
}
document.body.onload = () => {
  orang();
  skeleton_loading(url);
  setTimeout(() => {
    request(url);
  }, 700)
}