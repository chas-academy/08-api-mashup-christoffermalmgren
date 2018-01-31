import './styles/app.scss';
import {on, sanitizeString, getPromiseData, axelVisar, flatten} from './helpers/';

class Mashed {
  constructor(element) {
    this.root = element;

    this.addEventListeners();
  }

  addEventListeners() {
    const searchInput = document.querySelector('.search input');
    const searchBtn = document.querySelector('.search button');

    searchBtn.addEventListener('click', () => {
      console.log('Clicked', event.target);
      console.log('And the input has value ', );
      this.fetchWordlabWords(searchInput.value);
      this.fetchFlickrPhotos(searchInput.value);
    });

    const sidebarWords = document.querySelectorAll('aside ul li a');

    sidebarWords.forEach((sidebarWord) => {
      sidebarWord.addEventListener('click', function() {
        // TODO: Trigger flickr and word api fetch with Promise.all()
      });
    });
  }

  search() {
    let query = this.searchInput.value;

    if (!query.length) {
      return;
    }

    let apiCalls = [
      this.fetchFlickrPhotos(query),
      this.fetchWordlabWords(query)
    ]

    getPromiseData(apiCalls)
      .then((result) => {
        console.log(result)
      });
  }

  renderFlickerPhotos(photos) {
    const resultsHolder = document.querySelector('.results ul');
    resultsHolder.innerHTML = "";

    photos.forEach((photo) => {
      const liEl = document.createElement('li');
      const pEl = document.createElement('p');

      pEl.textContent = photo.title;

      liEl.style.backgroundImage = `url(${photo.url_o})`;
      liEl.classList.add('result');
      liEl.appendChild(pEl);

      resultsHolder.appendChild(liEl);
    });
  }

  renderWordSuggestions(res) {
    const sidebarListHolder = document.querySelector('aside ul');

    let words = Object.keys(res).map(key => {
      return Object.values(res[key]).map(w => {
        return w
      });
    });

    words = flatten(words); // Spara över words med den tillplattade versionen av sig själv

    words.forEach((word) => {
      let listItem = document.createElement('li');
      let link = document.createElement('a');

      link.href = "#";
      link.textContent = word;

      listItem.appendChild(link);
      sidebarListHolder.appendChild(listItem);
    });

    this.addEventListeners();

  }

  fetchFlickrPhotos(query) {
    let flickrAPIkey = process.env.FLICKR_API_KEY
    let resourceUrl = `https://api.flickr.com/services/rest/?`;

    let params = {
      method: 'flickr.photos.search',
      api_key: flickrAPIkey,
      text: query,
      sort: 'relevance',
      extras: 'original_format, url_o, url_q',
      license: '2,4,5,6,7',
      per_page: 10,
      format: 'json',
      nojsoncallback: 1,
      dimension_search_mode: "max"
    };

    let flickrQueryParams = axelVisar(params);
    let flickrUrl = `${resourceUrl}${flickrQueryParams}`

    return fetch(flickrUrl)
      .then(res => res.json())
      .then(res => {
        this.renderFlickerPhotos(res.photos.photo);
      });
  }

  fetchWordlabWords(query) {
    let wordLabAPIkey = process.env.BHT_API_KEY
    let wordLabUrl = `http://words.bighugelabs.com/api/2/${wordLabAPIkey}/${query}/json`

    return fetch(wordLabUrl)
      .then(res => res.json())
      .then(res => {
        // Nu kan vi börja bygga grejer i DOM:en, går bra att göra direkt i denna callbacken
        // Eller, så lägger vi det i en funktion, som tar emot svaret från API:et
        this.renderWordSuggestions(res) // Ropa på funktion
      });
  }
}

(function() {
  new Mashed(document.querySelector('#mashed'))
})();