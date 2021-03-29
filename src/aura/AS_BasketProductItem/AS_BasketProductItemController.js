({
    doInit : function(component, event, helper) {
        helper.doInit(component);
    },

    increase: function (component, event, helper) {
        helper.increaseQuantity(component, event, helper);
    },

    decrease: function (component, event, helper) {
        helper.decreaseQuantity(component, event, helper);
    },

    clickTrash: function(component, event, helper) {
        helper.removeProductFromBasket(component);
        helper.clickTrash(component, event);
    },
})