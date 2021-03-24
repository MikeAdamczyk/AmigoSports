({
      doInit : function(component, event, helper) {
        const action = component.get('c.getBasketItems');

        action.setCallback(this, function (response) {
            if (component.isValid() && response.getState() === 'SUCCESS') {
                console.log('BASKET ITEMS >>>>> ' + response.getReturnValue())
                component.set('v.basketProducts', response.getReturnValue());
            } else {
                console.log('ERROR >>>>> ' + response.error);
                console.log('NO ITEMS FOUND ...');
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
                  if(priceSum <= 0){
                      this.hideButton(component);
                  }
              }   else {
                  let sendErrorToast = component.find('errorToastMaker');
                  sendErrorToast.handleErrors(response.getError());
              }
          });
          $A.enqueueAction(action);
      },

      buy: function(component, event, helper) {

         const action = component.get('c.closeOrder');

         action.setCallback(this, function (response) {
             if (component.isValid() && response.getState() === 'SUCCESS') {
                 console.log('SUCCESS, ORDER HAS BEEN CLOSED!');
                 let basket = component.find('basket');
                 $A.util.toggleClass(basket, "hideElement");

                 let thankYouNote = component.find('thankYouNote');
                 $A.util.toggleClass(thankYouNote, "hideElement");

//                 component.set('v.buyBtnPressed',true);
             } else {
                 let errors = response.getError();
                 console.log('CLOSE ORDER - ERROR >>>>> ' + errors[0].pageErrors[0].message);
                 //console.log('ERROR >>>>> ' + errors[0].message);
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