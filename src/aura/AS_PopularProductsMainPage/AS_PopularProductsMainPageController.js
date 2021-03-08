({
    ({
        doInit: function (component, event, helper) {

            console.log('doInit STARTS Popular Products...');

            let action = component.get("c.getPromotedProducts");

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

})