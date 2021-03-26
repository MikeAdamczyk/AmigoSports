({
      doInit : function(component, event, helper) {
        const action = component.get('c.getBasketItems');
        action.setCallback(this, function (response) {
            if (component.isValid() && response.getState() === 'SUCCESS') {
                component.set('v.basketProducts', response.getReturnValue());
            } else if (response.getState() === "ERROR") {
                let errors = response.getError();
                console.log('ERROR >>>>> ' + errors[0].message);
            }
        });
        $A.enqueueAction(action);
        this.countSum(component, event);
      },

      handleEvent: function (component, event) {
          this.countSum(component,event);
      },

      countSum: function (component,event) {
          const action = component.get('c.countTotalAmount');
          action.setCallback(this, function (response) {
              let state = response.getState();
              if (state === "SUCCESS") {
                  let totalAmount = response.getReturnValue();
                  component.set('v.totalAmount', totalAmount);
              } else if (state === "ERROR") {
                  let errors = response.getError();
                  console.log('ERROR >>>>> ' + errors[0].message);
              }
          });
          $A.enqueueAction(action);
      },

      buy: function(component, event, helper) {
         const action = component.get('c.closeOrder');
         action.setCallback(this, function (response) {
             if (component.isValid() && response.getState() === 'SUCCESS') {
                 let basket = component.find('basket');
                 $A.util.toggleClass(basket, "hideElement");

                 let thankYouNote = component.find('thankYouNote');
                 $A.util.toggleClass(thankYouNote, "hideElement");

             } else if (response.getState() === "ERROR") {
                 let errors = response.getError();
                 console.log('CLOSE ORDER - ERROR >>>>> ' + errors[0].pageErrors[0].message);
             }
         });
         $A.enqueueAction(action);
      },

      backToHomePage: function(event){
         let urlEvent = $A.get("e.force:navigateToURL");
              urlEvent.setParams({
                  "url": "/s",
              });

          urlEvent.fire();
      },

      checkOrders: function(event){
         let urlEvent = $A.get("e.force:navigateToURL");
              urlEvent.setParams({
                  "url": "/s/orders",
              });

          urlEvent.fire();
      }
})