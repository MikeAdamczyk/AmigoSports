({
      doInit : function(component, event, helper) {
            let AmigoPhotoLink = $A.get('$Label.c.AmigoPhotoLink');
            component.set('v.AmigoPhotoLink', AmigoPhotoLink);

            let quantity = component.get('v.basketItem').quantity;
            let price = component.get('v.basketItem').price;
            let amount = price * quantity;
            component.set('v.quantity', quantity);
            component.set('v.amount', amount.toFixed(2));
      },

      increaseQuantity: function (component, event, helper) {
            let price = component.get('v.basketItem').price;
            let quantity = component.get('v.quantity');

            let newQuantity = parseInt(quantity) + 1;
            let amount = price * newQuantity;
            component.set('v.quantity', newQuantity);
            component.set('v.amount', amount.toFixed(2));
            this.updateOrder(component, event);
            this.fireEvent();
      },

      decreaseQuantity: function (component, event, helper) {
            let price = component.get('v.basketItem').price;
            let quantity = component.get('v.quantity');

            if(quantity > 1){
                let newQuantity = parseInt(quantity) - 1;
                let amount = price * newQuantity;
                component.set('v.quantity', newQuantity);
                component.set('v.amount', amount.toFixed(2));
                this.updateOrder(component, event);
                this.fireEvent();
            }
      },

      updateOrder: function (component, event) {
            let quantity = component.get('v.quantity');
            let orderItem = component.get('v.basketItem');

            let action = component.get('c.updateOrderItem');
            action.setParams({
                orderItemId: orderItem.orderItemId,
                quantity: quantity
            });
            action.setCallback(this, function (response) {
                if (response.getState() === "ERROR") {
                    let errors = response.getError();
                    console.log('ERROR >>>>> ' + errors[0].message);
                    let sendErrorToast = component.find('errorToast');
                    sendErrorToast.handleErrors(response.getError());
                }
            });
            $A.enqueueAction(action);
      },

      removeProductFromBasket: function (component, event, helper) {

            let productId = component.get('v.basketItem.productId');
            let action = component.get('c.removeItemFromOrder');

            action.setParams({productId: productId});
            action.setCallback(this, function (response) {

                if (response.getState() === "ERROR") {
                    let errors = response.getError();
                    console.log('ERROR >>>>> ' + errors[0].message);
                    let sendErrorToast = component.find('errorToast');
                    sendErrorToast.handleErrors(response.getError());
                }
            });
            $A.enqueueAction(action);
            this.fireEvent();
      },

      clickTrash : function (component, event, helper) {
            let element = component.find('mainContainer');
            $A.util.toggleClass(element, "hideElement");
            this.fireEvent();
      },

      fireEvent: function () {
            let event = $A.get('e.c:AS_RequestTotalAmountEvent');
            event.fire();
      },
})