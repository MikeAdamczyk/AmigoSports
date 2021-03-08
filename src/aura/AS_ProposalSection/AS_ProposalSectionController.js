({
    doInit : function(component, event, helper) {

        let action = component.get("c.getPromotedProducts");

        action.setCallback(this, function (response) {
            if (component.isValid() && response.getState() === 'SUCCESS') {
                component.set("v.apparel", response.getReturnValue());
            } else {
                console.log('ERROR >>>>> ' + response.error);
            }
        });
        $A.enqueueAction(action);


        var urlRun = $A.get('$Resource.run');
        var urlCrossfit = $A.get('$Resource.crossfit');
        var urlBike = $A.get('$Resource.bike');

        component.set('v.backgroundImageURLrun', urlRun);
        component.set('v.backgroundImageURLcrossfit', urlCrossfit);
        component.set('v.backgroundImageURLbike', urlBike);

    }
})