({
    MB_ShowReviews: function (component, event, helper) {

        let id = event.getParam("id");
        console.log('SHOW ME id >>> ' + id);
        let context = event.getParam("context");
        console.log('SHOW ME context >>> ' + context);
        let display = event.getParam("display");
        console.log('SHOW ME display >>> ' + display);

        component.set("v.displayedSection", display);
        component.set("v.context", context);
        component.set("v.id", id);
        component.set("v.tabSelected", "one");
        console.log('review ' + id + ' ' + context);
    },

    MB_HideReview: function (component, event, helper) {
        let display = event.getParam("display");
        component.set("v.displayedSection", display);
        console.log('review closed');
    },

    onClick: function (component, event, helper) {
        let rev = $A.get("e.c:MB_GetReviewsEvent");
        rev.fire();
        console.log('after rev');
    },

    MB_ReviewAdded: function (component, event, helper) {
        component.set("v.tabSelected", "one");
    },
})