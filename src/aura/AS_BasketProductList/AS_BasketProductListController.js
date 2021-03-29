({
    doInit : function(component, event, helper) {
        helper.doInit(component, event);
    },

    handleEvent : function(component, event, helper) {
        helper.handleEvent(component, event);
    },

    buy : function(component, event, helper) {
        helper.buy(component, event);
    },

    backToHomePage: function(component, event, helper){
        helper.backToHomePage(event);
    },

    checkOrders: function(component, event, helper){
        helper.checkOrders(event);
    }
})