import { LightningElement } from 'lwc';
//importing LDS create Record method
import {createRecord} from 'lightning/uiRecordApi';
//importing the api of the Intern__c object
import INTERN_OBJ from '@salesforce/schema/Intern__c';
//importing diffent fields of the Intern__c object
import NAME_FIELD from '@salesforce/schema/Intern__c.Name';
import DEPARTMENT_FIELD from '@salesforce/schema/Intern__c.Department__c';
import PROJECT_FIELD from '@salesforce/schema/Intern__c.Project__c';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class Assignment3 extends LightningElement {
    accountId; // this variable is used created to store the record id of the new intern record created .
    name = '';
    dept = '';
    project = '';

    handleChange(event){
        const fieldName = event.target.label;
        if(fieldName === 'Name'){
            this.name = event.target.value;
            console.log(this.name);//For testing
        }
        else if(fieldName === 'Department'){
            this.dept = event.target.value;
        }
        else if(fieldName === 'Project'){
            this.project = event.target.value;
        }
    }

    handleClick(){

        console.log('Button clicked!'); // Check if the button click event is firing.
            
            const fields = {}; //Creating a empty field object which will be used for creating the Intern record
            fields[NAME_FIELD.fieldApiName] = this.name;  //Mapping the name field of the Intern__c object to the name variable
            fields[DEPARTMENT_FIELD.fieldApiName] = this.dept;  //Mapping the Department field of the Intern__c object to the dept variable
            fields[PROJECT_FIELD.fieldApiName] = this.project; //Mapping the Project field of the Intern__c object to the project variable

            const recordInput = { apiName : INTERN_OBJ.objectApiName, fields}; // here we are creating a object that stores objects apiName and fields for which record will be created .
            console.log(recordInput);
            createRecord(recordInput)   //when we use createRecord method, the record will be created we will get a responce from the LDS which is a promise.
                                        //we receive a promise as it is a asynchronous operation. And on success the promise will return all the details of the 
                                        //record created (like the record id ...,etc) . We handle promise using .then() and .catch() 
            .then(internNewRec =>{
                this.accountId = internNewRec.id; // saving the id of the record created in the accountId variable
                console.log('Record created with ID:', internNewRec.id);
                //Add a toast message to confirm that record is created .
                const event = new ShowToastEvent({
                    title: 'Success',
                    message: `Intern record created with ID: ${internNewRec.id}`,
                    variant: 'success',
                });
                this.dispatchEvent(event);
                //alert('Intern record created with id: '+internNewRec.id);
            })
            .catch(error =>{
                console.error("error: "+ JSON.stringify(error));
                const event = new ShowToastEvent({
                    title: 'Error creating record',
                    message: error.body.message,
                    variant: 'error',
                });
                this.dispatchEvent(event);
            });
    }
}