class Method {
  constructor() {
  }

  /**
   * Returns a unique slug for indexing API methods.  By default, this points to
   * the #uri method, but can safely be overridden by descendant classes.
   * @public
   * @return{String}
   */
  slug() {
    return this.uri();
  }

  /**
   * Returns the URI that corresponds to a given API method, which optional
   * paremeters.
   *
   * @example
   * let method = ...;
   * method.uri();
   *   #=> "/api/v1/users/:id"
   *
   * @public
   * @abstract
   * @return{String} the URI for the API method.
   */
  uri() { }

  /**
   * Returns a String which describes the API method.  Doesn't currently support
   * the embedding of HTML tags, but it probably should. TODO(tmb)
   * @public
   * @abstract
   * @return{String}
   */
  description() { }

  /**
   * Returns an int which specifies which version of the API this method can be
   * called against.
   * @public
   * @abstract
   * @return{Number}
  version() { }

  /**
   * Returns the HTTP method for which this method may be called against.
   *
   * Returns HTTP methods as they are standardly typed, like, "GET", or, "POST",
   * but not "get", or "Post".
   * @public
   * @abstract
   * @return{String}
   */
  httpMethod() { }

  /**
   * Returns an array of example objects that described the calling scenario for
   * each API method.
   * @public
   * @abstract
   * @return{Array<Example>}
   */
  examples() { }

  /**
   * Returns an array of Parameter objects that describe the parameters that an
   * are taken by a given API method.
   * @public
   * @abstract
   * @return{Array<Parameter>}
   */
  parameters() { }
}
