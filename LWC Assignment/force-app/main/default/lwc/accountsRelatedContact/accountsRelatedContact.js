import { LightningElement ,api, wire, track} from 'lwc';
import getAccounts from '@salesforce/apex/AccountRecordDetails.getAccounts';
import { subscribe ,unsubscribe,APPLICATION_SCOPE, MessageContext} from 'lightning/messageService';
import RECENTLY_CREATED_RECORDS_CHANNEL from '@salesforce/messageChannel/recentlyCreatedRecordsChannel__c';

export default class accountsRelatedContact extends LightningElement {
    @track accounts=[];
    @track records=[];
    subscription=false;
    @track error;
    @track showModal=false;
    @track isOpen=false;
    @track id;

    @wire(getAccounts)
    wiredAccounts({ error , data })
    {
        if(data)
        {
            this.accounts= data.map(account=>{
                return { label : account.Name , value :account.Id};
              
            });
            
            this.error=undefined;
            console.log('data',JSON.stringify(this.accounts));
            
        }
        else if(error)
        {
            console.log('Error:'+error);
            this.error=error;
            this.accounts=[];
        }
    }  

    handleChange(event) {
       // this.value = event.detail.value;
        this.id=event.detail.value;
        console.log('Id:',this.id);
    }

    createContact()
    {
        this.showModal=true;
    }
    
    closeModal()
    {
        this.showModal=false;
    }
    
    @wire(MessageContext) messageContext;

    subscribeToMessageChannel()
    {
        if(!this.subscription)
        {
            this.subscription=subscribe(
                this.messageContext,
                RECENTLY_CREATED_RECORDS_CHANNEL,
                (message) => this.handleMessage(message),
                { scope: APPLICATION_SCOPE }
            );
        }
        
    }
    displayAccountList(event)
    {
        console.log('isOpen:',this.isOpen);
        this.isOpen=true;
        /*subscribe(
            this.messageContext,
            RECENTLY_CREATED_RECORDS_CHANNEL,
            (message) => this.handleMessage(message)
        );*/
        console.log('isOpen:',this.isOpen);
    }

    handleMessage(message)
    {
        const newRecord ={
            id: message.conId,
            accId: message.accId,
            accountName: message.accountName,
            contactname: message.contactName,
            phone: message.phone,
            email: message.email,
            accountUrl: "/"+message.accId,
            contactUrl: "/"+message.conId
        };
        this.records={...this.records , newRecord};
        console.log('records:',this.records);
    }
}