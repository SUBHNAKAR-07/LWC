import { LightningElement, api } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class AccountRecordForm extends LightningElement {
    @api recordId; // Record ID passed from the parent component or page
    fields = ['Name', 'Industry']; // Use string field names instead of schema imports

    handleSuccess(event) {
        this.dispatchEvent(
            new ShowToastEvent({
                title: 'Success',
                message: 'Record saved successfully',
                variant: 'success',
            }),
        );
    }

    handleError(event) {
        this.dispatchEvent(
            new ShowToastEvent({
                title: 'Error',
                message: event.detail.message,
                variant: 'error',
            }),
        );
    }
}
