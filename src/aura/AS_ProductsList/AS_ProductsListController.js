({
    doInit: function (component, event, helper) {

        console.log('doInit STARTS...');

        let gender = 'Men';


        let action = component.get("c.getApparel");
        action.setParams({
          "gender" : gender
        });

        action.setCallback(this, function (response) {
            if (component.isValid() && response.getState() === 'SUCCESS') {
                component.set("v.apparel", response.getReturnValue());
                console.log('>>> RESPONSE >>> ' + response.getReturnValue())
            } else {
                console.log('ERROR >>>>> ' + response.error);
            }
        });
        $A.enqueueAction(action);
    },

})