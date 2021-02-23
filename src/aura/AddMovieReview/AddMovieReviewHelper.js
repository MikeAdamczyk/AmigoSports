({
    onInit : function(component, event,helper) {
    		component.find("service").getNewRecord(
                "Review__c", // sObject type (entityAPIName)
                null,      // recordTypeId
                false,     // skip cache?
                $A.getCallback(function() {
                    let rec = component.get("v.boatReview");
                    let error = component.get("v.recordError");
//                    let boat = component.get("v.id");
//                    let context = component.get("v.context");
                    if(error || (rec === null)) {
                        console.log("Error initializing record template: " + error);
                    }
                    else {
                        component.set("v.boatReview.Rating__c", 0);
                   /*     component.set("v.boatReview.Id__c",Id);
                        component.set("v.boatReview.Type__c",context);
                       // debugger*/
                        let test=component.get("v.boatReview");
                    }
                })
            );
    	},
})