public with sharing class AS_App_Controller {

    @AuraEnabled
    public static Decimal getProductPrice(Id productId) {

        Id standardPriceBookId = [SELECT Id, Name FROM Pricebook2 WHERE Name = 'Standard Price Book'].Id;
        Decimal productPrice = [SELECT UnitPrice FROM PricebookEntry WHERE Pricebook2Id = :standardPriceBookId AND Product2Id = :productId].UnitPrice;

        return productPrice;
    }

    @AuraEnabled
    public static List<AS_ProductWrapper> getPromotedProducts() {

        List <Product2> apparelProducts = new List<Product2>();
        List<AS_ProductWrapper> wrapperList = new List<AS_ProductWrapper>();
        List<Id> productsIds = new List<Id>();


        try {
            apparelProducts = [
                    SELECT Id, Name, MainPhotoId__c
                    FROM Product2
                    WHERE IsPromoted__c = true
                    LIMIT 3
            ];

            for (Product2 product2 : apparelProducts) {
                productsIds.add(product2.Id);
            }

            Id standardPriceBookId = [SELECT Id, Name FROM Pricebook2 WHERE Name = 'Standard Price Book'].Id;

            List<PricebookEntry> pricebookEntries = new List<PricebookEntry>();
            pricebookEntries = [SELECT Id, Name, UnitPrice, Product2Id FROM PricebookEntry WHERE Pricebook2Id = :standardPriceBookId AND Product2Id IN :productsIds];

            Map<Id, Decimal> productsPricesMap = new Map<Id, Decimal>();

            for (PricebookEntry entry : pricebookEntries) {
                productsPricesMap.put(entry.Product2Id, entry.UnitPrice);
            }

            for (Product2 prod : apparelProducts) {

                Decimal productPrice;

                if (productsPricesMap.ContainsKey(prod.Id)) {
                    productPrice = productsPricesMap.get(prod.Id);
                }

                AS_ProductWrapper wrapper = new AS_ProductWrapper();
                wrapper.Id = prod.Id;
                wrapper.name = prod.Name;

                if (productPrice != null) {
                    wrapper.price = productPrice;
                }

                List<ContentDocumentLink> photoLinks = [
                        SELECT ContentDocument.LatestPublishedVersionId
                        FROM ContentDocumentLink
                        WHERE LinkedEntityId = :prod.Id
                        LIMIT 1
                ];

//                if (prod.Discount_Percent__c != null && prod.Discount_Percent__c > 0) {
//                    wrapper.discount = prod.Discount_Percent__c;
//                    wrapper.salePrice = prod.Sale_Price__c;
//                }

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
        List<Id> productsIds = new List<Id>();


        String searchQuery;

        if (query != null) {

            searchQuery = 'SELECT ID, Name, MainPhotoId__c FROM Product2 WHERE' +
                    ' Name LIKE \'%' + query + '%\'';
            try {

                apparelProducts = Database.query(searchQuery);

                for (Product2 product2 : apparelProducts) {
                    productsIds.add(product2.Id);
                }

                Id standardPriceBookId = [SELECT Id, Name FROM Pricebook2 WHERE Name = 'Standard Price Book'].Id;

                List<PricebookEntry> pricebookEntries = new List<PricebookEntry>();
                pricebookEntries = [SELECT Id, Name, UnitPrice, Product2Id FROM PricebookEntry WHERE Pricebook2Id = :standardPriceBookId AND Product2Id IN :productsIds];

                Map<Id, Decimal> productsPricesMap = new Map<Id, Decimal>();

                for (PricebookEntry entry : pricebookEntries) {
                    productsPricesMap.put(entry.Product2Id, entry.UnitPrice);
                }


                for (Product2 prod : apparelProducts) {

                    Decimal productPrice;

                    if (productsPricesMap.ContainsKey(prod.Id)) {
                        productPrice = productsPricesMap.get(prod.Id);
                    }


                    AS_ProductWrapper wrapper = new AS_ProductWrapper();
                    wrapper.Id = prod.Id;
                    wrapper.name = prod.Name;

                    if (productPrice != null) {
                        wrapper.price = productPrice;
                    }

                    List<ContentDocumentLink> photoLinks = [
                            SELECT ContentDocument.LatestPublishedVersionId
                            FROM ContentDocumentLink
                            WHERE LinkedEntityId = :prod.Id
                            LIMIT 1
                    ];

//                    if (prod.Discount_Percent__c != null && prod.Discount_Percent__c > 0) {
//                        wrapper.discount = prod.Discount_Percent__c;
//                        wrapper.salePrice = prod.Sale_Price__c;
//                    }

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

            searchQuery = 'SELECT ID, Name, MainPhotoId__c FROM Product2 WHERE' +
                    ' Division__c = ' + '\'' + division + '\'';

            try {
                apparelProducts = Database.query(searchQuery);

                for (Product2 product2 : apparelProducts) {
                    productsIds.add(product2.Id);
                }

                Id standardPriceBookId = [SELECT Id, Name FROM Pricebook2 WHERE Name = 'Standard Price Book'].Id;

                List<PricebookEntry> pricebookEntries = new List<PricebookEntry>();
                pricebookEntries = [SELECT Id, Name, UnitPrice, Product2Id FROM PricebookEntry WHERE Pricebook2Id = :standardPriceBookId AND Product2Id IN :productsIds];

                Map<Id, Decimal> productsPricesMap = new Map<Id, Decimal>();

                for (PricebookEntry entry : pricebookEntries) {
                    productsPricesMap.put(entry.Product2Id, entry.UnitPrice);
                }

                for (Product2 prod : apparelProducts) {

                    Decimal productPrice;

                    if (productsPricesMap.ContainsKey(prod.Id)) {
                        productPrice = productsPricesMap.get(prod.Id);
                    }

                    AS_ProductWrapper wrapper = new AS_ProductWrapper();
                    wrapper.Id = prod.Id;
                    wrapper.name = prod.Name;

                    if (productPrice != null) {
                        wrapper.price = productPrice;
                    }

                    List<ContentDocumentLink> photoLinks = [
                            SELECT ContentDocument.LatestPublishedVersionId
                            FROM ContentDocumentLink
                            WHERE LinkedEntityId = :prod.Id
                            LIMIT 1
                    ];

//                    if (prod.Discount_Percent__c != null && prod.Discount_Percent__c > 0) {
//                        wrapper.discount = prod.Discount_Percent__c;
//                        wrapper.salePrice = prod.Sale_Price__c;
//                    }

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
                    SELECT Id, Name, MainPhotoId__c
                    FROM Product2
                    WHERE Discount_Percent__c != null
            ];

            for (Product2 prod : apparelProducts) {

                AS_ProductWrapper wrapper = new AS_ProductWrapper();
                wrapper.Id = prod.Id;
                wrapper.name = prod.Name;
//                wrapper.price = prod.Price__c;

//                if (prod.Discount_Percent__c != null && prod.Discount_Percent__c > 0) {
//                    wrapper.discount = prod.Discount_Percent__c;
//                    wrapper.salePrice = prod.Sale_Price__c;
//                }

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