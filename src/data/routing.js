import { buildUrl, getCategoryKey } from '../utils/appUtils'
import { resultsUrl } from './urls'
import { getShortenedLocale } from './translations/translations'

const enrichUrlParams = (category, ages) => {
    const urlParams = ages ? {
        age_from: ages.age_from,
        age_until: ages.age_until
    } : {}
    
    category && (urlParams.c = category.name)

    return urlParams
}

export const routeToResultsForProduct = (id, term, categories, ages) => {
    const urlParams = Object.assign({}, enrichUrlParams(categories, ages), { id } )
    return {
        pathname: `/${getShortenedLocale()}${ resultsUrl }`,
        search: buildUrl('', urlParams)
    }
}

export const routeToResultsForCategories = (term, categories, ages) => {
    const urlParams = Object.assign({}, enrichUrlParams(categories, ages), { q: term } )
    return {
        pathname: `/${getShortenedLocale()}${ resultsUrl }`,
        search: buildUrl('', urlParams)
    }
}

export const routeToResultsForTerm = (term, categories, ages) => {
    const urlParams = Object.assign({}, enrichUrlParams(categories, ages), { q: term } )
  
    return {
        pathname: `/${getShortenedLocale()}${ resultsUrl }`,
        search: buildUrl('', urlParams)
    }
}