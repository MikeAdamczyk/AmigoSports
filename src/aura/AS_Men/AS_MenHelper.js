({
      doInit : function(component, event, helper) {

         let action = component.get("c.searchProducts");
         action.setParams({
            "query" : null,
            "division" : 'men'
         });

         action.setCallback(this, function (response) {

            if (component.isValid() && response.getState() === 'SUCCESS') {
                component.set("v.apparel", response.getReturnValue());
            } else {
                console.log('ERROR >>>>> ' + response.getError().message);
            }
         });

         $A.enqueueAction(action);
      },
})