public with sharing class CouponController {
    @AuraEnabled(cacheable=true)
    public static List<Coupon_Template__c> getActiveCampaignCoupons() {
        return [
            SELECT Id, Name, Description__c, 
                   Opt_in_Option_1__c, Opt_in_Option_1_selection__c,
                   Opt_in_Option_2__c, Opt_in_Option_2_selection__c,
                   Coupon_Campaign__c, 
                   Coupon_Campaign__r.Name, 
                   Coupon_Campaign__r.Active__c
            FROM Coupon_Template__c
            WHERE Coupon_Campaign__r.Active__c = true
        ];
    }

    @AuraEnabled
    public static String updateSelectedCoupons(List<Coupon_Template__c> updatedCoupons) {
        try {
            if (updatedCoupons != null && !updatedCoupons.isEmpty()) {
                update updatedCoupons;
            }
            return 'updated';
        } catch (Exception e) {
            // Send a readable message to JS
            throw new AuraHandledException('Error while updating coupons: ' + e.getMessage());
        }
    }
}
