({
    init: function(component, event, helper) {
        const TotalAmount = component.get("v.order").TotalAmount;
        component.set('v.amount', TotalAmount.toFixed(2));
    },

    check: function(component, event, helper) {
        const orderId = component.get("v.order").Id;

        let action = component.get("c.getOrderItems");
        action.setParams({orderId: orderId});
        action.setCallback(this, function (response) {

            if (component.isValid() && response.getState() === 'SUCCESS') {
                component.set("v.orderItems", response.getReturnValue());
            } else if (state === "ERROR") {
                let errors = response.getError();
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        console.log("Error message: " + errors[0].message);
                    }
                } else {
                    console.log("Unknown error");
                }
            }
        });

        $A.enqueueAction(action);

        const mainContainer = component.find("mainContainer");
        $A.util.toggleClass(mainContainer, "color");

        const orderItems = component.find("orderItems");
        $A.util.toggleClass(orderItems, "hide");

        const elem = component.find("button").getElement();
        if (elem.innerHTML == "Show details") {
            elem.innerHTML = "Hide details";
        }
        else elem.innerHTML = "Show details";
    },

     redirect: function(component, event, helper){
         console.log('ENTER to redirect...');
         var component_target = event.currentTarget;
         var attribute = component_target.dataset.myvalue;
         console.log('attribute >>>> ' + attribute);

         let url = '/product/' + attribute;

         let urlEvent = $A.get("e.force:navigateToURL");
         urlEvent.setParams({
             "url": url,
         });

         urlEvent.fire();
     },

     createCase: function (component, event) {

         let orderNumber = component.get('v.order').OrderNumber;
         console.log('orderNumber >>> ' + orderNumber);

         let caseSubject = component.get('v.caseSubject');
         console.log('caseSubject >>> ' + caseSubject);

         let caseMessage = component.get('v.caseMessage');
         console.log('caseMessage >>> ' + caseMessage);

     },
})