import React from "react";
import Method from "../../method.js";
import Parameter from "../../parameter.js";
import Example from "../../example.js";

import LoremIpsum from "lorem-ipsum";

import AccessDeniedResult from "../../accessDeniedResult.js";
import ResourceMissingResult from "../../resourceMissingResult.js";

export default class CreateThumbnailMethod extends Method {
  uri() { return "/api/v1/channels/:id/thumbnail"; }
  httpMethod() { return "POST"; }
  version() { return 1; }
  group() { return "channels" }
  description() {
    return (
      <p>
        This endpoint is used for uploading and setting a new channel
        thumbnail.
      </p>
    )
  }
  parameters() { return [ new IDParameter(), new ThumbnailParameter() ]; }
  examples() {
    return [
      new SuccesfulResult(),
      new AccessDeniedResult(),
      new ResourceMissingResult("Channel"),
      new ErrorfulResult()
    ];
  }
}

class IDParameter extends Parameter {
  name() { return "id"; }
  description() { return "Numeric ID of channel to update."; }
}

class ThumbnailParameter extends Parameter {
  name() { return "thumbnail"; }
  description() {
    return (
      <div className="description">
        <p>
          An image file, sent as multipart form data, to use as the channel
          thumbnail. Files will be processed, resized to 405x225 pixels, and
          converted to JPEG images, so it is not possible to upload animated
          gifs at this time.
        </p>
        <p>
          The maximum upload size is 10 megabytes. Valid formats include png,
          jpg, and gif images. Files that do not fit these rules will cause a 
          <code>400 Bad Request</code> to be returned.
        </p>
      </div>
    );
  }
}

class SuccesfulResult extends Example {
  httpCode() { return 200; }
  data() {
    return {
      allowCostream: "all",
      audience: "G",
      banner: {},
      body: LoremIpsum({ count: 3, unit: "sentences" }),
      cache: [{},{}],
      cover: {},
      createdAt: new Date().toISOString(),
      featured: false,
      folowers: 10,
      hidden: false,
      id: 20,
      name: "Minecraft Rox",
      online: true,
      partnered: false,
      subscribers: 2,
      status: {
        following: true,
        subscribed: false
      },
      thumbnail: {},
      token: "connor4312",
      type: "minecraft",
      updatedAt: new Date().toISOString(),
      user: {},
      viewersTotal: 127
    };
  }
}

class ErrorfulResult extends Example {
  httpCode() { return 400; }
  data() { return "Invalid file."; }
}
