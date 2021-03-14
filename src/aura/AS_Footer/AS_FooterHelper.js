({
     doInit : function(component, event, helper) {
        let year = new Date().getFullYear();
        console.log('YEAR >>> ' + year);
        component.set('v.year', year);
     },
})