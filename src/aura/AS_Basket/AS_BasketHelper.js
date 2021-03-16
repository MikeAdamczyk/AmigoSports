({
     goToBasket: function(component, event, helper){
        let urlEvent = $A.get("e.force:navigateToURL");
        urlEvent.setParams({
            "url": "/basket",
        });
        urlEvent.fire();
     }
})