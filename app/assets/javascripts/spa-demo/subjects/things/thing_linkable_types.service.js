(function() {
  "use strict";

  angular
    .module("spa-demo.subjects")
    .factory("spa-demo.subjects.ThingLinkableType", ThingLinkableType);

  ThingLinkableType.$inject = ["$resource", "spa-demo.config.APP_CONFIG"];
  function ThingLinkableType($resource, APP_CONFIG) {
    return $resource(APP_CONFIG.server_url + "/api/things/:thing_id/linkable_types");
  }

})();