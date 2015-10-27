export default class Parameter {
  constructor() {
  }

  /**
   * Accessor which returns the name of a parameter.
   * @abstract
   * @return{String}
   */
  name() {
  }

  /**
   * Accessor for the description of a parameter (which belongs to a Method).
   * @example
   *   let p = new ...;
   *   p.description();
   *     #=> "The user ID to query against."
   *
   * @abstract
   * @return {String}
   */
  description() { }

  /**
   * Accessor which lets a caller know whether or not a parameter must be
   * included in order to make the API call work.
   * @return{boolean}
   */
  optional() {
    return false;
  }

  type() {
    return "url";
  }

  getTypeSymbol() {
    switch (this.type()) {
      case "url":
        return ":";
      case "query":
        return "?";
      default:
        return "";
    }
  }
}
