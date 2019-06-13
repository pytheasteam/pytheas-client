import { FETCH_TRIPS, SELECT_TRIP } from "../actions/types";
import PytheasApi from "../api/Api";
/*
.then(body => this.setState({ profiles: body.profiles }))
      .catch(err => this.props.history.push("/login"));

*/
export const fetchTrips = () => dispatch => {
  PytheasApi.get("/trip").then(body => {
    return dispatch({ type: FETCH_TRIPS, payload: body });
  });
};

export const selectTrip = trip => dispatch =>
  dispatch({ type: SELECT_TRIP, payload: trip });
