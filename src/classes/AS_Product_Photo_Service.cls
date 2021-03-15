/**
 * Created by BRITENET on 10.03.2021.
 */

public with sharing class AS_Product_Photo_Service {

    @AuraEnabled
    public static List<AS_ProductPhotoWrapper> getProductPhotos(String productId) {

        List<AS_ProductPhotoWrapper> wrapperList = new List<AS_ProductPhotoWrapper>();

        List<ContentDocumentLink> photoLinks = [
                SELECT ContentDocument.LatestPublishedVersionId
                FROM ContentDocumentLink
                WHERE LinkedEntityId = :productId
        ];

        if (photoLinks.size() > 0) {
            for (ContentDocumentLink doc : photoLinks) {
                wrapperList.add(new AS_ProductPhotoWrapper(doc.ContentDocument.LatestPublishedVersionId));
            }
        }

        System.debug('>>>>>>>> PRODUCT PHOTOS LIST >>>>>>> ' + wrapperList);

        return wrapperList;
    }

    @AuraEnabled
    public static void setMainPhoto(String productId, String photoId){
        Product2 productToUpdate = new Product2(Id=productId, MainPhotoId__c =photoId );
        upsert productToUpdate;
    }

}