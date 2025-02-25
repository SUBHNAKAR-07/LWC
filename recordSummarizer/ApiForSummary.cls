public with sharing class ApiForSummary {
    private static final String ENDPOINT = 'https://api.groq.com/openai/v1/chat/completions';
    private static final String API_KEY_FIELD = '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';
    @AuraEnabled
    public static String getGroq(String Id) {
 
        Http http = new Http();
        HttpRequest request = new HttpRequest();
       
        request.setEndpoint(ENDPOINT);
        request.setMethod('POST');
        request.setHeader('Content-Type', 'application/json');
        request.setHeader('Authorization', 'Bearer ' + API_KEY_FIELD);
       
        Account acc = [SELECT Name,AccountNumber,Owner.Name,AccountSource,Phone,Website,AnnualRevenue,Industry,ShippingAddress,BillingAddress,Type,NumberOfEmployees FROM Account WHERE Id =:id];
        String prompt = 'Give Summary which only tells about account id, name , Annual Revenue, Employees and industry. Make it short. ' + JSON.serialize(acc);
 
        Map<String, Object> message = new Map<String, Object>();
        message.put('role', 'user');
        message.put('content', prompt);
       
        List<Map<String, Object>> messages = new List<Map<String, Object>>();
        messages.add(message);
       
        Map<String, Object> payload = new Map<String, Object>();
        payload.put('messages', messages);
        payload.put('model', 'llama-3.3-70b-versatile');
        payload.put('max_tokens', 1024);
       
        request.setBody(JSON.serialize(payload));
 
        try {
            HttpResponse response = http.send(request);
            System.debug(response.getStatusCode());
            if (response.getStatusCode() == 200) {
 
                Map<String,Object> data = (Map<String,Object>) JSON.deserializeUntyped(response.getBody());
                List<Object> choices = (List<Object>) data.get('choices');
                Map<String,Object> choice_value = (Map<String,Object>) choices[0];
                Map<String,Object> value = (Map<String,Object>) choice_value.get('message');
               
                return (String) value.get('content');
            } else {
                return 'Error';
            }
        } catch (Exception e) {
            throw new AuraHandledException('Error querying Groq API: ' + e.getMessage());
        }
    }
}