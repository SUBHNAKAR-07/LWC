public with sharing class FranchiseTileController {
    @AuraEnabled(cacheable=true)
    public static List<Map<String, String>> getTileData() {
        List<Map<String, String>> tiles = new List<Map<String, String>>();

        // Get current user profile
        String profileName = [SELECT Profile.Name FROM User WHERE Id = :UserInfo.getUserId()].Profile.Name;

        // Query all custom metadata records
        List<Franchise_Tile_Access__mdt> allTiles = [SELECT Tile_Label__c, URL__c, Allowed_Profiles__c FROM Franchise_Tile_Access__mdt];

        for (Franchise_Tile_Access__mdt tile : allTiles) {
            if (tile.Allowed_Profiles__c != null && tile.Allowed_Profiles__c.contains(profileName)) {
                tiles.add(new Map<String, String>{
                    'label' => tile.Tile_Label__c,
                    'url' => tile.URL__c
                });
            }
        }

        return tiles;
    }
}
