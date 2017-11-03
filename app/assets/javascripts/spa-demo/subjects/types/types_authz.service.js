(function() {
  "use strict";

  angular
    .module("spa-demo.subjects")
    .factory("spa-demo.subjects.TypesAuthz", TypesAuthzFactory);

  TypesAuthzFactory.$inject = ["spa-demo.authz.Authz",
                                "spa-demo.authz.BasePolicy"];
  function TypesAuthzFactory(Authz, BasePolicy) {
    function TypesAuthz() {
      BasePolicy.call(this, "Type");
    }
      //start with base class prototype definitions
    TypesAuthz.prototype = Object.create(BasePolicy.prototype);
    TypesAuthz.constructor = TypesAuthz;


      //override and add additional methods
    TypesAuthz.prototype.canQuery=function() {
      //console.log("TypesAuthz.canQuery");
      return Authz.isAuthenticated();
    };

    TypesAuthz.prototype.canCreate=function() {
      //console.log("TypesAuthz.canQuery");
      return Authz.isAdmin();
    };
        TypesAuthz.prototype.canUpdate=function() {
      //console.log("TypesAuthz.canQuery");
      return Authz.isAuthenticated();
    };


      //add custom definitions
    TypesAuthz.prototype.canAddThing=function(Type) {
        return Authz.isMember(Type);
        // return true
    };
    TypesAuthz.prototype.canUpdateThing=function(Type) {
        return Authz.isOrganizer(Type)
    };
    TypesAuthz.prototype.canRemoveThing=function(Type) {
        // return Authz.isOrganizer(Thing);
        return true
    };
    
    return new TypesAuthz();
  }
})();