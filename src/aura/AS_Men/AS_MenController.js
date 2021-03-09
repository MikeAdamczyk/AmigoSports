({
      doInit : function(component, event, helper) {

         console.log('SEARCH PRODUCTS STARTED...');

         let action = component.get("c.searchProducts");
         action.setParams({
            "query" : null,
            "division" : 'men'
         });

         action.setCallback(this, function (response) {

            console.log('SEARCH PRODUCTS CALLBACK...');

            if (component.isValid() && response.getState() === 'SUCCESS') {
                console.log('INSIDE RESPONSE...');
                component.set("v.apparel", response.getReturnValue());
                console.log('>>> RESPONSE TAB LIST >>> ' + response.getReturnValue())
            } else {
                console.log('ERROR >>>>> ' + response.error);
            }
         });

         $A.enqueueAction(action);
      },
})