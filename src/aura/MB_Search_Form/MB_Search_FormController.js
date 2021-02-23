({

     handleClick : function (component, event) {

         console.log('BUTTON CLICK >>> ' + event.getSource().get("v.label").toLowerCase());

         component.set("v.context", event.getSource().get("v.label").toLowerCase());

          let searchEvent = $A.get("e.c:MB_Query");
                searchEvent.setParams({
                   "context" : event.getSource().get("v.label").toLowerCase(),
                   "display" : event.getSource().get("v.label").toLowerCase(),
            });
          searchEvent.fire();

//         alert("You clicked: " + event.getSource().get("v.label"));

     },


    handleKeyUp: function (component, event) {
        component.set('v.issearching', true);

        var query = component.find('enter-search').get('v.value');
        var context = component.get("v.context");
        console.log('CONTEXT ==> ' + context);

        if( query == ""){
            let searchEvent = $A.get("e.c:MB_Query");
                searchEvent.setParams({
                   "display" : context,
            });
            searchEvent.fire();
        }

        if (query != "") {

            let searchEvent = $A.get("e.c:MB_Query");
            searchEvent.setParams({
                "query" : query,
                "display" : context,
            });
            searchEvent.fire();
            component.set('v.issearching', false);
        } else {

//            let toastEvent = $A.get("e.force:showToast");
//            toastEvent.setParams({
//                "type": "info",
//                "message": "Query is required"
//            });
//            toastEvent.fire();
            component.set('v.issearching', false);
        }




//        if (isEnterKey) {
//            cmp.set('v.issearching', true);
//            setTimeout(function() {
//                alert('Searched for "' + queryTerm + '"!');
//                cmp.set('v.issearching', false);
//            }, 2000);
//        }
    },



})