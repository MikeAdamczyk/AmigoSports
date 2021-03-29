({
    init: function(component, event, helper){
          helper.init(component, event, helper);
    },

    check: function(component, event, helper){
          helper.check(component, event, helper);
    },

    redirect: function(component, event, helper){
          helper.redirect(component, event, helper);
    },

    makeComplaint: function(component, event, helper){
          component.set('v.showComplaintModal', true);
    },

    closeModal: function (component, event) {
          component.set('v.showComplaintModal', false);
    },

    createCase: function (component, event, helper) {
          helper.createCase(component, event);
          component.set('v.showComplaintModal', false);
    }
})