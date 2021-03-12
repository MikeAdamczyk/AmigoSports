({
      doInit : function(component, event, helper) {
            let AmigoPhotoLink = $A.get('$Label.c.AmigoPhotoLink');
            component.set('v.AmigoPhotoLink', AmigoPhotoLink);
      },

      onSelect: function(component, event, helper) {

          let productId = component.get("v.product").Id;
          let url = '/product/' + productId;

          let urlEvent = $A.get("e.force:navigateToURL");
          urlEvent.setParams({
              "url": url,
          });

          urlEvent.fire();
      }
})