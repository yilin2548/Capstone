(function() {
  "use strict";

  angular
    .module("spa-demo.subjects")
    .factory("spa-demo.subjects.TypeThing", TypeThing);

  TypeThing.$inject = ["$resource", "spa-demo.config.APP_CONFIG"];
  function TypeThing($resource, APP_CONFIG) {
    return $resource(APP_CONFIG.server_url + "/api/types/:type_id/type_things/:id",
      { type_id: '@type_id', 
        id: '@id'},
      { update: {method:"PUT"} 
      });
  }

})();