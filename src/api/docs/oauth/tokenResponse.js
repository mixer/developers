import Example from "../../example.js";

export default class TokenResponse extends Example {
  httpCode() { return 200; }
  data() {
    return {
      "access_token": "6f15941e56af8239ee4a6233d6a9f97aa49ba263e125b52e-AKwAv9bC6Es4jYiXlyU7SeQKoCUBPTpX",
      "token_type": "Bearer",
      "expires_in": 21600,
      "refresh_token": "6f15941e56af8239ee4a6233d6a9f97aa49ba263e125b52e-uBBeJi8dFzvvpZxRQJC5DAiS88PPvWzr"
    }
  }
}
