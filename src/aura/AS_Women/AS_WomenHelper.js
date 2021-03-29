({
      doInit : function(component, event, helper) {

         let action = component.get("c.searchProducts");
         action.setParams({
            "query" : null,
            "division" : 'women'
         });

         action.setCallback(this, function (response) {
            if (component.isValid() && response.getState() === 'SUCCESS') {
                component.set("v.apparel", response.getReturnValue());
            }

            if (response.getState() === 'ERROR') {
                let sendErrorToast = component.find('errorToast');
                sendErrorToast.handleErrors(response.getError());
            }
         });

          $A.enqueueAction(action);
      },
})