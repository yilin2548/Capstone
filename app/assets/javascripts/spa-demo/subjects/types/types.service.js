(function() {
  "use strict";

  angular
    .module("spa-demo.subjects")
    .factory("spa-demo.subjects.Type", TypeFactory);

  TypeFactory.$inject = ["$resource","spa-demo.config.APP_CONFIG"];
  function TypeFactory($resource, APP_CONFIG) {
    var service = $resource(APP_CONFIG.server_url + "/api/types/:id",
        { id: '@id'},
        { update: {method:"PUT"} }
      );
    return service;
  }
})();