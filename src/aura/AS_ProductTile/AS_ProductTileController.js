({
        doInit : function(component, event, helper) {
            var AmigoPhotoLink = $A.get('$Label.c.AmigoPhotoLink');
            console.log('AmigoPhotoLink >>>>>> ' + AmigoPhotoLink);
            component.set('v.AmigoPhotoLink', AmigoPhotoLink);
        }
})