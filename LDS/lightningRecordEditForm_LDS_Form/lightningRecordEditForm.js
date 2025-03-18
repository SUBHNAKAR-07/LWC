import { LightningElement } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class CreateAccountForm extends LightningElement {
    handleSuccess(event) {
        this.dispatchEvent(
            new ShowToastEvent({
                title: 'Success',
                message: 'Account created successfully',
                variant: 'success',
            }),
        );
        // Optionally reset the form
        //this.template.querySelector('lightning-record-edit-form').reset();
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
