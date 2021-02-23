({
    MB_ShowReviews : function(component,event,handler){

//        let id = event.getParam("id");

        let movieId = component.get("v.movieId");

        let display = event.getParam("display");

                let getReviews = component.get("c.getReviews");

                getReviews.setParams({
                      objectId: movieId,
                });

                getReviews.setCallback( this, function( response ) {

                     if ( component.isValid() && response.getState() === 'SUCCESS' ) {

                        component.set("v.MovieReviews", response.getReturnValue());

                        console.log(response.getReturnValue());



                        let sum = 0;
                        for (var i = 0; i < response.getReturnValue().length; i++) {
                        sum += response.getReturnValue()[i].Rating__c;
                        }
                        console.log('suma -> ' + sum);
                        let passReview = $A.get("e.c:MB_PassAverageReviews");
                                passReview.setParams({
                                    "count": response.getReturnValue().length,
                                    "sum": sum
                                });
                                passReview.fire();
                        } else {
                                 component.find("toastCmp").showToastModel(response.getError()[0].message, "error");
                               }
                });

                $A.enqueueAction(getReviews);
         },
})