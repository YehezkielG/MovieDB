const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhMWQyZDcxM2U5MWM3MzJjYWMzNGQ0ZTdjNGRhOWUzZCIsInN1YiI6IjY2NjliMzg4NDc0MmYyZmM1NjViM2Y5MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Y6ALOgzkxh_hL3sBPJAGSa1LfpwYfKbDKdnU7saFHKQ'
    }
  };

const urlParams = new URLSearchParams(window.location.search);
const personId = urlParams.get('id');

async function getPerson(){
    const request = await fetch(`https://api.themoviedb.org/3/person/${personId}?language=en-US`,options);
    console.log(request.status);
    if(request.status !== 200){
      console.log("kwontol");
      document.location = "../index.html"
    }
    const response = await request.json();
    console.log(response);
    document.querySelector("#personBiograph img").src = `https://image.tmdb.org/t/p/w300/${response.profile_path}`;
    document.querySelector("#Name").textContent = response.name;
    document.querySelector("#Biograph").textContent = response.biography;
}

document.body.onload = ()=>{
    getPerson();
}