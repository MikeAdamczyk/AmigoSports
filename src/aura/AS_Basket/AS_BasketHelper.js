({
     goToBasket: function(component, event, helper){
        let urlEvent = $A.get("e.force:navigateToURL");
        urlEvent.setParams({
            "url": "/basket",
        });
        urlEvent.fire();
     },

     showModal: function(component,event,helper){
         console.log('ENTER TO show modal function !!!!');
         this.countSum(component,event, helper);
         console.log('AFTER countSum !!!!');

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
 //        this.countSum(component,event, helper);
         },

         countSum: function (component,event, helper) {
                 console.log('ENTER TO countSun function !!!!');

               const action1 = component.get('c.countTotalAmount');
               action1.setCallback(this, function (response) {
                   let state = response.getState();
                   if (state === "SUCCESS") {
                       console.log('THIS IS TOTAL AMOUNT FROM BASKET PREVIEW >>> ' + response.getReturnValue());
                       let totalAmount = response.getReturnValue();
                       component.set('v.totalAmount', totalAmount);
     //                  if(priceSum <= 0){
     //                      this.hideButton(component);
     //                  }
                   }   else {
     //                  let sendErrorToast = component.find('errorToastMaker');
     //                  sendErrorToast.handleErrors(response.getError());
                   }
               });
               $A.enqueueAction(action1);
         },



         hideModal: function(component){
             let modal = component.find('basket-modal');
             $A.util.toggleClass(modal, "hideBasketPreview");
         },

})