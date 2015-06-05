export default class Example {
  constructor() {
  }

  /**
   * An optional description to contextualize the response given in the Example.
   *
   * @public
   * @abstract
   * @return{String}
   */
  description() { }

  /**
   * A non-optional HTTP code that is given in the response that corresponds to
   * this example group.
   *
   * @public
   * @abstract
   * @return{Number}
   */
  httpCode() { }

  /**
   * The data that was returned in the given response.
   *
   * @public
   * @abstract
   * @return{Object}
   */
  data() { }
}
