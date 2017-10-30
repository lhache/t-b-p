import MobileDetect from 'mobile-detect'
import _flatMap from 'lodash/flatMap'
import _join from 'lodash/join'
import _get from 'lodash/get'

export const getUrlParam = (search, param) => {
  return _get(parseQueryString(search), param)
}

export const joinTermToStringWithSymbol = (terms, object, symbol) => _join( _flatMap(terms, t => _get(t, object)), symbol)

export const getCategoryKey = categories => joinTermToStringWithSymbol(categories, 'name', ',')

// super helpful because category names have & inside, breaking most of query params parsers
export const parseQueryString = (str = "") => {
  let objURL = {}
  let keys = []
  let values = []
  str.replace(
      new RegExp( "([^?=&]+)(=([^&]*))?", "g" ),
      function( $0, $1, $2, $3 ){
          keys.push($1)
          values.push($3)
      }
  );

  for (var i = 0; i < keys.length ; i++) {
    if (!!values[i]) {
      objURL[ keys[i] ] = decodeURIComponent(values[i])
    }
    else {
      objURL[ keys[i - 1] ] = decodeURIComponent(values[i - 1] + '&' + keys[i])
    }
  }

  return objURL;
};

export const isDeviceConsideredMobile = () => {
  var md = new MobileDetect(window.navigator.userAgent);
  return !(md.mobile() === null)
}

// parameters format:
// var parameters = {
//   name: "George Washington",
//   dob: "17320222"
// };
export const buildUrl = (url, parameters) => {
  var qs = "";
  for(var key in parameters) {
    var value = parameters[key];
    // value && (qs += encodeURIComponent(key) + "=" + encodeURIComponent(value) + "&")
    value && (qs += (key) + "=" + (value) + "&")
    // qs += (key) + "=" + (value) + "&"
  }
  if (qs.length > 0){
    qs = qs.substring(0, qs.length-1); //chop off last "&"
    url = url + "?" + qs;
  }
  return url;
}
