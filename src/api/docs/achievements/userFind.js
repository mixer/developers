import React from "react";
import AbstractAchievementMethod from "./achievementMethod.js";

export default class UserProgressMethod extends AbstractAchievementMethod {
  uri() { return "/api/v1/users/:id/achievements"; }
  group() { return "achievements" }
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
}
