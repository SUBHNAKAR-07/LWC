import { LightningElement,api,wire,track } from 'lwc';
import { updateRecord } from 'lightning/uiRecordApi';//the lds api to show details of a single record
import { ShowToastEvent } from 'lightning/platformShowToastEvent';//to show toast message
import { refreshApex } from '@salesforce/apex';//to auto refresh the page
import AiSummary from '@salesforce/apex/ApiForSummary.getGroq';

//Now importing the requiered fields to create the record summary by using a apex class.
import AccDetails from '@salesforce/apex/AccountData.getAccData';

//Importing Account Record Summary field
import RECORD_SUMMARY_FIELD from '@salesforce/schema/Account.Record_Summary__c';



export default class RecordSummarizer extends LightningElement {
    @api recordId; // Gets Account ID dynamically
    @track summary = '';  // Stores the summary text
    @track isEdit = false;  // Controls edit mode
    account; // Store fetched account details
    
    @track wiredAccount; // Store wired response for refreshApex
    
    @wire(AccDetails, { accountId: '$recordId' })
    wiredAccountData(result) {
        this.wiredAccount = result; // Store response for refreshApex
        if (result.data) {
            this.account = result.data;
            this.summary = result.data.Record_Summary__c || 'Click on the Generate button to create a new summary';
        } else if (result.error) {
            this.summary = 'Error fetching data.';
            console.error('Error fetching Account data:', result.error);
        }
    }

    // Handles Edit button click
    handleEdit(){
        this.isEdit = true;
    }

    // Captures input changes in the text area
    handleOnchange(event){
        this.summary = event.target.value;
    }

    // Handles Discard button click
    handleDiscard(){
        this.summary = this.account.Record_Summary__c || 'Click on the Generate button to create a new summary';
        this.isEdit = false;
    }

    async handleSave(){
        const fields ={
            Id: this.recordId,
            [RECORD_SUMMARY_FIELD.fieldApiName]: this.summary
        };
    
        try {
            await updateRecord({ fields });
    
            this.dispatchEvent(new ShowToastEvent({
                title: 'Success',
                message: 'Summary updated successfully!',
                variant: 'success'
            }));
    
            this.isEdit = false;
    
            // Refresh the Account Data
            await refreshApex(this.wiredAccount);
    
        } catch (error) {
            this.dispatchEvent(new ShowToastEvent({
                title: 'Error',
                message: 'Failed to update summary.',
                variant: 'error'
            }));
            console.error('Error updating record:', error);
        }
    }
    

   // Handles Generate Summary button click
handleGenerate() {
    if (this.account) {
        // Extract values with fallback defaults to avoid errors
        const accountId = this.account.Id || 'No Account ID';
        const name = this.account.Name || 'Unknown Account';
        const accountNumber = this.account.AccountNumber || 'No Account Number';
        const type = this.account.Type || 'Unspecified Type';
        const industry = this.account.Industry || 'Unspecified Industry';
        const revenue = this.account.AnnualRevenue ? `$${this.account.AnnualRevenue.toLocaleString()}` : 'Revenue not available';
        const phone = this.account.Phone || 'No phone number available';
        const website = this.account.Website || 'No website listed';
        const ownerName = this.account.Owner?.Name || 'Owner not assigned';
        const rating = this.account.Rating || 'No rating available';
        const employees = this.account.NumberOfEmployees ? this.account.NumberOfEmployees.toLocaleString() : 'Employee count not available';
        const createdDate = this.account.CreatedDate ? new Date(this.account.CreatedDate).toLocaleDateString() : 'Creation date unknown';

        // Constructing a structured and detailed summary in paragraph format
        this.summary = `Account Summary: The account with ID ${accountId} is named "${name}". It has the account number "${accountNumber}" and falls under the "${type}" category within the "${industry}" industry. The company has an annual revenue of ${revenue} and employs approximately ${employees} people. 

        The primary contact number is ${phone}, and the official website is ${website}. The account is managed by ${ownerName} and has a rating of "${rating}". 

        This account was created on ${createdDate}. This summary is automatically generated based on the latest available account data.`;

    } else {
        // If account data is unavailable, show a fallback message
        this.summary = 'Unable to generate summary due to missing account data.';
    }
}

generateAISummary(){
    AiSummary({ Id: this.recordId })
    .then(data=>{
        this.summary = data;
        console.log(data);
    })
    .finally(()=>{
        this.dispatchEvent(new ShowToastEvent({
            message: 'Record Summary Generated Successfully',
            variant: 'success'
    }))})
}
}