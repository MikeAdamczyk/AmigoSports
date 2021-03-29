public with sharing class AS_UserService {

    public static String getLoggedUserContactId() {
        Id userId = UserInfo.getUserId();
        System.debug('THIS IS userId >>>>>>>> ' + userId);
        Id loggedUserId = [SELECT ContactId FROM User WHERE Id = :userId LIMIT 1].ContactId;
        System.debug('loggedUserId (ContactId) >>>>>>>> ' + loggedUserId);
//        return loggedUserId;
        return '00309000007mKxUAAU';
    }
}