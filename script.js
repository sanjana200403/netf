// tmbd
const API_KEY ="api_key=c54261795aebcc7205dc57aef68d81ae"
const BASE_URL="https://api.themoviedb.org/3"
const imgPath ="https://image.tmdb.org/t/p/original"
// const API_URL = BASE_URL+'/discover/movie?sort_by=popularity_desc&'+API_KEY
// getMovies(API_URL)
// function getMovies(url){
//     fetch(url).then(res=> res.json()).then(data=>{
//         console.log(data)
//     })


// }
const apiPaths={
    fetchAllCategories:`${BASE_URL}/genre/movie/list?${API_KEY}`,
    fetchMovieList:(id)=> `${BASE_URL}/discover/movie?${API_KEY}&with_genres=${id}`

}



function init(){
    fetch(apiPaths.fetchAllCategories).then(res=>res.json()).then(data=>{
        console.log(data.genres)
        const movies =data.genres
        if(Array.isArray(movies)&&movies.length){

           movies.forEach(movies=>{
            fetchAndBuildSection(apiPaths.fetchMovieList(movies.id),movies)
           })
            
        }

        
})

}


function fetchAndBuildSection(fetchurl,category){
    console.log(fetchurl,category.name)
    fetch(fetchurl).then(res=>res.json()).then(data=>{
        console.log(data.results)
        const movie = data.results

        if(Array.isArray(movie)&&movie.length){
            buildMovieSection(movie,category.name)
        }

    }).catch(err=>console.log(err))
    const mainsItem = document.getElementById("mains")

}

function buildMovieSection(list,categoryName){
    console.log(list,categoryName)
    const movieMain = document.getElementById("mains")
    movieMain.innerHTML +=`
    <div id="sections">
    <h2>${categoryName}</h2>
    <div id=${categoryName} class="main">
    </div>
    
    </div>
    `
    list.map(item=>{
        const movieContent = document.getElementById(`${categoryName}`)
        movieContent.innerHTML +=`
        <div id="main">
        
        <div class="movie">
               <img src=${imgPath}${item.backdrop_path} alt="">
   
               <div class="movie-info">
                   <h2>${item.title}</h2>
                   <span class="green">
                       9.8
                   </span>
               </div>
               <div class="overview">
                   <h3>Overview</h3>
                   Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint quia porro fugiat dolores minima repellendus ratione, pariatur architecto doloremque incidunt tempora tenetur ea in necessitatibus quisquam accusantium molestiae quae reiciendis.
               </div>
           </div>
       </div>
        `
    
    
    })

}
window.addEventListener('load', function(){
    init()
})