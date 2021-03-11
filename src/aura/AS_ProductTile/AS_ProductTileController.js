({
        doInit : function(component, event, helper) {
            var AmigoPhotoLink = $A.get('$Label.c.AmigoPhotoLink');
            console.log('AmigoPhotoLink >>>>>> ' + AmigoPhotoLink);
            component.set('v.AmigoPhotoLink', AmigoPhotoLink);
        },


        onSelect: function(component, event, helper) {

            let productId = component.get("v.product").Id;
            let url = '/product/' + productId;
            console.log('~~~~~~~~ PROD. ID >>> ' + productId);

            var urlEvent = $A.get("e.force:navigateToURL");
            urlEvent.setParams({
                "url": url,
            });

            urlEvent.fire();
        }
})