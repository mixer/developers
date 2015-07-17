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
      allow_costream: "all",
      audience: "G",
      body: LoremIpsum({ count: 3, unit: "sentences" }),
      createdAt: new Date().toISOString(),
      featured: false,
      followers: 10,
      hidden: false,
      id: 20,
      name: "Minecraft Rox",
      online: true,
      partnered: false,
      subscribers: 2,
      thumbnail: { },
      token: "connor4312",
      type: "minecraft",
      updatedAt: new Date().toISOString(),
      user: 2,
      viewersTotal: 127
    }];
  }
}
