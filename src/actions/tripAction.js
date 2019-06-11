import { FETCH_TRIPS } from "../actions/types";
import { API_BASE } from "../api/consts";

export const fetchTrips = () => dispatch => {
  fetch(API_BASE + "/trip", {
    method: "GET",
    headers: {
      Authorization: localStorage.getItem("token")
    }
  })
    .then(res => res.json())
    .then(body => {
      console.log("here");
      return dispatch({ type: FETCH_TRIPS, payload: body });
    });
};
