/**
 * Created by BRITENET on 07.03.2021.
 */

trigger ContentDocumentLinkTrigger on ContentDocumentLink (before insert) {

    for (ContentDocumentLink l : Trigger.new) {
        l.Visibility = 'AllUsers';
    }

}