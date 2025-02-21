import { LightningElement,wire } from 'lwc';
import InternData from '@salesforce/apex/getInternData.getData';

const columns = [
    { label: 'Intern Name', fieldName: 'Name' },
    { label: 'Department', fieldName: 'Department__c', type: 'text' },
    { label: 'Project', fieldName: 'Project__c', type: 'text' },
];

export default class DataTableIntern extends LightningElement {
    dataList = [];
    columns = columns;

    @wire(InternData)
        wiredData({data}){
            this.dataList = data;
        }
}