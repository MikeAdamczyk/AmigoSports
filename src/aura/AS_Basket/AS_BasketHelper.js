({
     goToBasket: function(component, event, helper){
        let urlEvent = $A.get("e.force:navigateToURL");
        urlEvent.setParams({
            "url": "/basket",
        });
        urlEvent.fire();
     },

     showModal: function(component,event,helper){
         this.countSum(component,event, helper);
         const action = component.get('c.getBasketItems');

         action.setCallback(this, function (response) {
             if (component.isValid() && response.getState() === 'SUCCESS') {
                component.set('v.basketProducts', response.getReturnValue());

             } else {
                 console.log('ERROR >>>>> ' + response.error);
             }
         });
         $A.enqueueAction(action);

         let modal = component.find('basket-modal');
         $A.util.toggleClass(modal, "hideBasketPreview");
     },

     countSum: function (component,event, helper) {
          const action1 = component.get('c.countTotalAmount');
          action1.setCallback(this, function (response) {
              let state = response.getState();
              if (state === "SUCCESS") {
                  let totalAmount = response.getReturnValue();
                  component.set('v.totalAmount', totalAmount);
              }
              if (state === "ERROR") {
                   let errors = response.getError();
                   console.log('ERROR >>>>> ' + errors[0].message);
              }
          });
          $A.enqueueAction(action1);
     },

     hideModal: function(component){
         let modal = component.find('basket-modal');
         $A.util.toggleClass(modal, "hideBasketPreview");
     },

     checkOrders: function(event){
          let urlEvent = $A.get("e.force:navigateToURL");
               urlEvent.setParams({
                   "url": "/s/orders",
               });
           urlEvent.fire();
     }
})