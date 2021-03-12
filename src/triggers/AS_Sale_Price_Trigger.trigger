/**
 * Created by BRITENET on 12.03.2021.
 */

trigger AS_Sale_Price_Trigger on Product2 (before insert, before update) {
    for (Product2 prod : Trigger.new) {
        prod.Sale_Price__c = (prod.Price__c - (prod.Price__c*prod.Discount_Percent__c/100)).setScale(2);
    }
}