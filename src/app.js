/* Code goes here */
import './styles/app.scss';

class Mashed {
  constructor(element) {
    this.root = element;

    this.fetchFlickrPhotos();
    this.fetchWordlabWords('detest');
  }

  fetchFlickrPhotos() {
    let resourceUrl =
      'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key='
    let flickrAPIkey = '2bfdce80f8de8d01a3c0b1e43843e961'

    let flickrQueryParams =
      '&text=space' +
      '&extras=url_q&format=json&nojsoncallback=1'
    let flickrUrl = resourceUrl + flickrAPIkey + flickrQueryParams

    fetch(flickrUrl)
      .then(res => res.json())
      .then(res => {
        console.log('Got response from FlickR!')
        console.log(res)
      })
      .catch(err => console.error(err))
  }

  fetchWordlabWords(query) {
    let wordLabAPIkey = '9d30c37acd6d49022f294eeff979f914'
    let wordLabUrl = `http://words.bighugelabs.com/api/2/${wordLabAPIkey}/${query}/json`

    fetch(wordLabUrl)
      .then(res => res.json())
      .then(res => {
        console.log('Got response from BigHugeLabs!')
        console.log(res)
      })
      .catch(err => console.error(err))
  }
}

(function() {
  new Mashed(document.querySelector('#mashed'))
})();