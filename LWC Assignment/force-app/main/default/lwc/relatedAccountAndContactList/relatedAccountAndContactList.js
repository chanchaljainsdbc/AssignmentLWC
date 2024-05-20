import { LightningElement ,track, wire , api} from 'lwc';
//import { subscribe , MessageContext} from 'lightning/messageService';
//import recentlyCreatedRecordsChannel from '@salesforce/messageChannel/recentlyCreatedRecordsChannel__c';

export default class RelatedAccountAndContactList extends LightningElement {
    @api records;
    @api isOpen=false;

    //console.log('records:',records);

    columns =[
        {label: 'Account Name' , fieldName: 'accountUrl' , type: 'url', typeAttributes: { label : {fieldName:'accountName'},value: {fieldName: 'accountName'}, target: '_self'}},
        {label: 'Contact Name' , fieldName: 'contactUrl' , type: 'url', typeAttributes: { label : {fieldName:'contactName'},value: {fieldName: 'contactName'}, target: '_self'}},
        {label: 'Phone' , fieldName: 'phone'},
        {label: 'Email' , fieldName: 'email'}
    ];

    /*@wire(MessageContext) messageContext;

    connectedCallback()
    {
        subscribe(
            this.messageContext,
            recentlyCreatedRecordsChannel,
            (message) => this.handleMessage(message)
        );
    }

    handleMessage(message)
    {
        const newRecord ={
            id: message.conId,
            accId: message.accId,
            accountName: message.accountName,
            contactname: message.contactName,
            phone: message.phone,
            email: message.email
        };
        this.records={...this.records , newRecord};
    }*/

    @api
    displayAccountList()
    {
        this.isOpen=true;
    }

    @api
    closeModal()
    {
        console.log('isOpen:',this.isOpen);
        this.isOpen=false;
        console.log('isOpen:',this.isOpen);
    }
}