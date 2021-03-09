({
    AS_Query: function (component, event, helper) {
          let context = event.getParam('context');
          component.set("v.context", context);
    },
})