public with sharing class KnowledgeArticleController {
    @AuraEnabled(cacheable=true)
    public static List<Knowledge__kav> getPublishedArticles() {
        return [SELECT Id, Question__c, Answer__c, LastPublishedDate
                FROM Knowledge__kav
                WHERE PublishStatus = 'Online'
                AND Language = 'en_US'
                ORDER BY LastPublishedDate DESC
                LIMIT 5];
    }
}
 
