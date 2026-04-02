List<Map<String, String>> objects = ObjectPicklistController.getAllObjects();
System.debug('Total Objects: ' + objects.size());
System.debug('First 3: ' + objects[0] + ' | ' + objects[1] + ' | ' + objects[2]);

// Test getPicklistFields with Account
List<Map<String, String>> fields = ObjectPicklistController.getPicklistFields('Account');
System.debug('Picklist Fields on Account: ' + fields.size());
for (Map<String, String> f : fields) {
    System.debug('Field: ' + f.get('label'));
}