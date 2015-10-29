import Method from "../../method.js";
import Parameter from "../../parameter.js";
import Example from "../../example.js";

export default class PasswordStrengthMethod extends Method {
  uri() { return "/api/v1/users/passwordstr"; }
  version() { return 1; }
  httpMethod() { return "POST"; }
  group() { return "user"; }
  description() { return "Calculates and returns the strength of a given password using Dropbox's zxcvbn library."; }

  parameters() {
    return [
      new PasswordParameter()
    ];
  }
  examples() {
    return [];
  }
}

class PasswordParameter extends Parameter {
  name() { return "password"; }
  description() { return "The password to score. It will not be stored or persisted."; }
}

class SuccessfulExample extends Example {
  httpCode() { return 200; }
  data() {
    return {
      "calc_time": 1,
      "crack_time": 5873.803,
      "crack_time_display": "3 hours",
      "entropy": 26.808,
      "match_sequence": [
        {
          "base_entropy": 10.782998208920413,
          "dictionary_name": "surnames",
          "entropy": 11.782998208920413,
          "i": 0,
          "j": 3,
          "l33t_entropy": 0,
          "matched_word": "beam",
          "pattern": "dictionary",
          "rank": 1762,
          "token": "Beam",
          "uppercase_entropy": 1
        },
        {
          "base_entropy": 11.439830883981394,
          "dictionary_name": "english",
          "entropy": 12.439830883981394,
          "i": 4,
          "j": 6,
          "l33t_entropy": 0,
          "matched_word": "pro",
          "pattern": "dictionary",
          "rank": 2778,
          "token": "Pro",
          "uppercase_entropy": 1
        },
        {
          "ascending": true,
          "entropy": 2.584962500721156,
          "i": 7,
          "j": 9,
          "pattern": "sequence",
          "sequence_name": "digits",
          "sequence_space": 11,
          "token": "123"
        }
      ],
      "password": "BeamPro123",
      "score": 2
    }
  }
}
