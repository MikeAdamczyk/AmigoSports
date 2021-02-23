({
        onSelect: function (component, event, helper) {

            let actorId = component.get("v.person").id;
            let action = $A.get("e.c:MB_Person_Selected_Event");
            action.setParams({
                "actorId": actorId,
                "display": 'personDetails',
            });
            action.fire();
        },

})