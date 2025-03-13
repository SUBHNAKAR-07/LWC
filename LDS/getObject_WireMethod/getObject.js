import { LightningElement,wire } from 'lwc';
import { getObjectInfo } from 'lightning/uiObjectInfoApi';

export default class GetObjectInfoUsingLDS extends LightningElement {
    @wire( getObjectInfo,{objectApiName : 'Account'} )
    ObjInfo;

    //we stored the Account object data in the ObjInfo Property/Variable
    get objectLabel(){
        return this.ObjInfo?.data?.label;
    }
}
