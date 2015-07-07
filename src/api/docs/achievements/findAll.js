import AbstractAchievementMethod from "./achievementMethod.js";

export default class FindAllAchievementsMethod extends AbstractAchievementMethod {
  uri() { return "/api/v1/achievements/"; }
  group() { return "achievements" }
  description() { return "This lists all achievements that are possible to earn."; }
}
