({
    doInit: function (component, event, helper) {

        // GET POPULAR MOVIES
        let action = component.get("c.getPopularMovies");

        action.setCallback(this, function (response) {
            if (component.isValid() && response.getState() === 'SUCCESS') {
                console.log('POPULAR MOVIES JS CONTROLLER');
                console.log(response.getReturnValue());
                component.set("v.popularMovies", response.getReturnValue());
            }
        });
        $A.enqueueAction(action);

        // GET POPULAR PEOPLE
        let action2 = component.get("c.getPopularPeople");

        action2.setCallback(this, function (response) {
            if (component.isValid() && response.getState() === 'SUCCESS') {
                console.log('POPULAR PEOPLE JS CONTROLLER');
                console.log(response.getReturnValue());
                component.set("v.popularPeople", response.getReturnValue());
            }
        });
        $A.enqueueAction(action2);
    },

    MB_Query: function (component, event, helper) {

          let query = event.getParam('query');
          let display = event.getParam('display');

          component.set("v.displayedSection", display);
          component.set("v.query", query);

          // GET FAVORITES MOVIES
          if(query == undefined && display == 'favorite') {

              let action3 = component.get("c.getFavoriteMovies");
              action3.setCallback(this, function (response) {
                  if (component.isValid() && response.getState() === 'SUCCESS') {

                      component.set("v.favoriteMovies", response.getReturnValue());
                  }
              });

              $A.enqueueAction(action3);
          }

          // GET BLACKLISTED MOVIES
          if(query == undefined && display == 'blacklisted') {

                let action4 = component.get("c.getBlacklistedMovies");
                action4.setCallback(this, function (response) {
                    if (component.isValid() && response.getState() === 'SUCCESS') {

                        console.log('BLAAAAAAAAAAAK');
                        console.log(response.getReturnValue());

                        component.set("v.blacklistedMovies", response.getReturnValue());
                    }
                });

                $A.enqueueAction(action4);
          }



           // SEARCH FOR MOVIES
          if(query == undefined && display == 'movies'){

              let action = component.get("c.getPopularMovies");
              action.setCallback(this, function (response) {
                  if (component.isValid() && response.getState() === 'SUCCESS') {
                      component.set("v.popularMovies", response.getReturnValue());
                  }
              });

              $A.enqueueAction(action);

          } else {

              let action = component.get("c.searchMovies");
              action.setParams({
                  "query" : query,
                  "page" : 1
              });

              action.setCallback(this, function (response) {

                  if (component.isValid() && response.getState() === 'SUCCESS') {

                      if(response.getReturnValue().length == 0){

                          console.log('##### LENGTH is 0 !!!');


                          let action2 = component.get("c.getCustomMovies");
                          action2.setParams({
                              "query" : query,
                          });

                          action2.setCallback(this, function (response) {
                              if (component.isValid() && response.getState() === 'SUCCESS') {

                                  console.log('>>>> getCustomMovies lenght >>> ' + response.getReturnValue().length);
                                  console.log('>>>> getCustomMovies >>> ' + response.getReturnValue());
                                  console.log(response.getReturnValue());

                                  if(response.getReturnValue().length == 0){
                                      console.log('SET DISPLAY TO addMovie !!!')
                                      component.set("v.displayedSection", 'addMovie');
                                  }
                                  component.set("v.popularMovies", response.getReturnValue());
                              }
                          });

                          $A.enqueueAction(action2);

//                          component.set("v.displayedSection", 'addMovie');
                      }

                      component.set("v.popularMovies", response.getReturnValue());
                  }
              });

              $A.enqueueAction(action);
          }




          // SEARCH FOR PEOPLE
            if(query == undefined && display == 'people'){

                let action = component.get("c.getPopularPeople");
                action.setCallback(this, function (response) {
                    if (component.isValid() && response.getState() === 'SUCCESS') {
                        component.set("v.popularPeople", response.getReturnValue());
                    }
                });
                $A.enqueueAction(action);
            } else {

                let action = component.get("c.searchActors");
                action.setParams({
                    "query" : query,
                    "page" : 1
                });

                action.setCallback(this, function (response) {
                    if (component.isValid() && response.getState() === 'SUCCESS') {
                        component.set("v.popularPeople", response.getReturnValue());
                    }
                });
                $A.enqueueAction(action);
            }
      },

    refreshPage: function (component, event, helper){

          let display = component.get('v.displayedSection');
          let query = component.get('v.query');

          if(display == 'movies' && query == undefined){

              let action = component.get("c.getPopularMovies");

              action.setCallback(this, function (response) {
                  if (component.isValid() && response.getState() === 'SUCCESS') {
                      component.set("v.popularMovies", response.getReturnValue());
                  }
              });
              $A.enqueueAction(action);
          }
      },

    MB_Movie_Selected_Event: function(component, event, helper) {
            let display = event.getParam('display');

            component.set("v.displayedSection", display);
      },

    MB_Person_Selected_Event: function(component, event, helper) {
                  let display = event.getParam('display');

                  component.set("v.displayedSection", display);
       },

    handleMovieAdd : function (component, event, helper){

        let action = component.get("c.addNewMovie");

        action.setParams({
            title :  component.get("v.movie_title_add"),
            overview : component.get("v.movie_overview_add"),
            release_date : component.get("v.movie_release_date_add")
        });

        action.setCallback(this, function (response) {
            if (component.isValid() && response.getState() === 'SUCCESS') {
                console.log(response.getReturnValue());
            }else{console.log("Unknown error");}});

        $A.enqueueAction(action);


        let toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams({
        "title": "Success!",
        "message": "Movie submitted, once approved you'll be able to view it.",
            duration:' 7000',
                    key: 'info_alt',
                    type: 'success',
                    mode: 'dismissible'

        });
        toastEvent.fire();

        let searchEvent = $A.get("e.c:MB_Query");
        searchEvent.setParams({
            "query" : undefined,
            "display" : 'movies',
        });
        searchEvent.fire();

    },

})