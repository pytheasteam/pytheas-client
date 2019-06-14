import { SELECT_TRIP, FETCH_TRIPS, CLEAR_TRIPS } from "../actions/types";

const initialState = {
  trips: [],
  trip: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
    case SELECT_TRIP:
      return { ...state, trip: action.payload };
    case FETCH_TRIPS:
      return { ...state, trips: action.payload };
    case CLEAR_TRIPS:
      return { ...state, trips: [], trip: {} };
  }
}
