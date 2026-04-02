// public with sharing class ObjectPicklistController {

//     // Returns all SObject API names and Labels using getGlobalDescribe().values()
//     @AuraEnabled(cacheable=true)
//     public static List<Map<String, String>> getAllObjects() {
//         List<Map<String, String>> objectList = new List<Map<String, String>>();

//         for (Schema.SObjectType o : Schema.getGlobalDescribe().values()) {
//             Schema.DescribeSObjectResult objResult = o.getDescribe();

//             Map<String, String> option = new Map<String, String>();
//             option.put('label', objResult.getLabel());      // Human-readable label
//             option.put('value', objResult.getName());       // API Name as value
//             objectList.add(option);
//         }

//         objectList.sort(new MapComparator());
//         return objectList;
//     }

//     // Returns all Picklist field API names for a given SObject
//     @AuraEnabled(cacheable=true)
//     public static List<Map<String, String>> getPicklistFields(String objectApiName) {
//         List<Map<String, String>> picklistFields = new List<Map<String, String>>();

//         if (String.isBlank(objectApiName)) {
//             return picklistFields;
//         }

//         Schema.SObjectType sObjType = Schema.getGlobalDescribe().get(objectApiName);

//         if (sObjType == null) {
//             return picklistFields;
//         }

//         Schema.DescribeSObjectResult objResult = sObjType.getDescribe();

//         for (Schema.SObjectField field : objResult.fields.getMap().values()) {
//             Schema.DescribeFieldResult fieldResult = field.getDescribe();

//             if (fieldResult.getType() == Schema.DisplayType.PICKLIST ||
//                 fieldResult.getType() == Schema.DisplayType.MULTIPICKLIST) {

//                 Map<String, String> option = new Map<String, String>();
//                 option.put('label', fieldResult.getName());   // API Name as label
//                 option.put('value', fieldResult.getName());   // API Name as value
//                 picklistFields.add(option);
//             }
//         }

//         picklistFields.sort(new MapComparator());
//         return picklistFields;
//     }

//     // Comparator to sort List<Map<String, String>> by 'label' key
//     private class MapComparator implements Comparator<Map<String, String>> {
//         public Integer compare(Map<String, String> a, Map<String, String> b) {
//             String labelA = a.get('label') ?? '';
//             String labelB = b.get('label') ?? '';
//             return labelA.compareTo(labelB);
//         }
//     }
// }
public with sharing class ObjectPicklistController {

    @AuraEnabled(cacheable=true)
    public static List<Map<String, String>> getAllObjects() {
        List<Map<String, String>> objectList = new List<Map<String, String>>();

        for (Schema.SObjectType o : Schema.getGlobalDescribe().values()) {
            Schema.DescribeSObjectResult objResult = o.getDescribe();

            // Filter: only show objects visible in Object Manager
            if (objResult.isQueryable() &&
                objResult.isCreateable() &&
                !objResult.isCustomSetting() &&
                objResult.getRecordTypeInfos().size() >= 0) {

                // Skip internal system objects by checking name patterns
                String apiName = objResult.getName();
                if (apiName.endsWith('Share') ||
                    apiName.endsWith('Feed') ||
                    apiName.endsWith('History') ||
                    apiName.endsWith('ChangeEvent') ||
                    apiName.endsWith('__mdt') ||
                    apiName.endsWith('__e') ||
                    apiName.endsWith('__b')) {
                    continue;
                }

                Map<String, String> option = new Map<String, String>();
                option.put('label', objResult.getLabel());
                option.put('value', objResult.getName());
                objectList.add(option);
            }
        }

        objectList.sort(new MapComparator());
        return objectList;
    }

    @AuraEnabled(cacheable=true)
    public static List<Map<String, String>> getPicklistFields(String objectApiName) {
        List<Map<String, String>> picklistFields = new List<Map<String, String>>();

        if (String.isBlank(objectApiName)) {
            return picklistFields;
        }

        Schema.SObjectType sObjType = Schema.getGlobalDescribe().get(objectApiName);

        if (sObjType == null) {
            return picklistFields;
        }

        Schema.DescribeSObjectResult objResult = sObjType.getDescribe();

        for (Schema.SObjectField field : objResult.fields.getMap().values()) {
            Schema.DescribeFieldResult fieldResult = field.getDescribe();

            if (fieldResult.getType() == Schema.DisplayType.PICKLIST ||
                fieldResult.getType() == Schema.DisplayType.MULTIPICKLIST) {

                Map<String, String> option = new Map<String, String>();
                option.put('label', fieldResult.getName());
                option.put('value', fieldResult.getName());
                picklistFields.add(option);
            }
        }

        picklistFields.sort(new MapComparator());
        return picklistFields;
    }

    private class MapComparator implements Comparator<Map<String, String>> {
        public Integer compare(Map<String, String> a, Map<String, String> b) {
            String labelA = a.get('label') ?? '';
            String labelB = b.get('label') ?? '';
            return labelA.compareTo(labelB);
        }
    }
}