import { LightningElement, wire, track } from 'lwc';
import getActiveCampaignCoupons from '@salesforce/apex/CouponController.getActiveCampaignCoupons';
import updateSelectedCoupons from '@salesforce/apex/CouponController.updateSelectedCoupons';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';


export default class CouponOptIn extends LightningElement {
    @track coupons = [];
    @track error;

    @wire(getActiveCampaignCoupons)
    wiredCoupons({ data, error }) {
        if (data) {
            this.coupons = data.map((coupon, index) => ({
                ...coupon,
                number: index + 1,
                selectedOpt1: false,
                selectedOpt2: false
            }));
        } else if (error) {
            this.error = error;
            console.error(error);
        }
    }

    handleCheckboxChange(event) {
        const { index, option } = event.target.dataset;
        this.coupons[index][`selected${option}`] = event.target.checked;
    }

    handleSubmit() {
        
        const updates = this.coupons
            .filter(coupon => coupon.selectedOpt1 || coupon.selectedOpt2)
            .map(coupon => {
                const updated = { Id: coupon.Id };
                if (coupon.selectedOpt1) updated.Opt_in_Option_1_selection__c = 'Yes';
                if (coupon.selectedOpt2) updated.Opt_in_Option_2_selection__c = 'Yes';
                return updated;
            });

        if (updates.length === 0) {
            this.showToast('Warning', 'No checkboxes selected.', 'warning');
            return;
        }

        updateSelectedCoupons({ updatedCoupons: updates })
            .then(() => {
                this.showToast('Success', 'Coupons updated successfully!', 'success');
            })
            .catch(error => {
                this.showToast('Error', error.body.message, 'error');
                console.log(error);
            });
    }

    showToast(title, message, variant) {
        this.dispatchEvent(new ShowToastEvent({ title, message, variant }));
    }
    
}
