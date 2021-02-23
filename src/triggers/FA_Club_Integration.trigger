trigger FA_Club_Integration on Club__c (after insert, after update, after delete) {
    FA_Trigger_Factory.createHandler(Club__c.sobjectType);
}