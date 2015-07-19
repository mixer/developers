import React from "react";

import LoremIpsum from "lorem-ipsum";
import PaginatedMethod from "../../paginatedMethod.js";
import Parameter from "../../parameter.js";
import Example from "../../example.js";

import OrderParameter from "../../orderParameter.js";

export default class ChannelTypesMethod extends PaginatedMethod {
  uri() { return "/api/v1/types/:slug/channels"; }
  version() { return 1; }
  httpMethod() { return "GET"; }
  group() { return "channels"; }

  description() {
    return "Lists channels in a particular category. It returns an array of \
    channel resources with their \"thumbnail\" attribute populated.";
  }

  parameters() {
    return super.parameters().concat([
      new SlugParameter(),
      new OrderParameter(["online", "featured", "partnered", "name",
                          "viewers_total", "followers", "subscribers"]),
      new OnlyParameter(),
    ]);
  }
  examples() { return [ new SuccesfulResult() ]; }
}

class SlugParameter extends Parameter {
  name() { return "slug"; }
  description() { return "Numeric ID of the category in which to search."; }
}

class OnlyParameter extends Parameter {
  name() { return "only"; }
  description() {
    return (
      <p>Filters the results to a specific subset. Valid values are <code>featured</code>
      and <code>partnered</code>.</p>
    )
  }
  optional() { return true; }
}

class SuccesfulResult extends Example {
  httpCode() { return 200; }
  data() {
    return [{
      id: 20,
      token: "connor4312",
      online: true,
      featured: false,
      partnered: false,
      transcodingEnabled: true,
      suspended: false,
      name: "Minecraft Rocks",
      audience: "G",
      viewersTotal: 127,
      viewersCurrent: 0,
      numFollowers: 52,
      numSubscribers: 0,
      description: LoremIpsum({ count: 3, unit: "sentences" }),
      typeId: 33217,
      thumbnail: {
        meta: {
          size: [
            405,
            225
          ]
        },
        id: 1713,
        type: "channel:thumbnail",
        relid: 129,
        url: "https://s3.amazonaws.com/uploads.beam.pro/thumbnails/129.jpg",
        store: "s3",
        remotePath: "thumbnails/129.jpg",
        createdAt: "2015-02-19 19:12:02",
        updatedAt: "2015-05-06 02:45:37"
      },
      user: {
        social: {
          twitter: "http://twitter.com/ConnorPeet",
          facebook: null,
          youtube: null,
          player: "http://player.me/connor"
        },
        id: 146,
        username: "connor4312",
        verified: true,
        points: 66,
        bio: LoremIpsum({ count: 1, unit: "sentences" }),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    }];
  }
}
