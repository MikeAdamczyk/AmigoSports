({
        onSelect: function (component, event, helper) {

            let movieId = component.get("v.movie").id;

            console.log('____________ TILE ON SELECT movieId ' + movieId);

            let action = $A.get("e.c:MB_Movie_Selected_Event");
            action.setParams({
                "movieId": movieId,
                "display": 'moviesDetails',
            });
            action.fire();
        },
})