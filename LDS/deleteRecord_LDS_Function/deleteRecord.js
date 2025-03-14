import { LightningElement, api, wire } from 'lwc';
import { getRecord, deleteRecord } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class DeleteRecord extends LightningElement {
    @api recordId;
    accountName = ''; // Declare class properties

    // Fetch account data (Ensure all required fields are included)
    @wire(getRecord, { recordId: '$recordId', fields: ['Account.Name'] })
    wiredRecord({ error, data }) {
        if (data) {
            this.accountName = data.fields.Name.value; // No 'Phone' field in query
        } else if (error) {
            console.error('Error fetching record:', error);
        }
    }

    handleDeleteAccount() {
        deleteRecord(this.recordId)
            .then(() => {
                console.log('Account deleted successfully');
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Success',
                        message: 'Account deleted successfully',
                        variant: 'success',
                    })
                );
            })
            .catch((error) => {
                console.error('Error deleting account: ', error);
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error',
                        message: error.body.message,
                        variant: 'error',
                    })
                );
            });
    }
}
