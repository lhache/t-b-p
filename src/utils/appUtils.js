import _flatMap from 'lodash/flatMap'
import _join from 'lodash/join'
import _get from 'lodash/get'

export const joinTermToStringWithSymbol = (terms, object, symbol) => _join( _flatMap(terms, t => _get(t, object)), symbol)
