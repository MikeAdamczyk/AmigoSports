public with sharing class AS_App_Controller {

    @AuraEnabled
    public static List<Product2> getApparel(String gender) {

        List <Product2> apparelProducts = new List<Product2>();

        try {
            apparelProducts = [
                    SELECT Id, Name, Price__c
                    FROM Product2
                    WHERE Gender__c = :gender
            ];
        } catch (DmlException e) {
            System.debug('The following exception has occurred: ' + e.getMessage());

        }

        return apparelProducts;
    }

    @AuraEnabled
    public static List<Product2> getPromotedProducts() {

        List <Product2> apparelProducts = new List<Product2>();

        try {
            apparelProducts = [
                    SELECT Id, Name, Price__c
                    FROM Product2
                    WHERE IsPromoted__c = true
                    LIMIT 3
            ];
        } catch (DmlException e) {
            System.debug('The following exception has occurred: ' + e.getMessage());

        }

        return apparelProducts;
    }

}