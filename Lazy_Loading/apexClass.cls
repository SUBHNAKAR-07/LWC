public with sharing class LazyLoadingController {
    @AuraEnabled(cacheable=true)//Method1 
    public static List<Escalation__c> loadDataById(){//We are writing this 
        return [
            Select Id, Name, Store__c, Type__c, Market__c, Status__c, Created_Data__c
            From Escalation__c
            ORDER BY Name,Id
            LIMIT 10
        ];
    }

    @AuraEnabled(cacheable=true)
    public static List<Escalation__c> LoadMoreData(String lastName, String lastId){
        return [
            Select Id, Name, Store__c, Type__c, Market__c, Status__c, Created_Data__c
            From Escalation__c
            where (Name > :lastName) OR (Name = :lastName AND Id > :lastId)
            ORDER BY Name,Id
            LIMIT 10
        ];
    }

    @AuraEnabled(cacheable=true)
    public static Integer countOfAccounts(){
        AggregateResult agr  = [select count(Id) recordCount from Escalation__c];
        return (Integer)agr.get('recordCount'); // .get always returns object so we do the typecast to Integer.
        
    }
    
}
