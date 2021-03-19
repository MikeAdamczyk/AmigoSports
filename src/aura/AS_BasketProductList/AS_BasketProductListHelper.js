({
      handleEvent: function (component, event) {
          this.countSum(component,event);

          console.log('doInit STARTS...');
          const action = component.get('c.getBasketItems');

          action.setCallback(this, function (response) {
              if (component.isValid() && response.getState() === 'SUCCESS') {
                  component.set('v.basketProducts', response.getReturnValue());

              } else {
                  console.log('ERROR >>>>> ' + response.error);
                  console.log('NO ITEMS FOUND ...');
  //                let sendErrorToast = component.find('errorToastMaker');
  //                sendErrorToast.handleErrors(response.getError());
          }

          });
          $A.enqueueAction(action);
          this.countSum(component, event);
      },

      doInit : function(component, event, helper) {

        console.log('doInit STARTS...');
        const action = component.get('c.getBasketItems');

        action.setCallback(this, function (response) {
            if (component.isValid() && response.getState() === 'SUCCESS') {
                component.set('v.basketProducts', response.getReturnValue());

            } else {
                console.log('ERROR >>>>> ' + response.error);
                console.log('NO ITEMS FOUND ...');
//                let sendErrorToast = component.find('errorToastMaker');
//                sendErrorToast.handleErrors(response.getError());
        }

        });
        $A.enqueueAction(action);
        this.countSum(component, event);

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
})