({
    doInit: function (component, event, helper) {

        console.log('doInit STARTS...');

        let query = '';
        let division = 'Men';


        let action = component.get("c.searchProducts");
        action.setParams({
          "query" : query,
          "division" : division
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