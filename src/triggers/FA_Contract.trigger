trigger FA_Contract on Contract__c (after delete, after insert, after undelete, after update, before delete, before insert, before update) {

    FA_Trigger_Factory.createHandler(Contract__c.sobjectType);

}


//    if (Trigger.isInsert || Trigger.isUpdate) {
//        String errorMessage = System.Label.Message_Wrong_Date_Range;
//
//        Set <String> newContractsClubIDs = new Set<String>();
//        Set <String> newContractsPlayersIDs = new Set<String>();
//
//        for (Contract__c contract : Trigger.new) {
//            String clubId = contract.Club__c;
//            String playerId = contract.Player__c;
//
//            newContractsClubIDs.add(clubId);
//            newContractsPlayersIDs.add(playerId);
//        }
//
//        List<Contract__c> playerAndClubCommonContracts = [
//                SELECT Id, Name, Club__c, Player__c, StartDate__c, EndDate__c
//                FROM Contract__c
//                WHERE Player__c IN :newContractsPlayersIDs AND Club__c IN :newContractsClubIDs
//        ];
//
//        for (Contract__c newOrUpdatedContract : Trigger.new) {
//
//            Date contractStartDate = newOrUpdatedContract.StartDate__c;
//            Date contractEndDate = newOrUpdatedContract.EndDate__c;
//
//            List<String> errorMessagesList = new List<String>();
//            errorMessagesList.add(errorMessage + '<br/>');
//
//            for (Contract__c contract : playerAndClubCommonContracts) {
//
//                if (newOrUpdatedContract.Player__c == contract.Player__c &&
//                        newOrUpdatedContract.Club__c == contract.Club__c &&
//                        newOrUpdatedContract.Id != contract.Id) {
//
//                    if (((contractStartDate <= contract.StartDate__c) && (contractEndDate >= contract.StartDate__c)) ||
//                            ((contractStartDate <= contract.EndDate__c) && (contractEndDate >= contract.EndDate__c)) ||
//                            ((contractStartDate >= contract.StartDate__c) && (contractEndDate <= contract.EndDate__c))) {
//
//                        errorMessagesList.add('Given contract will conflict: ' + contract.Name +
//                                ', Start date: ' + contract.StartDate__c.format() + ', End date: ' + contract.EndDate__c.format());
//                    }
//                }
//            }
//
//            if (errorMessagesList.size() > 1) {
//                String finalErrorMessage = String.join(errorMessagesList, '<br/>');
//                newOrUpdatedContract.addError(finalErrorMessage, false);
//            }
//        }
//    }