import React from "react";
import AbstractAchievementMethod from "./achievementMethod.js";
import Example from "../../example.js";
import Parameter from "../../parameter.js";

export default class UserProgressMethod extends AbstractAchievementMethod {
  uri() { return "/api/v1/users/:id/achievements"; }
  group() { return "achievements"; }
  description() {
    return (
      <div>
        <p>
          This lists all achievements and the user's progress on those achievements.
        </p>
        <p>
          Achievements are a resource in themselves, then the user can gain
          Achievement Earnings, which record the user's progress and earned status
          on each achievement. Note that an Earning record will not exist if the
          user has not made progress on an achievement.
        </p>
        <p>
          In this endpoint, the difference is not apparent, but for other endpoints
          this is something you'll need to keep in mind.
        </p>
      </div>
    )
  }

  examples() {
    return [
      new SuccessfulExample()
    ];
  }
  parameters() {
    return [
      new IDParameter()
    ];
  }
}

class IDParameter extends Parameter {
  constructor() {
    super();
  }

  name() { return "id"; }
  description() { return "Numeric user ID to get the achievements for."; }
}

class SuccessfulExample extends Example {
  httpCode() { return 200; }
  data() {
    return [
      {
        id: 832,
        earned: true,
        progress: 0.164,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        achievement: "helper-pro",
        user: 146,
        Achievement: {
          slug: "helper-pro",
          name: "HelperPro",
          description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
          points: 0
        }
      },
      {
        id: 849,
        earned: false,
        progress: 0.058,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        achievement: "thousand-beams",
        user: 146,
        Achievement: {
          slug: "thousand-beams",
          name: "ThousandBeams",
          description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
          points: 0
        }
      }
    ];
  }
}
