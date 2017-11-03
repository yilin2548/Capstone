(function() {
  "use strict";

  angular
    .module("spa-demo.subjects")
    .component("sdTypeEditor", {
      templateUrl: typeEditorTemplateUrl,
      controller: TypeEditorController,
      bindings: {
        authz: "<"
      },
      require: {
        typesAuthz: "^sdTypesAuthz"
      }      
    })
    .component("sdTypeSelector", {
      templateUrl: typeSelectorTemplateUrl,
      controller: TypeSelectorController,
      bindings: {
        authz: "<"
      }
    })
    ;


  typeEditorTemplateUrl.$inject = ["spa-demo.config.APP_CONFIG"];
  function typeEditorTemplateUrl(APP_CONFIG) {
    return APP_CONFIG.type_editor_html;
  }    
  typeSelectorTemplateUrl.$inject = ["spa-demo.config.APP_CONFIG"];
  function typeSelectorTemplateUrl(APP_CONFIG) {
    return APP_CONFIG.type_selector_html;
  }    

  TypeEditorController.$inject = ["$scope","$q",
                                   "$state","$stateParams",
                                   "spa-demo.authz.Authz",
                                   "spa-demo.subjects.Type",
                                   "spa-demo.subjects.TypeThing"];
  function TypeEditorController($scope, $q, $state, $stateParams, 
                                 Authz, Type, TypeThing) {
    var vm=this;
    vm.create = create;
    vm.clear  = clear;
    vm.update  = update;
    vm.remove  = remove;
    vm.haveDirtyLinks = haveDirtyLinks;
    vm.updateThingLinks = updateThingLinks;

    vm.$onInit = function() {
      console.log("TypeEditorController",$scope);
      $scope.$watch(function(){ return Authz.getAuthorizedUserId(); }, 
                    function(){ 
                      if ($stateParams.id) {
                        reload($stateParams.id); 
                      } else {
                        newResource();
                      }
                    });
    }

    return;
    //////////////
    function newResource() {
      vm.item = new Type();
      vm.typesAuthz.newItem(vm.item);
      return vm.item;
    }

    function reload(typeId) {
      var itemId = typeId ? typeId : vm.item.id;      
      console.log("re/loading type", itemId);
      vm.things = TypeThing.query({type_id:itemId});
      vm.item = Type.get({id:itemId});
      vm.typesAuthz.newItem(vm.item);
      vm.things.$promise.then(
        function(){
          angular.forEach(vm.things, function(tt){
            tt.originalPriority = tt.priority;            
          });                     
        });
      $q.all([vm.item.$promise,vm.things.$promise]).catch(handleError);
    }
    function haveDirtyLinks() {
      for (var i=0; vm.things && i<vm.things.length; i++) {
        var tt=vm.things[i];
        if (tt.toRemove) {
          return true;
        }        
      }
      return false;
    }    

    function create() {      
      vm.item.errors = null;
      vm.item.$save().then(
        function(){
          console.log("type created", vm.item);
          $state.go(".",{id:vm.item.id});
        },
        handleError);
    }

    function clear() {
      newResource();
      $state.go(".",{id: null});    
    }

    function update() {      
      vm.item.errors = null;
      var update=vm.item.$update();
      updateThingLinks(update);
    }
    function updateThingLinks(promise) {
      console.log("updating links to things");
      var promises = [];
      if (promise) { promises.push(promise); }
      angular.forEach(vm.things, function(tt){
        if (tt.toRemove) {
          promises.push(tt.$remove());
        }
      });

      console.log("waiting for promises", promises);
      $q.all(promises).then(
        function(response){
          console.log("promise.all response", response); 
          //update button will be disabled when not $dirty
          $scope.typeform.$setPristine();
          reload(); 
        }, 
        handleError);    
    }

    function remove() {      
      vm.item.$remove().then(
        function(){
          console.log("type.removed", vm.item);
          clear();
        },
        handleError);
    }

    function handleError(response) {
      console.log("error", response);
      if (response.data) {
        vm.item["errors"]=response.data.errors;          
      } 
      if (!vm.item.errors) {
        vm.item["errors"]={}
        vm.item["errors"]["full_messages"]=[response]; 
      }      
      $scope.typeform.$setPristine();
    }    
  }

  TypeSelectorController.$inject = ["$scope",
                                     "$stateParams",
                                     "spa-demo.authz.Authz",
                                     "spa-demo.subjects.Type"];
  function TypeSelectorController($scope, $stateParams, Authz, Type) {
    var vm=this;

    vm.$onInit = function() {
      console.log("TypeSelectorController",$scope);
      $scope.$watch(function(){ return Authz.getAuthorizedUserId(); }, 
                    function(){ 
                      if (!$stateParams.id) {
                        vm.items = Type.query();        
                      }
                    });
    }
    return;
    //////////////
  }

})();
