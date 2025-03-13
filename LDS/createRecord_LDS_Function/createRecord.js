import { LightningElement } from 'lwc';
import { createRecord } from 'lightning/uiRecordApi'; 

export default class CreateRecord extends LightningElement {
    accountName = '';
    accountPhone = '';
    accountIndustry = '';

    handleChange(event) {
        const field = event.target.label;// Using label to identify the input
        if (field === 'Account Name') {
            this.accountName = event.target.value;
        } else if (field === 'Account Phone') {
            this.accountPhone = event.target.value;
        } else if (field === 'Account Industry') {
            this.accountIndustry = event.target.value;
        }
    }

    handleCreateAccount() {
        const fields = {
            Name: this.accountName,
            Phone: this.accountPhone,
            Industry: this.accountIndustry
        };

        const recordInput = { apiName: 'Account', fields };

        createRecord(recordInput) //For create record we need apiName of the object and fields to create. The create record returns a promise
            .then((record) => {
                alert('Account Created Successfully! Record ID: ' + record.id);
            })
            .catch((error) => {
                alert('Error Creating Account: ' + JSON.stringify(error));
            });
    }
}
