// require('dotenv').config();
// const apiKey = process.env.API_KEY;
const API_KEY="15d17bd";
const searchBtn = document.getElementById("search");
const input = document.getElementById("input");
const API_URL = `https://www.omdbapi.com/?apikey=${API_KEY}&s=`;



async function fetchData(userSearch){
    try
    {
        const response = await fetch(`${API_URL}${userSearch}`);
        const movieData = await response.json();
        

        const section = document.querySelector('.all_cards');
        section.innerHTML = '';

        if(movieData.Response=="True"){
            displayMovies(movieData.Search);
            
        }
        else{
            if(userSearch.length>2 && movieData.Response=="True"){

            const notFound = document.createElement('div');
            notFound.className="notFound";
            notFound.textContent=`🤦 No movies available with your keyword "${userSearch}"`;
            section.appendChild(notFound);
            }
            
                
        }

    }
    catch(error){
        console.log("error occured: "+error);
    }

}
function displayMovies(searches){

    const section = document.querySelector('.all_cards');
    section.innerHTML = '';


    for(let i = 0; i < searches.length; i++){

        const div = document.createElement('div');
        div.className = "cards";
        section.appendChild(div);

        const cards_items1 = document.createElement('div');
        cards_items1.className="cards_items cards_items1";
        
        const img = document.createElement('img');

        img.src=`${searches[i].Poster}`;
        cards_items1.appendChild(img);
        div.appendChild(cards_items1);


        const cards_items2 = document.createElement('div');
        cards_items2.className="cards_items cards_items2";
        const Title = document.createElement('p');
        Title.textContent=`${searches[i].Title}`;
        cards_items2.appendChild(Title);
        div.appendChild(cards_items2);


        const cards_items3 = document.createElement('div');
        cards_items3.className="cards_items cards_items3";
        const Year = document.createElement('p');
        Year.textContent=`${searches[i].Year}`;
        cards_items3.appendChild(Year);
        div.appendChild(cards_items3);
        div.appendChild(cards_items3);

        const cards_items4 = document.createElement('div');
        cards_items4.className="cards_items cards_items4";
        const button = document.createElement('button');
        button.textContent="Add to Favorites";
        cards_items4.appendChild(button);
        div.appendChild(cards_items4);




    }
    

}

input.addEventListener('input', ()=>{
    const section = document.querySelector('.all_cards');
    section.innerHTML = '';
    const userSearch = input.value.trim();
    if(userSearch.length<3 && userSearch.length>0){
        const tooShort = document.createElement('div');
        tooShort.className="too_short";
        tooShort.textContent="⌨️ Please enter more than 2 characters to search!";
        section.appendChild(tooShort);
    }
    else{
fetchData(userSearch);
    }
    
})

