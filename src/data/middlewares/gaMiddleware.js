
export const gaMiddleware = store => next => action => {
  // tracl pageviews only for results and details page
  if (action.type === '@@router/LOCATION_CHANGE' && /\/results$|\/details$/i.test(window.location.pathname)) {
    window.ga && window.ga('send', 'pageview');
  }
  return next(action)
}
