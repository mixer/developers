import Example from "../../example.js";

export default class SuccessfulExample extends Example {
  httpCode() { return 200; }
  data() {
    return {
      createdAt: new Date().toISOString(),
      currency_cost: 2,
      description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officiis incidunt voluptas odit.",
      id: 1,
      images: [/* array of Resources */],
      max_per_user: null,
      max_quantity: null,
      points_cost: 0,
      purchases: 4,
      thumbnails: [/* array of Resources */],
      title: "Fancy Emoticon Pack",
      updatedAt: new Date().toISOString()
    }
  }
}
