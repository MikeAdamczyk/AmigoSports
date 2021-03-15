({
    init: function (component, event, helper) {

        const productId = component.get("v.recordId");

        //GET PRODUCT PRICE
        let action0 = component.get("c.getProductPrice");
        action0.setParams({productId: productId});
        action0.setCallback(this, function (response) {

            let state = response.getState();

            if (state === "SUCCESS") {
                component.set('v.price', response.getReturnValue());
            } else if (state === "INCOMPLETE") {
                //todo do something
            } else if (state === "ERROR") {
                let errors = response.getError();
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        console.log("Error message: " +
                            errors[0].message);
                    }
                } else {
                    console.log("Unknown error");
                }
            }
        });

        $A.enqueueAction(action0);


        // LOAD PHOTO GALLERY
        let action = component.get("c.getProductPhotos");
        action.setParams({productId: productId});
        action.setCallback(this, function (response) {

            let state = response.getState();

            if (state === "SUCCESS") {
                component.set('v.pictures', response.getReturnValue());
            } else if (state === "INCOMPLETE") {
                //todo do something
            } else if (state === "ERROR") {
                let errors = response.getError();
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        console.log("Error message: " +
                            errors[0].message);
                    }
                } else {
                    console.log("Unknown error");
                }
            }
        });

        $A.enqueueAction(action);

        // SET MAIN PHOTO
        setTimeout(function(){

              let photoIds = component.get("v.pictures");
              let mainPhotoId = component.get("v.product").MainPhotoId__c;

              if(mainPhotoId != null){
                  component.set('v.mainPhoto', mainPhotoId);
              } else if (photoIds.length > 0){
                  component.set('v.mainPhoto', photoIds[0].photoId);
              } else {
                  component.set('v.mainPhoto', null);
              }

        }, 500);
    },

    onSelect: function (component, event, helper){
         var component_target = event.currentTarget;
         var attribute = component_target.dataset.myvalue;
         component.set("v.mainPhoto", attribute);
    },
})