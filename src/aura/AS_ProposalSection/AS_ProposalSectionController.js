/**
 * Created by BRITENET on 08.03.2021.
 */
({
    doInit : function(component, event, helper) {

        var urlRun = $A.get('$Resource.run');
        var urlCrossfit = $A.get('$Resource.crossfit');
        var urlBike = $A.get('$Resource.bike');

        component.set('v.backgroundImageURLrun', urlRun);
        component.set('v.backgroundImageURLcrossfit', urlCrossfit);
        component.set('v.backgroundImageURLbike', urlBike);
    }

})