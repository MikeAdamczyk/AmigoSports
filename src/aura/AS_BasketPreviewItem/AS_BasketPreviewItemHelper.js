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
})