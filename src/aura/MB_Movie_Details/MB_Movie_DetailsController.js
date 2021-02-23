({
        MB_Movie_Selected_Event : function (component, event, handler) {

                 let movieId = event.getParam('movieId');
                 component.set("v.movieId", movieId);

                 let display = event.getParam('display');
                 component.set("v.displayedSection", display);


                 // GET REVIEWS
                 let action0 = component.get('c.getReviews');
                 action0.setParams({
                     "objectId" : movieId
                 });

                 action0.setCallback(this, function (response) {

                      if (component.isValid() && response.getState() === 'SUCCESS') {

                          let sum = 0;
                          let count = response.getReturnValue().length;

                          for (var i = 0; i < response.getReturnValue().length; i++) {
                                sum += response.getReturnValue()[i].Rating__c;
                          }

                          let vote_average = '--';
                          if(count > 0){
                             vote_average = (sum/count).toFixed(2);
                          }

                          console.log('VOTES AVARAGE >>> ' + vote_average);
                          console.log('VOTES NUMBER >>> ' + count);
                          component.set('v.vote_average', vote_average);
                          component.set('v.votesNumber', count);

                          component.set("v.reviews", response.getReturnValue());
                      }

                  });
                $A.enqueueAction(action0);


                   //GET MOVIE DETAILS
                     let action = component.get('c.getMovieDetails');
                     action.setParams({
                         "movieId" : movieId
                     });
                     action.setCallback(this, function (response) {
                             if (component.isValid() && response.getState() === 'SUCCESS') {

                                 console.log('<<< MOVIE DETAILS >>>');
                                 console.log(response.getReturnValue());

                                 component.set("v.movie", response.getReturnValue());
                             }
                         });
                     $A.enqueueAction(action);


//                if(movieId.length < 10) {
//
//                     //GET MOVIE DETAILS
//                     let action = component.get('c.getMovieDetails');
//                     action.setParams({
//                         "movieId" : movieId
//                     });
//                     action.setCallback(this, function (response) {
//                             if (component.isValid() && response.getState() === 'SUCCESS') {
//
//                                 console.log('<<< MOVIE DETAILS >>>');
//                                 console.log(response.getReturnValue());
//
//                                 component.set("v.movie", response.getReturnValue());
//                             }
//                         });
//                     $A.enqueueAction(action);
//
//                } else (
//
//                    console.log('SEARCH IN CUSTOM MOVIES DATABASE...')
//                )







          //GET MOVIE CAST
          let action2 = component.get('c.getMovieCast');
          action2.setParams({
              "movieId" : movieId
          });
          action2.setCallback(this, function (response) {
                  if (component.isValid() && response.getState() === 'SUCCESS') {
                      console.log('MOVIE CAST RESPONSE: ');
                      console.log(response.getReturnValue());
                      component.set("v.cast", response.getReturnValue());
                  }
              });
          $A.enqueueAction(action2);

        },

        // ADD TO FAVORITE
        addToFavorite: function (component, event, handler) {

            let movieId = component.get("v.movie").id;
            let fbtype = component.get("v.movie").fbtype;

            console.log('FAV ID >>> ' + movieId);
            console.log('FAV fbType >>> ' + fbtype);

            let addToFB = component.get("c.addToBFList");

            addToFB.setParams({
                movieId: movieId,
                fbtype: 'Favorite'
            });

            addToFB.setCallback(this, function (response) {
                if (component.isValid() && response.getState() === 'SUCCESS') {

                    if(fbtype == 'Favorite'){

                        component.set("v.movie.fbtype", null);

                    } else {
                    component.set("v.movie.fbtype", 'Favorite');
                    }
                        console.log(response.getReturnValue());
                } else {
                    //  component.find("toastCmp").showToastModel(response.getError()[0].message, "error");
                }
            });

            $A.enqueueAction(addToFB);
        },


        // ADD TO BLACK LIST
        addToBlacklist: function (component, event, handler) {

            let movieId = component.get("v.movie").id;
            let fbtype = component.get("v.movie").fbtype;

            console.log('FAV ID black >>> ' + movieId);
            console.log('FAV fbType black >>> ' + fbtype);

            let addToFB = component.get("c.addToBFList");
            addToFB.setParams({
                movieId: movieId,
                fbtype: 'Black List'
            });
            addToFB.setCallback(this, function (response) {
                if (component.isValid() && response.getState() === 'SUCCESS') {
                if(fbtype == 'Black List'){
                          component.set("v.movie.fbtype", null);

                    }else{
                    component.set("v.movie.fbtype", 'Black List');
                    }                console.log(response.getReturnValue());
                } else {
                    //  component.find("toastCmp").showToastModel(response.getError()[0].message, "error");
                }
            });
            $A.enqueueAction(addToFB);
        },


        MB_ShowReviews : function (component, event, handler) {

           let movieId = event.getParam('movieId');
           console.log('**************** INSIDE MMB_ShowReviews movieId >>> ' + movieId);

           // GET REVIEWS
           let action0 = component.get('c.getReviews');
           action0.setParams({
               "objectId" : movieId
           });

           action0.setCallback(this, function (response) {

                if (component.isValid() && response.getState() === 'SUCCESS') {

                  let sum = 0;
                  let count = response.getReturnValue().length;

                  for (var i = 0; i < response.getReturnValue().length; i++) {
                        sum += response.getReturnValue()[i].Rating__c;
                  }

                  let vote_average = '--';
                  if(count > 0){
                    vote_average = (sum/count).toFixed(2);
                  }

                  console.log('VOTES AVARAGE 2 >>> ' + vote_average);
                  console.log('VOTES NUMBER 2 >>> ' + count);
                  component.set('v.vote_average', vote_average);
                  component.set('v.votesNumber', count);

                  component.set("v.reviews", response.getReturnValue());

                }
            });

            $A.enqueueAction(action0);
        },

})