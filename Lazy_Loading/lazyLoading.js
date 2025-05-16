import { LightningElement } from 'lwc';
import loadDataById from '@salesforce/apex/LazyLoadingController.loadDataById';
import loadMoreData from '@salesforce/apex/LazyLoadingController.LoadMoreData';
import countOfAccounts from '@salesforce/apex/LazyLoadingController.countOfAccounts';

export default class LazyLoading extends LightningElement {
    escalations = [];

    totalRecords = 0;
    recordLoaded = 0;

    columns = [
        { label: 'Name', fieldName: 'Name' },
        { label: 'Store', fieldName: 'Store__c' },
        { label: 'Type', fieldName: 'Type__c' },
        { label: 'Market', fieldName: 'Market__c' },
        { label: 'Status', fieldName: 'Status__c' },
        { label: 'Created Date', fieldName: 'CreatedDate', type: 'date' }
    ];

    connectedCallback() {
        this.loadData(); // Initial load
    }

    async loadData() {
        try {
            this.totalRecords = await countOfAccounts();
            this.escalations = await loadDataById(); //To load the intial set of data
            this.recordLoaded = this.escalations.length;
        } catch (error) {
            console.log("error while loading the data : ", error);
        }
    }

    async loadMoreData(event) {
        try {
            const {target} = event;
            target.isLoading = true;//Spinner
            let currentRecords = this.escalations;
            let lastRecord = currentRecords[currentRecords.length - 1];
            let newRecord = await loadMoreData({
                lastName: lastRecord.Name,
                lastId: lastRecord.Id
            });
            this.escalations = [...currentRecords, ...newRecord];// '...' is the spread operator it is done to 
            this.recordLoaded = this.escalations.length;
            target.isLoading = false;
        } catch (error) {
            console.log("error while loading the data : ", error);
        }
    }
}
