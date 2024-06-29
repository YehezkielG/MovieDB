const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhMWQyZDcxM2U5MWM3MzJjYWMzNGQ0ZTdjNGRhOWUzZCIsInN1YiI6IjY2NjliMzg4NDc0MmYyZmM1NjViM2Y5MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Y6ALOgzkxh_hL3sBPJAGSa1LfpwYfKbDKdnU7saFHKQ'
  }
};

fetch('https://api.themoviedb.org/3/trending/movie/day?language=en-US', options)
  .then(response => response.json())
  .then((response) => {
    // console.log(response);
    const result = response.results;
    console.log(result);
    result.forEach((v,i)=>{
      const div = document.createElement("div");
      div.className = "text-black inline-block p-2 rounded-xl m-2 shadow-lg border-2";
      div.style.Width = "200px";
      div.innerHTML = `
      <img src="https://image.tmdb.org/t/p/w300${v.poster_path}" alt="" style = "min-width: 200px;" style='m-4'>
      <p class="">${v.original_title}</p>`
      document.querySelector(".trendingMovie").appendChild(div);
    })
  })
  .catch(err => console.error(err));