({
        init: function (component, event, helper) {

            let action = component.get("c.getProductPhotos");
            action.setParams({productId: component.get("v.recordId")});
            action.setCallback(this, function (response) {

                let state = response.getState();

                if (state === "SUCCESS") {
                    console.log('PICTURES >>> ' + response.getReturnValue());
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


            setTimeout(function(){
                let mainPhotoId = component.get("v.product").MainPhotoId__c;
                if(mainPhotoId != null){
                   component.set('v.mainPhoto', mainPhotoId);
                }
            }, 500);


        },

        onSelect: function (component, event, helper){

             var component_target = event.currentTarget;
             var attribute = component_target.dataset.myvalue;

             let action = component.get("c.setMainPhoto");

             action.setParams({
                 productId: component.get("v.recordId"),
                 photoId :   attribute,
             });

             action.setCallback(this, function (response) {

                 let state = response.getState();

                 if (state === "SUCCESS") {
                     component.set("v.mainPhoto", attribute);
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
        },
})