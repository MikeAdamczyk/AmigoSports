public without sharing class AS_PostToChatter {

    private static final String COLLABORATION_GROUP = 'Sales Department';

    @InvocableMethod
    public static void createNewPost(List<String> leadIds) {
        String publicGroupId = queryPublicGroupByName(COLLABORATION_GROUP);
        String instanceUrl = System.URL.getSalesforceBaseUrl().toExternalForm();
        List<FeedItem> postsItems = new List<FeedItem>();
        List<Lead> FindLeads = queryLeadById(leadIds);
        for (Lead leadRecord : FindLeads) {
            postsItems.add(new FeedItem(
                    body = setPostBody(leadRecord),
                    type = 'LinkPost',
                    linkUrl = instanceUrl + '/' + leadRecord.Id,
                    ParentId = publicGroupId,
                    Title = 'Go to lead ' + leadRecord.Name
            ));
        }
        upsert postsItems;
    }

    private static String setPostBody(Lead leadToChatter) {
        if (leadToChatter.LeadSource == 'Web'){
            System.debug('Wchodzi do ifa');
            return  ' created new lead from web survey: ' + leadToChatter.Name;
        }
        return leadToChatter.CreatedBy.Name + ' created new lead: ' + leadToChatter.Name;
    }

    private static List<Lead> queryLeadById(List<String> leadIds) {
        return [
                SELECT Id, Name, Status, Owner.Name, Company, CreatedDate, CreatedBy.Id, CreatedBy.Name, LeadSource
                FROM Lead
                WHERE Id IN :LeadIds
        ];
    }

    private static String queryPublicGroupByName(String groupName) {
        List<CollaborationGroup> ids = new List<CollaborationGroup>();
        ids = [
                SELECT Id
                FROM CollaborationGroup
                WHERE Name = :groupName
        ];
        return ids.isEmpty() ? null : ids[0].Id;
    }
}