const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhMWQyZDcxM2U5MWM3MzJjYWMzNGQ0ZTdjNGRhOWUzZCIsInN1YiI6IjY2NjliMzg4NDc0MmYyZmM1NjViM2Y5MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Y6ALOgzkxh_hL3sBPJAGSa1LfpwYfKbDKdnU7saFHKQ'
  }
};

let todayTrenBtn = document.getElementById("todayTrending");
let thisweekTrenBtn = document.getElementById("thisweekTrending");

todayTrenBtn.addEventListener("click",function(){
  thisweekTrenBtn.classList.remove("blue1","text-white");
  this.classList.add("blue1","text-white");
  getTrending("day");
})
thisweekTrenBtn.addEventListener("click",function (){
  todayTrenBtn.classList.remove("blue1","text-white")
  this.classList.add("blue1","text-white");
  getTrending("week");
})

const date = ["Jan","Feb","Mar","Apr","May","June","Jul","Aug","Sep","Oct","Nov","Dec"];

function getTrending(time){
  fetch(`https://api.themoviedb.org/3/trending/movie/${time}?language=en-US`, options)
  .then(response => response.json())
  .then((response) => {
    document.querySelector(".trendingMovie").innerHTML = "";
    // console.log(response);
    const result = response.results;
    console.log(result);
    result.forEach((v,i)=>{
      const year = v.release_date.substr(0,4);
      const month = date[parseInt(v.release_date.substr(6,7))-1];
      const div = document.createElement("div");
      div.className = "text-black inline-block p-2 rounded-xl m-2 shadow-lg border-2";
      div.style.Width = "200px";
      div.innerHTML = `
      <img src="https://image.tmdb.org/t/p/w300${v.poster_path}" alt="" style = "min-width: 200px;" style='m-4'>
      <p class="truncate font-bold" style="width:200px">${v.original_title}</p>
      <small class="text-sm text-gray-500"> ${month} ${year}</small>`
      document.querySelector(".trendingMovie").appendChild(div);
    })
  })
  .catch(err => console.error(err));
}

document.body.onload = ()=>{
  todayTrenBtn.classList.add("blue1","text-white");
  getTrending("day")
}