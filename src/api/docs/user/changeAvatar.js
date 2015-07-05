import Method from "../../method.js";
import Parameter from "../../parameter.js";
import Example from "../../example.js";

import SuccesfulResult from "./succesfulResult.js";
import IDParameter from "./idParameter.js";
import ResourceMissingResult from "../../resourceMissingResult.js";
import AccessDeniedResult from "../../accessDeniedResult.js";

export default class SomeAPIMethod extends Method {
  uri() { return "/api/v1/XXX"; }
  version() { return 1; }
  httpMethod() { return "XXX"; }
  description() { return "XXX"; }
  parameters() { return [ new IDParameter(), new AvatarParameter() ]; }
  examples() { return [ new SuccesfulResult(), new AccessDeniedResult(),
                        new ResourceMissingResult("Channel"),
                        new ErrorfulResult() ]; }
}

class AvatarParameter extends Parameter {
  name() { return "@avatar"; }
  description() {
    return (
      <div>
        <p>
          "An image file, sent as multipart form data, to use as the channel
          thumbnail. Files will be processed, resized, and converted to JPEG
          images, so it is not possible to upload animated gifs at this time."
        </p>
        <p>
          "The maximum upload size is 10 megabytes. Valid formats include png,
          jpg, and gif images. Files that do not fit these rules will cause a
          <code>400 Bad Request</code> to be returned."
        </p>
      </div>
    );
  }
}

class ErrorfulResult extends Example {
  httpCode() { return 400; }
  data() { return "Invalid file"; }
}
