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
  console.log(md.mobile())
  console.log(!(md.mobile() === null))
  return !(md.mobile() === null)
}
