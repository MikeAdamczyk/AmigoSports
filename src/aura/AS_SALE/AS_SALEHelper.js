({
      doInit : function(component, event, helper) {

         let action = component.get("c.getDiscountedProducts");
         action.setCallback(this, function (response) {

            if (component.isValid() && response.getState() === 'SUCCESS') {
                component.set("v.apparel", response.getReturnValue());
            } else {
                console.log('ERROR >>>>> ' + response.error);
            }
         });

         $A.enqueueAction(action);
      },

})