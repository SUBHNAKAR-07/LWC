public with sharing class FranchiseTileController {
    @AuraEnabled(cacheable=true)
    public static List<Map<String, String>> getTileData() {
        List<Map<String, String>> tiles = new List<Map<String, String>>();
        tiles.add(new Map<String, String>{'label' => 'Manage Coupons', 'url' => 'https://www.google.com'});
        tiles.add(new Map<String, String>{'label' => 'Manage Menu', 'url' => 'https://www.wikipedia.org'});
        tiles.add(new Map<String, String>{'label' => 'Request a variance', 'url' => 'https://www.bing.com'});
        tiles.add(new Map<String, String>{'label' => 'View Operational Assessments', 'url' => 'https://www.yahoo.com'});

        User curUser = [select Profile.Name from user where Id=: userInfo.getUserId()][0];
        if(curUser.Profile.Name!='System Administrator'){
            tiles.add(new Map<String, String>{'label' => 'Order Store Technology', 'url' => 'https://www.salesforce.com'});
            tiles.add(new Map<String, String>{'label' => 'View Criticals/Escalations', 'url' => 'https://www.reddit.com'});
            tiles.add(new Map<String, String>{'label' => 'Share a document', 'url' => 'https://www.dropbox.com'});
            tiles.add(new Map<String, String>{'label' => 'Track new store development', 'url' => 'https://www.linkedin.com'});
            tiles.add(new Map<String, String>{'label' => 'View stores for sale', 'url' => 'https://www.amazon.com'});
        }
        
       

        return tiles;
    }
}
