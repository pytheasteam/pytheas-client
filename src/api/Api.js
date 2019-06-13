import { API_BASE } from "./consts";
import querystring from "querystring";

export class PytheasApi {
  static getAuth() {
    const token = localStorage.getItem("token");
    return token;
  }
  static async get(route, queryParams) {
    const token = PytheasApi.getAuth();

    let endpoint = API_BASE + route;
    if (queryParams) {
      endpoint += "?" + querystring.stringify(queryParams);
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
