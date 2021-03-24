({
    doInit : function(component, event, helper) {
        console.log('ENTER ORDER LIST INIT.......');

        let action = component.get("c.getClosedOrders");

        action.setCallback(this, function (response) {
            if (component.isValid() && response.getState() === 'SUCCESS') {
                console.log('CLOSED ORDERS >>>> ' + response.getReturnValue());
                component.set("v.orders", response.getReturnValue());
            } else {
                console.log('ERROR >>>>> ' + response.error);
            }
        });
        $A.enqueueAction(action);
    },
})