({



    MB_Movie_Selected_Event : function (component, event, handler) {
             let movieId = event.getParam('movieId');
             console.log('@@@@@@@@@@@@@@@@@@@ ADD REVIEW movieId ' + movieId);
             component.set("v.movieId", movieId);
    },

    doInit: function(component, event, helper) {
          //debugger
          helper.onInit(component, event,helper);
    },



    onSave : function(component, event, helper) {
           // debugger

    		let movieId = component.get("v.movieId");
//            let context = component.get("v.context");

            console.log('SHOW ME Id $$$$$$$$ ' + movieId);

            component.set("v.boatReview.Id__c", movieId);

//            component.set("v.boatReview.Type__c", context);

            component.find("service").saveRecord(function(saveResult){

                if(saveResult.state==="SUCCESS" || saveResult.state === "DRAFT") {

                    // SHOW REVIES
                    let showReviews = $A.get("e.c:MB_ShowReviews");
                        showReviews.setParams({
                        "movieId": movieId,
                        "display": 'movieDetails',
                        "context": 'movies'
                    });
                    showReviews.fire();



                   // FIRE TOAST
                   let resultsToast = $A.get("e.force:showToast");
                    if(resultsToast) {
                        resultsToast.setParams({
                            "title": "Success",
                            "message": "Review has been added. Thank you :)",
                            type: 'success',
                        });
                        resultsToast.fire();

                    } else {
                        alert( 'Review Created');
                    }

                } else if (saveResult.state === "ERROR") {

                    let errMsg='';
                    console.log('Problem saving record, error: ' + JSON.stringify(saveResult.error));
                    for (let i = 0; i < saveResult.error.length; i++) {
                        errMsg += saveResult.error[i].message + "\n";
                    }
                    component.set("v.recordError", errMsg);

                } else {
                    console.log('Unknown problem, state: ' + saveResult.state + ', error: ' + JSON.stringify(saveResult.error));
                }


                helper.onInit(component,event,helper);

                component.set("v.boatReview.Rating__c", 0);
                component.set("v.rating", false);
                component.set("v.rating", true);

            });
    	},
        onRecordUpdated: function(component, event, helper) {
        }
})