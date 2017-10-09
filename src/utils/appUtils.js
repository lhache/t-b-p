import _flatMap from 'lodash/flatMap'
import _join from 'lodash/join'

export const joinTermToStringWithSymbol = (term, symbol) => _join( _flatMap(term, t => t.name), symbol)
