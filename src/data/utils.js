import MobileDetect from 'mobile-detect'

export const parseQueryString = (str = "") => {
  let objURL = {};
  str.replace(
      new RegExp( "([^?=&]+)(=([^&]*))?", "g" ),
      function( $0, $1, $2, $3 ){
          objURL[ $1 ] = $3;
      }
  );
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
    value && (qs += encodeURIComponent(key) + "=" + encodeURIComponent(value) + "&")
  }
  if (qs.length > 0){
    qs = qs.substring(0, qs.length-1); //chop off last "&"
    url = url + "?" + qs;
  }
  return url;
}
