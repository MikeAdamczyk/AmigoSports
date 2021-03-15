({
     doInit : function(component, event, helper) {
        let year = new Date().getFullYear();
        component.set('v.year', year);
     },
})