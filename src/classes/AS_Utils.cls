public with sharing class AS_Utils {

    public static String getCustomSettings(String csName) {

        FA_Settings__c csItem = FA_Settings__c.getInstance(csName);
        if (csItem == null) {
            return '';
        } else {
            return csItem.Value__c;
        }
    }
}