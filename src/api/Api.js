import { API_BASE, MOCK_MODE } from "./consts";
import querystring from "querystring";
import { exploreMock } from "../mock/exploreMock";
import { TRIP_MOCK } from "../mock/tripMock";
import { profileMock } from "../mock/profileMock";
import { Plugins } from "@capacitor/core";

const ROUTES = {
  "/explore": exploreMock,
  "/trip": TRIP_MOCK,
  "/profile": profileMock
};

const { Storage } = Plugins;
async function getToken() {
  const ret = await Storage.get({ key: "token" });
  return ret.value;
}

export class PytheasApi {
  static async getAuth() {
    const token = await getToken();
    return token;
  }
  static async get(route, queryParams) {
    if (MOCK_MODE) {
      return ROUTES[route];
    }
    const token = await PytheasApi.getAuth();

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
      }).then(response => {
        if (response.ok) {
          const resJson = response.json();
          return resolve(resJson);
        } else {
          return reject();
        }
      });
    });
  }

  static async put(route, body) {
    const token = await PytheasApi.getAuth();
    let endpoint = API_BASE + route;
    return await new Promise(function(resolve, reject) {
      fetch(endpoint, {
        method: "PUT",
        headers: {
          Authorization: token
        },
        body: JSON.stringify(body)
      })
        .then(response => {
          if (response.ok) {
            return resolve();
          }
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  static async post(route, body) {
    const token = await PytheasApi.getAuth();
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
            return resolve();
          }
        })
        .catch(err => {
          reject(err);
        });
    });
  }
}

export default PytheasApi;
