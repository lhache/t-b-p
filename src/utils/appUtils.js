import _flatMap from 'lodash/flatMap'
import _join from 'lodash/join'

export const termCollectionToUrlTerm = term => _join( _flatMap(term, t => t.name), ',')
