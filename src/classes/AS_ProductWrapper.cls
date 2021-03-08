/**
 * Created by BRITENET on 08.03.2021.
 */

public with sharing class AS_ProductWrapper {

    @AuraEnabled public String Id;
    @AuraEnabled public String name;
    @AuraEnabled public Decimal price;
    @AuraEnabled public Id photoId;

}