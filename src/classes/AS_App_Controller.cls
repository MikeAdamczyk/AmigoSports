public with sharing class AS_App_Controller {

    @AuraEnabled
    public static List<AS_ProductWrapper> getPromotedProducts() {

        List <Product2> apparelProducts = new List<Product2>();
        List<AS_ProductWrapper> wrapperList = new List<AS_ProductWrapper>();

        try {
            apparelProducts = [
                    SELECT Id, Name, Price__c, MainPhotoId__c, Discount_Percent__c, Sale_Price__c
                    FROM Product2
                    WHERE IsPromoted__c = true
                    LIMIT 3
            ];

            for (Product2 prod : apparelProducts) {

                AS_ProductWrapper wrapper = new AS_ProductWrapper();
                wrapper.Id = prod.Id;
                wrapper.name = prod.Name;
                wrapper.price = prod.Price__c;

                List<ContentDocumentLink> photoLinks = [
                        SELECT ContentDocument.LatestPublishedVersionId
                        FROM ContentDocumentLink
                        WHERE LinkedEntityId = :prod.Id
                        LIMIT 1
                ];

                if (prod.Discount_Percent__c != null && prod.Discount_Percent__c > 0) {
                    wrapper.discount = prod.Discount_Percent__c;
                    wrapper.salePrice = prod.Sale_Price__c;
                }

                if (prod.MainPhotoId__c != null) {
                    wrapper.photoId = (Id) prod.MainPhotoId__c;
                } else if (photoLinks.size() > 0) {
                    wrapper.photoId = photoLinks[0].ContentDocument.LatestPublishedVersionId;
                }

                wrapperList.add(wrapper);
            }

        } catch (DmlException e) {
            System.debug('The following exception has occurred: ' + e.getMessage());
        }

        return wrapperList;
    }

    @AuraEnabled
    public static List<AS_ProductWrapper> searchProducts(String query, String division) {

        List <Product2> apparelProducts = new List<Product2>();
        List<AS_ProductWrapper> wrapperList = new List<AS_ProductWrapper>();

        String searchQuery;

        if (query != null) {

            if (division != null) {

                searchQuery = 'SELECT ID, Name, Price__c, MainPhotoId__c FROM Product2 WHERE' +
                        ' Name LIKE \'%' + query + '%\' AND Division__c = ' + '\'' + division + '\'';

                try {

                    apparelProducts = Database.query(searchQuery);

                    for (Product2 prod : apparelProducts) {

                        AS_ProductWrapper wrapper = new AS_ProductWrapper();
                        wrapper.Id = prod.Id;
                        wrapper.name = prod.Name;
                        wrapper.price = prod.Price__c;

                        List<ContentDocumentLink> photoLinks = [
                                SELECT ContentDocument.LatestPublishedVersionId
                                FROM ContentDocumentLink
                                WHERE LinkedEntityId = :prod.Id
                                LIMIT 1
                        ];

                        if (prod.MainPhotoId__c != null) {
                            wrapper.photoId = (Id) prod.MainPhotoId__c;
                        } else if (photoLinks.size() > 0) {
                            wrapper.photoId = photoLinks[0].ContentDocument.LatestPublishedVersionId;
                        }

                        wrapperList.add(wrapper);
                    }


                } catch (DmlException e) {
                    System.debug('The following exception has occurred: ' + e.getMessage());
                }

            } else {

                searchQuery = 'SELECT ID, Name, Price__c, MainPhotoId__c, Discount_Percent__c, Sale_Price__c FROM Product2 WHERE' +
                        ' Name LIKE \'%' + query + '%\'';
                try {

                    apparelProducts = Database.query(searchQuery);

                    for (Product2 prod : apparelProducts) {

                        AS_ProductWrapper wrapper = new AS_ProductWrapper();
                        wrapper.Id = prod.Id;
                        wrapper.name = prod.Name;
                        wrapper.price = prod.Price__c;

                        List<ContentDocumentLink> photoLinks = [
                                SELECT ContentDocument.LatestPublishedVersionId
                                FROM ContentDocumentLink
                                WHERE LinkedEntityId = :prod.Id
                                LIMIT 1
                        ];

                        if (prod.Discount_Percent__c != null && prod.Discount_Percent__c > 0) {
                            wrapper.discount = prod.Discount_Percent__c;
                            wrapper.salePrice = prod.Sale_Price__c;
                        }

                        if (prod.MainPhotoId__c != null) {
                            wrapper.photoId = (Id) prod.MainPhotoId__c;
                        } else if (photoLinks.size() > 0) {
                            wrapper.photoId = photoLinks[0].ContentDocument.LatestPublishedVersionId;
                        }

                        wrapperList.add(wrapper);
                    }

                } catch (DmlException e) {
                    System.debug('The following exception has occurred: ' + e.getMessage());
                }
            }
        } else {

            searchQuery = 'SELECT ID, Name, Price__c, MainPhotoId__c, Discount_Percent__c, Sale_Price__c FROM Product2 WHERE' +
                    ' Division__c = ' + '\'' + division + '\'';

            try {
                apparelProducts = Database.query(searchQuery);

                for (Product2 prod : apparelProducts) {

                    AS_ProductWrapper wrapper = new AS_ProductWrapper();
                    wrapper.Id = prod.Id;
                    wrapper.name = prod.Name;
                    wrapper.price = prod.Price__c;

                    List<ContentDocumentLink> photoLinks = [
                            SELECT ContentDocument.LatestPublishedVersionId
                            FROM ContentDocumentLink
                            WHERE LinkedEntityId = :prod.Id
                            LIMIT 1
                    ];

                    if (prod.Discount_Percent__c != null && prod.Discount_Percent__c > 0) {
                        wrapper.discount = prod.Discount_Percent__c;
                        wrapper.salePrice = prod.Sale_Price__c;
                    }

                    if (prod.MainPhotoId__c != null) {
                        wrapper.photoId = (Id) prod.MainPhotoId__c;
                    } else if (photoLinks.size() > 0) {
                        wrapper.photoId = photoLinks[0].ContentDocument.LatestPublishedVersionId;
                    }

                    wrapperList.add(wrapper);
                }

            } catch (DmlException e) {
                System.debug('The following exception has occurred: ' + e.getMessage());
            }
        }

        return wrapperList;
    }

    @AuraEnabled
    public static List<AS_ProductPhotoWrapper> getProductPhotos(String productId) {
        return AS_Product_Photo_Service.getProductPhotos(productId);
    }

    @AuraEnabled
    public static void setMainPhoto(String productId, String photoId) {
        AS_Product_Photo_Service.setMainPhoto(productId, photoId);
    }

    @AuraEnabled
    public static List<AS_ProductWrapper> getDiscountedProducts() {
        List <Product2> apparelProducts = new List<Product2>();
        List<AS_ProductWrapper> wrapperList = new List<AS_ProductWrapper>();

        try {
            apparelProducts = [
                    SELECT Id, Name, Price__c, MainPhotoId__c, Discount_Percent__c, Sale_Price__c
                    FROM Product2
                    WHERE Discount_Percent__c != null
            ];

            for (Product2 prod : apparelProducts) {

                AS_ProductWrapper wrapper = new AS_ProductWrapper();
                wrapper.Id = prod.Id;
                wrapper.name = prod.Name;
                wrapper.price = prod.Price__c;

                if (prod.Discount_Percent__c != null && prod.Discount_Percent__c > 0) {
                    wrapper.discount = prod.Discount_Percent__c;
                    wrapper.salePrice = prod.Sale_Price__c;
                }

                List<ContentDocumentLink> photoLinks = [
                        SELECT ContentDocument.LatestPublishedVersionId
                        FROM ContentDocumentLink
                        WHERE LinkedEntityId = :prod.Id
                        LIMIT 1
                ];

                if (prod.MainPhotoId__c != null) {
                    wrapper.photoId = (Id) prod.MainPhotoId__c;
                } else if (photoLinks.size() > 0) {
                    wrapper.photoId = photoLinks[0].ContentDocument.LatestPublishedVersionId;
                }

                wrapperList.add(wrapper);
            }

        } catch (DmlException e) {
            System.debug('The following exception has occurred: ' + e.getMessage());
        }

        return wrapperList;
    }
}