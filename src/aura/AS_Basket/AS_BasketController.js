({

    goToBasket: function(component, event, helper){
        helper.goToBasket(event);
    },

    showModal: function(component,event,helper){
        helper.showModal(component,event);
        helper.countSum(component,event);
    },

    hideModal: function(component){
        let modal = component.find('basket-modal');
        $A.util.toggleClass(modal, "hideBasketPreview");
    },


})