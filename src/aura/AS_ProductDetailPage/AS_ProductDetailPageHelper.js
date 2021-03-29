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

        $A.enqueueAction(action0);

        // LOAD PHOTO GALLERY
        let action = component.get("c.getProductPhotos");
        action.setParams({productId: productId});
        action.setCallback(this, function (response) {

            let state = response.getState();

            if (state === "SUCCESS") {
                component.set('v.pictures', response.getReturnValue());
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


    addToBasket: function (component, event, helper){

          console.log('ENTER addToBasket...');

          let productId = component.get("v.product").Id;
          let unitPrice = component.get("v.price");

          let action = component.get('c.addProductToBasket');

          action.setParams({
                productId: productId,
                unitPrice: unitPrice
          });

          action.setCallback(this, function (response) {

            console.log('RESPONSE >>>> ' + response.getState());
            let state = response.getState();

            if(state == "SUCCESS"){
               console.log('RESPONSE >>>> ' + response.getReturnValue());
            }

            if (state === "ERROR") {
                let errors = response.getError();
                console.log('ERROR aaa >>>>> ' + errors[0].message);

//                    var toastEvent = $A.get("e.force:showToast");
//                        toastEvent.setParams({
//                            title : 'Error',
//                            message: 'Message: ' + errors[0].message + '. Please contact your admin.',
//                            duration:' 5000',
//                            key: 'info_alt',
//                            type: 'error',
//                            mode: 'sticky'
//                        });
//                    toastEvent.fire();

                    let sendErrorToast = component.find('errorToast');
                    sendErrorToast.handleErrors(response.getError());
            }
           });

           $A.enqueueAction(action);


        // REDIRECT TO BASKET
        setTimeout(function(){

          let urlEvent = $A.get("e.force:navigateToURL");
          urlEvent.setParams({
              "url": "/basket",
          });

          urlEvent.fire();

        }, 500);





    },

})