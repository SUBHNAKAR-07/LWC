public with sharing class FranchiseTileController {
    @AuraEnabled(cacheable=true)
    public static List<Map<String, String>> getTileData() {
        List<Map<String, String>> tiles = new List<Map<String, String>>();

        // Default tiles for all users
        tiles.add(new Map<String, String>{'label' => 'Manage Coupons', 'url' => 'https://www.google.com'});
        tiles.add(new Map<String, String>{'label' => 'Manage Menu', 'url' => 'https://www.wikipedia.org'});
        tiles.add(new Map<String, String>{'label' => 'Request a variance', 'url' => 'https://www.bing.com'});
        tiles.add(new Map<String, String>{'label' => 'View Operational Assessments', 'url' => 'https://www.yahoo.com'});

        // Check if the current user has the permission set assigned
        Id currentUserId = UserInfo.getUserId();
        Id permissionSetId = '0PSdL00000D2fKY'; // Your Permission Set ID

        List<PermissionSetAssignment> psaList = [
            SELECT Id
            FROM PermissionSetAssignment
            WHERE AssigneeId = :currentUserId
            AND PermissionSetId = :permissionSetId
        ];

        // If the user has the permission set, add additional tiles
        if (!psaList.isEmpty()) {
            tiles.add(new Map<String, String>{'label' => 'Order Store Technology', 'url' => 'https://www.salesforce.com'});
            tiles.add(new Map<String, String>{'label' => 'View Criticals/Escalations', 'url' => 'https://www.reddit.com'});
            tiles.add(new Map<String, String>{'label' => 'Share a document', 'url' => 'https://www.dropbox.com'});
            tiles.add(new Map<String, String>{'label' => 'Track new store development', 'url' => 'https://www.linkedin.com'});
            tiles.add(new Map<String, String>{'label' => 'View stores for sale', 'url' => 'https://www.amazon.com'});
        }

        return tiles;
    }
}



/*
Instead of hardcoding the Permission Set ID (0PSdL00000D2fKY), you can also fetch it dynamically like this:
Id permissionSetId = [SELECT Id FROM PermissionSet WHERE Name = 'Franchise_Tile_Access' LIMIT 1].Id;
*/

