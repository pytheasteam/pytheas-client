import {
  SELECT_TRIP,
  FETCH_TRIPS,
  CLEAR_TRIPS,
  UPDATE_TRIP,
  SAVE_TRIP
} from "../actions/types";

const initialState = {
  trips: null,
  trip: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
    case SELECT_TRIP:
    case UPDATE_TRIP:
      console.log(action.payload);
      return { ...state, trip: action.payload };
    case SAVE_TRIP:
      const curr = state.trips;
      curr[action.payload[0]] = action.payload[1];
      return { ...state, trips: curr };
    case FETCH_TRIPS:
      return { ...state, trips: action.payload };
    case CLEAR_TRIPS:
      return { ...state, trips: null, trip: {} };
  }
}
