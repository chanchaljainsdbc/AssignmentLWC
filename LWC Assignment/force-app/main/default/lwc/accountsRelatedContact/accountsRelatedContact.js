import { LightningElement , wire} from 'lwc';
import getAccounts from '@salesforce/apex/AccountRecordDetails.getAccounts';
export default class accountsRelatedContact extends LightningElement {
    accounts=[];
    @wire(getAccounts)
    wiredAccounts({error , data})
    {
        if(data)
        {
            console.log('data' ,+data);
            data.forEach(acc => {
                this.accounts.push({
                    label: acc.Name,
                    value: acc.Id
                });
            });
        }
    }
    id='';
    handleChange(event) {
       // this.value = event.detail.value;
        this.id=event.detail.id;
    }

    createContact(event)
    {

    }

    displayAccountList(event)
    {

    }
}