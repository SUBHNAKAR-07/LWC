import { LightningElement, api,wire } from 'lwc';
import { getRecord,updateRecord } from 'lightning/uiRecordApi';

export default class UpdateRecord extends LightningElement {
    @api recordId;
    accountName = '';
    accountPhone = '';

    // Fetch current record data (THIS PART IS ADDED TO SHOW THE PREFILLED VALUE IN THE INPUT FIELDS)It is not required
    // for this we have to also add the getRecord() method
    @wire(getRecord, { recordId: '$recordId', fields: ['Account.Name', 'Account.Phone'] })
    wiredRecord({ error, data }) {
        if (data) {
            this.accountName = data.fields.Name.value;
            this.accountPhone = data.fields.Phone.value;
        } else if (error) {
            console.error('Error fetching record:', error);
        }
    }

    handleChange(event) {
        const field = event.target.label;
        if(field === 'Account Name'){
            this.accountName = event.target.value;
        } 
        else if(field === 'Account Phone'){
            this.accountPhone = event.target.value;
        }
    }

    handleUpdateAccount() {
        // Create an object with updated field values
        const fields = {
            Id: this.recordId, // Required for updateRecord
            Name: this.accountName,
            Phone: this.accountPhone
        };

        const recordInput = { fields };

        updateRecord(recordInput) // Call updateRecord API
            .then(() => {
                alert('Account Updated Successfully!');
            })
            .catch((error) => {
                alert('Error Updating Account: ' + JSON.stringify(error));
            });
    }
}
