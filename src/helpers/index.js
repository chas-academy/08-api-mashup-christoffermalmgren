/** Makes us able to use on without jQuery */
Node.prototype.on = window.on = function (name, fn) {
  this.addEventListener(name, fn);
};

NodeList.prototype.__proto__ = Array.prototype;

NodeList.prototype.on = NodeList.prototype.addEventListener = function (name, fn) {
  this.forEach(function (elem, i) {
    elem.on(name, fn);
  });
};

/**
 *
 * @param {Array} arr Array of promises to be resolved
 */
export function getPromiseData(promises) {
  return new Promise((resolve, reject) => {
    Promise.all(promises)
      .then(res => {
        return res.map( type => type.json() );
      })
      .then(res => {
        Promise.all(res)
          .then(resolve)
      })
      .catch(reject);
  });
}

/**
 *
 * @param {Object} data
 */
export function axelVisar(data) {
  return Object.keys(data).map(function(key) {
      console.log([key, data[key]]);
      return [key, data[key]].map(encodeURIComponent).join("=");
  }).join("&");
}

export function flatten (arr) {
  const flat = [].concat(...arr);
  return flat.some(Array.isArray) ? flatten(flat) : flat;
}
