import PaginatedMethod from "../../paginatedMethod.js";
import Parameter from "../../parameter.js";
import Example from "../../example.js";

export default class ChannelTypesMethod extends PaginatedMethod {
  uri() { return "/api/v1/types/:slug/channels"; }
  version() { return 1; }
  httpMethod() { return "GET"; }

  description() {
    return "Lists channels in a particular category. It returns an array of \
    channel resources with their \"thumbnail\" attribute populated.";
  }

  parameters() {
    return super.parameters().concat([
      new SlugParameter(),
      new OrderParameter(),
      new OnlyParameter(),
    ]);
  }

  examples() { return [ new SuccesfulResult(); ] }
}

class SlugParameter extends Parameter {
  name() { return "slug"; }
  description() { return "Slug of the category to search in."; }
}

class OrderParameter extends Paramter {
  name() { return "order"; }
  description() {
    return "Specifies the order in which channels should be displayed in the \
    format attribute:order.\nOrder should be one of `asc` or `desc`. Attribute \
    may be one of: `online`, `featured`, `partnered`, `name`, `viewers_total`, \
    `followers`, `subscribers`.\nIf the attribute or order do not follow these \
    rules, the sorting rule will be ignored.";
  }
  default() { return "online:desc,viewers_total:desc"; }
}

class OnlyParamter extends Paramter {
  name() { return "only"; }
  description() {
    return "Filters the results to a specific subset. Valid values are: \
    `featured`, `partnered`.";
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
      subscribers: 2
      thumbnail: { },
      token: "connor4312",
      type: "minecraft",
      updatedAt: new Date().toISOString(),
      user: 2,
      viewersTotal: 127
    }];
  }
}
