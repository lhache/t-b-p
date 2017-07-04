import {
  initialState,
  FETCH_DETAILS,
  FETCH_DETAILS_SUCCESS,
  FETCH_DETAILS_FAILURE,
  requestDetails,
  receiveDetails,
  fetchDetails,
  detailsReducer
} from './details'

// import for testing async action creators
import 'isomorphic-fetch'
import fetchMock from 'fetch-mock';
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import expect from 'expect'
import mockData from '../../../public/details.json'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('actions', () => {
  it('should create an action to request details', () => {
    const id = 1
    const expectedAction = {
      type: FETCH_DETAILS,
      id
    }
    expect(requestDetails(id)).toEqual(expectedAction)
  })

  it('should create an action to receive details', () => {
    const id = 1
    const details = {
      "details": {
        "id": 1,
        "name": "Product name",
        "shopName": "Shop name",
        "ratings": 3,
        "description": "Lorem ipsum dolor sit amet"
      }
    }
    const expectedAction = {
      type: FETCH_DETAILS_SUCCESS,
      id,
      details: details.details
    }
    expect(receiveDetails(id, details)).toEqual(expectedAction)
  })
})

describe('reducer', () => {
  it('should return the initial state', () => {
    expect(detailsReducer(undefined, {})).toEqual(initialState)
  })

  it('should handle FETCH_DETAILS', () => {

    // test with empty state
    expect(
      detailsReducer([], {
        type: FETCH_DETAILS,
        id: 1
      })
    ).toEqual({
      isFetching: true,
    })

    // test with initial state
    expect(
      detailsReducer(initialState, {
        type: FETCH_DETAILS,
        id: 1
      })
    ).toEqual({
      details: {},
      isFetching: true
    })

    // test with already altered state
    expect(
      detailsReducer({
          details: {a: 1},
          isFetching: false
        },
        {
          type: FETCH_DETAILS,
          id: 1
        }
      )
    ).toEqual({
      details: {a: 1},
      isFetching: true
    })
  })
})

describe('async actions', () => {
  afterEach(() => {
    fetchMock.reset()
  })

  it('creates FETCH_DETAILS_SUCCESS when fetching details has been done', () => {
    const id = 1

    fetchMock.mock(
      `/details.json?q=${id}`,
      { body: mockData, status: 200 }
    )

    const expectedActions = [
      { type: FETCH_DETAILS, id },
      { type: FETCH_DETAILS_SUCCESS, details: mockData.details, id }
    ]
    const store = mockStore(initialState)

    return store.dispatch(fetchDetails(id))
      .then(() => {
        // return of async actions
        expect(store.getActions()).toEqual(expectedActions)
      })
  })
})
