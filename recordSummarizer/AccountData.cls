public with sharing class AccountData {
    @AuraEnabled(cacheable=true)
    public static Account getAccData(Id accountId) {//Here the return type is account as we return details of a single account whose acc id i give as a paramenter. 
        return [SELECT Id, Name, AccountNumber, Type, Industry, AnnualRevenue, Phone, Website, 
                BillingAddress, ShippingAddress, Owner.Name, Rating, NumberOfEmployees, 
                CreatedDate FROM Account WHERE Id = :accountId LIMIT 1];
    }
}