import React from "react";

import Method from "../../method.js";
import Parameter from "../../parameter.js";
import Example from "../../example.js";

import SuccessfulExample from "./successfulResponse.js";

import AccessDeniedResult from "../../accessDeniedResult.js";
import ResourceMissingResult from "../../resourceMissingResult.js";

export default class UpdateChannelMethod extends Method {
  httpMethod() { return "PUT"; }
  uri() { return "/api/v1/channels/:id"; }
  version() { return 1; }
  description() { return "This endpoint updates the channel's details."; }
  group() { return "channels"; }

  parameters() {
    return [
      new IDParameter(),
      new NameParameter(),
      new AllowCostreamParameter(),
      new AudienceParameter(),
      new CategoriesParameter(),
      new CoverParameter(),
      new ThumbnailIDParameter(),
      new DescriptionParameter()
    ];
  }
  examples() {
    return [
      new SuccessfulExample(),
      new AccessDeniedResult(),
      new ResourceMissingResult("Channel"),
      new ErrorfulResult()
    ];
  }
}

class IDParameter extends Parameter {
  name() { return "id"; }
  description() { return "Numeric ID of the channel to update."; }
}

class NameParameter extends Parameter {
  name() { return "name"; }
  description() { return "The channel name (channel title)."; }
  optional() { return true; }
  default() { return undefined; }
}

class AllowCostreamParameter extends Parameter {
  name() { return "allow_costream"; }
  description() {
    return (
      <div className="description">
        <p>
          Whether costreaming requests are permitted on the channel.  It may be
          one of:
        </p>
        <ul>
          <li><code>all</code> To allow all costreaming requests to be sent</li>
          <li><code>following</code> To allow costreaming requests to be made only
            from channels the owner is following</li>
          <li><code>none</code> To disallow all costreaming requests</li>
        </ul>
      </div>
    );
  }
  optional() { return true; }
  default() { return undefined; }
}

class AudienceParameter extends Parameter {
  name() { return "audience"; }
  description() {
    return (
      <div className="description">
        <p>
          The audience target of the channel, or rating.  Possible values are:
        </p>
        <ul>
          <li>family</li>
          <li>teen</li>
          <li>18+</li>
        </ul>
      </div>
    );
  }
  optional() { return true; }
  default() { return undefined; }
}

class CategoriesParameter extends Parameter {
  name() { return "categories"; }
  optional() { return true; }
  default() { return undefined; }
  description() {
    return (
      <div className="description">
        <p>
          The channel categories the channel should be listed under. Accepts an
          array of type IDs.
        </p>
        <p>
          Note that you don't need to explicitly list the entire hierarchy
          chain. For example, if I'm playing Skyrim, I could simply add the
          category "Skyrim", and the channel will also be listed under
          "Games".
        </p>
      </div>
    );
  }
}

class CoverParameter extends Parameter {
  name() { return "coverId"; }
  optional() { return true; }
  default() { return undefined; }
  description() {
   return "The numeric resource ID of the stream cover to use for this channel. \
   It will be displayed as the channel's page background.";
  }
}

class ThumbnailIDParameter extends Parameter {
  name() { return "thumbnailId"; }
  description() {
    return "The numeric resource ID of the stream thumbnail to use for this \
    channel. It will be displayed on listing or \"browse\" pages.";
  }
  optional() { return true; }
  default() { return undefined; }
}

class DescriptionParameter extends Parameter {
  name() { return "description"; }
  optional() { return true; }
  default() { return undefined; }
  description() {
    return "The channel description to be displayed. HTML is allowed, but it \
    will be sanitized.";
  }
}

class ErrorfulResult extends Example {
  httpCode() { return 400; }
  data() { return "Standard invalid response."; }
}
