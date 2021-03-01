global class GoogleSSO implements Auth.RegistrationHandler {

    private User createUser(Auth.UserData data, Contact contact, Boolean isCommunity) {
        User user = new User();
        Profile profile;
        String alias;
        if (isCommunity) {
            profile = [SELECT Id FROM profile WHERE name = 'Amigo Community User'];
            user.username = data.email + '@amigo.com';
            user.contactId = contact.Id;
            alias = data.firstName + data.lastName;
        } else {
            profile = [SELECT Id FROM profile WHERE name = 'Amigo Community User'];
            user.username = data.username + '@amigo.com';
            alias = data.username;
        }
        user.email = data.email;
        user.lastName = data.lastName;
        user.firstName = data.firstName;
        user.alias = alias.length() > 8 ? alias.substring(0, 8) : alias;
        user.languagelocalekey = UserInfo.getLanguage();
        user.localesidkey = UserInfo.getLocale();
        user.emailEncodingKey = 'UTF-8';
        user.timeZoneSidKey = 'Europe/Dublin';
        user.profileId = profile.Id;
        return user;
    }

    global User createUser(Id portalId, Auth.UserData data) {
        if (data.attributeMap.containsKey('sfdc_networkid')) {
            Account a = [SELECT Id FROM account WHERE name = 'Google Email'];
            Contact c = new Contact();
            c.accountId = a.Id;
            c.email = data.email;
            c.firstName = data.firstName;
            c.lastName = data.lastName;

            try {
                insert(c);
            } catch (Exception e) {
                System.debug('INSERT ERROR: ' + e.getMessage());
            }

            return createUser(data, c, true);

        } else {

            return createUser(data, null, false);
        }
    }

    global void updateUser(Id userId, Id portalId, Auth.UserData data) {
        User u = new User(id = userId);
        u.email = data.email;
        u.lastName = data.lastName;
        u.firstName = data.firstName;

        update(u);
    }
}