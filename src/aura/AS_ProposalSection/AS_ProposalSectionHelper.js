({
    doInit : function(component, event, helper) {

        component.set('v.context', 'home');

        let action = component.get("c.getPromotedProducts");

        action.setCallback(this, function (response) {
            if (component.isValid() && response.getState() === 'SUCCESS') {
                component.set("v.apparel", response.getReturnValue());
            } else {
                console.log('ERROR >>>>> ' + response.error);
            }
        });
        $A.enqueueAction(action);

        let urlRun = $A.get('$Resource.run');
        let urlCrossfit = $A.get('$Resource.crossfit');
        let urlBike = $A.get('$Resource.bike');

        component.set('v.backgroundImageURLrun', urlRun);
        component.set('v.backgroundImageURLcrossfit', urlCrossfit);
        component.set('v.backgroundImageURLbike', urlBike);
    },

    AS_Query: function (component, event, helper) {

          let query = event.getParam('query');
          let context = event.getParam('context');

          component.set("v.context", context);

          // SEARCH PRODUCTS
          if(query != null) {

             let action = component.get("c.searchProducts");
             action.setParams({
                "query" : query,
                "division" : null
             });

             action.setCallback(this, function (response) {
                if (component.isValid() && response.getState() === 'SUCCESS') {
                    component.set("v.apparel", response.getReturnValue());
                } else {
                    console.log('ERROR >>>>> ' + response.error);
                }
             });

             $A.enqueueAction(action);
          }
    }
})