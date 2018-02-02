import './styles/app.scss';
import {on, sanitizeString, getPromiseData, axelVisar, flatten} from './helpers/';

class Mashed{ 
    constructor(element){
        this.addEventListeners();
    }

    //sätt lyssnare på button och input

    addEventListeners(){
        
    const searchBtn = document.querySelector('.search button');
    const searchInput = document.querySelector('.search input');
        //sätt lyssnare click på button knappen,this refererar till klassen
        // mashed och kör search funktionen
    searchBtn.addEventListener('click', () => this.search(searchInput.value));
    };  

    //searchInput.value är vad du skriver i input fältet, detta blir value.
    search(searchInput) {
        //spara 
    let query = searchInput;
    
    if (!query.length) { //kolla om inputen är tom
      return; //om input är tomt går det inte o söka
    }

    let apiCalls = [
      this.fetchFlickrPhotos(query), //detta är ett promise
      this.fetchWordlabWords(query) // detta oxå
    ]
        //apiCalls är arryen ovanför
    getPromiseData(apiCalls)
      .then((result) => {
        //console.log(result)
        this.renderFlickrPhotos(result[0].photos.photo)
        this.renderWords(result[1])
        
        
        
      });   
      
  }
  //rendera ut bilderna med en foreach lop och skapa nya li o p element
  //photos ligger i arrayen med photos
 
  renderFlickrPhotos(photos){
      
      const resultsHolder = document.querySelector('.results ul');
      resultsHolder.innerHTML = "";

      photos.forEach((photo) => {
        const liEl = document.createElement('li');
        
  
        
        liEl.style.backgroundImage = `url(${photo.url_o})`
        liEl.classList.add('result')
        resultsHolder.appendChild(liEl);


    });
  };

  //rendera ut orden,result kommer från

  renderWords(result){
     
     console.log(result)

    let words = Object.keys(result).map(key => 
        Object.values(result[key]).map(w => w)
    );

    words = flatten(words);
    console.log(words);
      const asideHolder = document.querySelector('aside ul');
      asideHolder.innerHTML = "";


      words.forEach(word => {
        let liEL = document.createElement('li')
        let aEl = document.createElement('a')
        
        aEl.href = "#"
        aEl.textContent = word

        liEL.addEventListener('click',() => this.search(word))

        liEL.appendChild(aEl)
        asideHolder.appendChild(liEL)




      })
      

  };
  

fetchFlickrPhotos (query){
    let resourceURL = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=';
    let apiKey = process.env.FLICKR_API_KEY;
    
    let flickrQueryParam = `&text=${query}&safe_search=1&per_page=10&format=json&nojsoncallback=1&extras=original_format,url_o&license=2,3,4,5,6,9`;
    let flickrUrl = `${resourceURL}${apiKey}${flickrQueryParam}`
    
    return fetch(flickrUrl)
     };

fetchWordlabWords (query){
    let wordLabApi = process.env.BHT_API_KEY
    let wordLabUrl = `http://words.bighugelabs.com/api/2/${wordLabApi}/${query}/json`
    
    return fetch(wordLabUrl)

    };

     
    }

(function() {
    new Mashed(); 
})();
