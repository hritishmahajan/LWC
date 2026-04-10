public with sharing class AccountPaginationController {
    @AuraEnabled(cacheable=true)
    public static List<Account> getAllAccounts() {
        return [
            SELECT Id, Name, Industry, Phone, BillingCity, AnnualRevenue
            FROM Account
            ORDER BY Name ASC
            LIMIT 2000
        ];
    }
}