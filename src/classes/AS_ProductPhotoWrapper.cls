/**
 * Created by BRITENET on 10.03.2021.
 */

public with sharing class AS_ProductPhotoWrapper {
    @AuraEnabled public Id photoId;

    public AS_ProductPhotoWrapper(Id photoId){
        this.photoId = photoId;
    }
}