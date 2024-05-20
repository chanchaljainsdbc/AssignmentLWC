public with sharing class ContactController {
    @AuraEnabled
    public static Map<String,String> createContactRecord(Contact contact) 
    {
        Map<String, String> con=new Map<String,String>();
        try{

            insert contact;
            List<Account> acc=[SELECT Id,Name from Account WHERE Id=:contact.AccountId LIMIT 1];
                con.put('conId',contact.Id);
                con.put('accId',contact.AccountId);
                con.put('firstName',contact.FirstName);
                con.put('lastname',contact.LastName);
                con.put('accName',acc[0].Name);
                con.put('phone',contact.phone);
                con.put('email',contact.Email);
            
            return con;
        } catch (Exception e)
        {
            throw new AuraHandledException(e.getMessage());
        }
    }
}