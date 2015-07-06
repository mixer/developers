import React from "react";
import Parameter from "../../parameter.js";

export class IDParameter extends Parameter {
  name() { return "id"; }
  description() { return "User ID to get the notifications for."; }
}

export class SinceParameter extends Parameter {
  name() { return "since"; }
  optional() { return true; }
  description() {
    return (
      <p>
        A minimum time for notifications to show. It must be given as an ISO8601
        string. If it is not, then all notifications will be shown.
      </p>
    )
  }
  default() { return new Date().toISOString(); }
}

export class BeforeParameter extends Parameter {
  name() { return "before"; }
  optional() { return true; }
  description() {
    return (
      <p>
        Results are, by default, truncated to 50 entries. If you need to view
        more you can set the "before" time so as to accomplish paging.
      </p>
    );
  }
  default() { return "NOW()"; }
}
