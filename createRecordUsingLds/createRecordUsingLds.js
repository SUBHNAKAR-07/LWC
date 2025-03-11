import { LightningElement,api } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class CreateRecordUsingLds extends LightningElement {
    @api recordId;
    handleEdit = false;


    handleClick(){
        this.handleEdit = true;
    }
    HandleCancel(){
        this.handleEdit = false;
    }

    handleSuccess(event) {
        const evt = new ShowToastEvent({
            title: "Success",
            message: "Record updated successfully!",
            variant: "success"
        });
        this.dispatchEvent(evt);
        this.handleEdit = false; // Hide edit form after success
    }

}