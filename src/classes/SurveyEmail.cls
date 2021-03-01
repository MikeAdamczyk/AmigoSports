public class SurveyEmail {   
	
    public static void sendEmail(String emailAddress){
        
        List<String> emailRecipientList = new List<String>();
        Messaging.SingleEmailMessage email = new Messaging.SingleEmailMessage();

        emailRecipientList.add(emailAddress);
        System.debug(emailRecipientList);

        email.setToAddresses(emailRecipientList);
        email.setSubject('Service Survey');
        email.setPlainTextBody('Test');
        Messaging.sendEmail(new Messaging.SingleEmailMessage[]{
                email
        });
    }
}