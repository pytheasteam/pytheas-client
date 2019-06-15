import { API_BASE } from "./consts";
import querystring from "querystring";
import { exploreMock } from "../mock/exploreMock";
import { TRIP_MOCK } from "../mock/tripMock";
import { profileMock } from "../mock/profileMock";

const MOCK_MODE = true;
const ROUTES = {
  "/explore": exploreMock,
  "/trip": TRIP_MOCK,
  "/profile": profileMock
};

export class PytheasApi {
  static getAuth() {
    const token = localStorage.getItem("token");
    return token;
  }
  static async get(route, queryParams) {
    if (MOCK_MODE) {
      return ROUTES[route];
    }
    const token = PytheasApi.getAuth();

    let endpoint = API_BASE + route;

    if (typeof queryParams === "object" && queryParams) {
      endpoint += "?" + querystring.stringify(queryParams);
    } else if (typeof queryParams === "string") {
      endpoint += queryParams;
    }
    return await new Promise(function(resolve, reject) {
      fetch(endpoint, {
        method: "GET",
        headers: {
          Authorization: token
        }
      })
        .then(response => {
          if (response.ok) {
            return resolve(response.json());
          }
        })
        .catch(err => reject(err));
    });
  }

  static async post(route, body) {
    const token = this.getAuth();
    let endpoint = API_BASE + route;
    return await new Promise(function(resolve, reject) {
      fetch(endpoint, {
        method: "POST",
        headers: {
          Authorization: token
        },
        body: JSON.stringify(body)
      })
        .then(response => {
          if (response.ok) {
            return resolve(response.json());
          }
        })
        .catch(err => {
          reject(err);
        });
    });
  }
}

export default PytheasApi;
