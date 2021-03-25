({
    doInit : function(component, event, helper) {
        let action = component.get("c.getClosedOrders");
        action.setCallback(this, function (response) {
            if (component.isValid() && response.getState() === 'SUCCESS') {
                component.set("v.orders", response.getReturnValue());
            } else {
                let errors = response.getError();
                if (errors) {
                   if (errors[0] && errors[0].message) {
                      console.log("Error message: " + errors[0].message);
                   }
                }
            }
        });
        $A.enqueueAction(action);
    },
})