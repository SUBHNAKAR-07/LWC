import { LightningElement,api,wire } from 'lwc';
import { getRecord } from 'lightning/uiRecordApi';
import NAME_FIELD from '@salesforce/schema/Account.Name';
import INDUSTRY_FIELD from '@salesforce/schema/Account.Industry';

export default class GetRecordUsingLdlWireMethod extends LightningElement {
    @api recordId;

    @wire(getRecord, {recordId:'$recordId', fields: [NAME_FIELD, INDUSTRY_FIELD] })
    account;

    get name(){
        return this.account.data?.fields?.Name?.value;
    }

    get industry() {
        return this.account.data?.fields?.Industry?.value;
    }
}
