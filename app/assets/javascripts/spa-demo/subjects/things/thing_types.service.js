(function() {
  "use strict";

  angular
    .module("spa-demo.subjects")
    .factory("spa-demo.subjects.ThingType", ThingType);

  ThingType.$inject = ["$resource", "spa-demo.config.APP_CONFIG"];
  function ThingType($resource, APP_CONFIG) {
    return $resource(APP_CONFIG.server_url + "/api/things/:thing_id/type_things");
  }

})();