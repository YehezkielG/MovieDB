const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhMWQyZDcxM2U5MWM3MzJjYWMzNGQ0ZTdjNGRhOWUzZCIsInN1YiI6IjY2NjliMzg4NDc0MmYyZmM1NjViM2Y5MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Y6ALOgzkxh_hL3sBPJAGSa1LfpwYfKbDKdnU7saFHKQ'
  }
};

let url = {
  Trending : fetch('https://api.themoviedb.org/3/trending/movie/day?language=en-US',options).then(response => response.json()),
  Popular : fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', options).then(response => response.json())
}



const date = ["Jan","Feb","Mar","Apr","May","June","Jul","Aug","Sep","Oct","Nov","Dec"];

async function request(){
  let ResponseView = Object.keys(url);
  url = Object.values(url);
  let request = await Promise.all(url);
  let result = request;
  console.log(result);
  result.forEach((value,index)=>{
    value.results.forEach((v)=>{
    const year = v.release_date.substr(0,4);
    const month = date[parseInt(v.release_date.substr(6,7))-1];
    const div = document.createElement("div");
    div.className = "text-black inline-block p-2 rounded-xl m-2 shadow-lg border-2";
    div.style.Width = "200px";
    div.innerHTML = `
    <img src="https://image.tmdb.org/t/p/w300${v.poster_path}" alt="" style = "min-width: 200px;" style='m-4'>
    <p class="truncate font-bold" style="width:200px">${v.original_title}</p>
    <small class="text-sm text-gray-500"> ${month} ${year}</small>`
    document.querySelector(`#${ResponseView[index]}`).appendChild(div);
    })
  })
}

document.body.onload = ()=>{
  request();
}