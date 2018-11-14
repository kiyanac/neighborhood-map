class APIHelp {
  static baseURL() {
    return "https://api.foursquare.com/v2";
  }
  static auth() {
    const keys = {
      client_id:"RJYPCQBRP0DWTBJOOI00AP2L2ZSP5HWG0UJUL2ADLNUVERQX",
      client_secret:"05FGCTAGUVT1KEARFJQM3KZ0NVHLIZG4S211AMHGIQXEVIDQ",
      v:"20181113"
    };
    return Object.keys(keys).map(key => `${key}=${keys[key]}`).join("&");
  }
  static urlBuilder(params) {
    if(!params) {
      return ""
    }
    return Object.keys(params).map(key => `${key}=${params[key]}`).join("&");
  }
  static headers() {
    return {
      Accept: "application/json"
    };
  }
  static simpleFetch(endPoint, method, params) {
    let request = {
      method,
      headers: APIHelp.headers()
    };
    return fetch(`${APIHelp.baseURL()}${endPoint}?${APIHelp.auth()}&${APIHelp.urlBuilder(params)}`,
                 request
                ).then(res => res.json());
  }
}

export default class FourSquare {
  static search(params) {
    return APIHelp.simpleFetch("/venues/search", "GET", params);
  }
  static details(VENUE_ID) {
    return APIHelp.simpleFetch(`/venues/${VENUE_ID}`, "GET");
  }
  static hours(VENUE_ID) {
    return APIHelp.simpleFetch(`/venues/${VENUE_ID}/hours`, "GET");
  }
   static photos(VENUE_ID) {
    return APIHelp.simpleFetch(`/venues/${VENUE_ID}/photos`, "GET");
  }
}
