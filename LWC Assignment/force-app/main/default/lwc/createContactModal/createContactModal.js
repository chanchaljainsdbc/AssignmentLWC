import { LightningElement, api , track,wire } from 'lwc';
import createContactRecord from '@salesforce/apex/ContactController.createContactRecord';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';
import { publish, MessageContext } from 'lightning/messageService';
import RECENTLY_CREATED_RECORDS_CHANNEL from '@salesforce/messageChannel/recentlyCreatedRecordsChannel__c';
export default class CreateContactModal extends LightningElement {

    @api isOpen=false;
    @api accountId;
    @track firstName='';
    @track lastName='';
    @track email='';
    @track phoneNumber='';

    @wire(MessageContext) messageContext;

    handleInputChange(event)
    {
        const field = event.target.name;
        if(field=== 'firstName')
        {
            this.firstName=event.target.value;
        }
        else if(field ==='lastName')
        {
            this.lastName=event.target.value;
        }
        else if(field==='email')
        {
            this.email=event.target.value;
        }
        else if(field ==='phoneNumber')
        {
            this.phoneNumber=event.target.value;
        }
    }

    closeModal()
    {
        const closeModal = new CustomEvent('close');
        this.dispatchEvent(closeModal);
    }

    saveContact()
    {
        const fields={
            FirstName: this.firstName,
            LastName : this.lastName,
            Email: this.email,
            Phone: this.phoneNumber,
            AccountId: this.accountId
        };

        createContactRecord({ contact:fields})
        .then((record)=>{
            this.closeModal();
            this.dispatchEvent(new CustomEvent('success'));
            
            const data = { contactId:record.conId, accountId:record.accId ,contactName:record.firstName+" "+record.fastName,accountName:record.accame  ,phoneNumber: record.phone , email:record.email };
            publish(this.messageContext,RECENTLY_CREATED_RECORDS_CHANNEL,data);
            this.showToast('sucsess','Contact Record Created Successfully','success');
        })
        .catch(error => {
            console.error('Error creating contact:',error);
            this.showToast('Error',error.body.message,'error');
        })
    }

    showToast(title, message , variant)
    {
        const event = new ShowToastEvent({
            title,
            message,
            variant,
        });
        this.dispatchEvent(event);
    }

}