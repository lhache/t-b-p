import {
  FETCH_DETAILS,
  FETCH_DETAILS_SUCCESS,
  FETCH_DETAILS_FAILURE,
  requestDetails,
  receiveDetails
} from './details'

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
      details: details.details,
      receivedAt: Date.now()
    }
    expect(receiveDetails(id, details)).toEqual(expectedAction)
  })
})
