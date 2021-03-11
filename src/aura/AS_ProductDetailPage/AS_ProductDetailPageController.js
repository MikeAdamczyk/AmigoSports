({
    init: function(component, event, helper){
            helper.init(component, event, helper);
    },

        onSelect: function (component, event, helper){
             var component_target = event.currentTarget;
             var attribute = component_target.dataset.myvalue;
             console.info('PHOTO ID ----->>>>>> ' + attribute);
             component.set("v.mainPhoto", attribute);
        },
})