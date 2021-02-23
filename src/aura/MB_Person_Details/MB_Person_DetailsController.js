({
        MB_Person_Selected_Event : function (component, event, handler) {

          let actorId = event.getParam('actorId');
          console.log('ACTOR ID >>> ' + actorId);
          let display = event.getParam('display');
          console.log('ACTOR ID >>> ' + display);

          //GET PERSON DETAILS
          let action = component.get('c.getActorDetails');
          action.setParams({
              "actorId" : actorId
          });
          action.setCallback(this, function (response) {
                  if (component.isValid() && response.getState() === 'SUCCESS') {
                      console.log('<<< PERSON DETAILS >>>');
                      console.log(response.getReturnValue());

                      console.log('<<< NAME >>>');
                      console.log(response.getReturnValue().name);

                      component.set("v.person", response.getReturnValue());
                  }
              });
          $A.enqueueAction(action);


          //GET PERSON FILMOGRAPHY
          let action2 = component.get('c.getActorFilmography');

          action2.setParams({
             "actorId" : actorId
          });

          action2.setCallback(this, function (response) {
                if (component.isValid() && response.getState() === 'SUCCESS') {

                    console.log('<<< FILMOGRAPHY >>>');
                    console.log(response.getReturnValue());

                    component.set("v.movies", response.getReturnValue());
                }
          });

          $A.enqueueAction(action2);

        },

})