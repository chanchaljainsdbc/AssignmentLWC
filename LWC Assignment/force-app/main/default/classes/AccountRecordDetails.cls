public with sharing class AccountRecordDetails {
    @AuraEnabled(cacheable=true)
    public static List<Account> getAccounts() {
        return [SELECT Id, Name FROM Account Where Id NOT IN (SELECT AccountId FROM Contact) LIMIT 30];
    }

}