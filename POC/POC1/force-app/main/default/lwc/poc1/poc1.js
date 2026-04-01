import { LightningElement } from 'lwc';

export default class Poc1 extends LightningElement {

    firstName = '';
    lastName = '';
    email = '';

    contacts = [
        { id: '1', firstName: 'Hritish', lastName: 'Mahajan', email: 'hritishx@gmail.com' },
        { id: '2', firstName: 'John', lastName: 'Doe', email: 'john@gmail.com' },
        { id: '3', firstName: 'Jane', lastName: 'Smith', email: 'jane@gmail.com' }
    ];

    
    filteredContacts = [];
    showTable = false;

    columns = [
        { label: 'First Name', fieldName: 'firstName' },
        { label: 'Last Name', fieldName: 'lastName' },
        { label: 'Email', fieldName: 'email' }
    ];

    handleFirstName(event) {
        this.firstName = (event.target.value || '').toLowerCase();
        this.filterData();
    }

    handleLastName(event) {
        this.lastName = (event.target.value || '').toLowerCase();
        this.filterData();
    }

    handleEmail(event) {
        this.email = (event.target.value || '').toLowerCase();
        this.filterData();
    }

    filterData() {

        this.showTable = this.firstName || this.lastName || this.email;

        if (!this.showTable) {
            this.filteredContacts = [];
            return;
        }

        
        this.filteredContacts = this.contacts.filter(contact => {

            const firstMatch = this.firstName && contact.firstName.toLowerCase().includes(this.firstName);
            const lastMatch = this.lastName && contact.lastName.toLowerCase().includes(this.lastName);
            const emailMatch = this.email && contact.email.toLowerCase().includes(this.email);

            return firstMatch || lastMatch || emailMatch;
        });
    }
}


//Summary - This code defines a Lightning Web Component (LWC) named `Poc1` 
//that allows users to filter a list of contacts based on their first name, last name, or email.
//  The component maintains three properties for the input values and an array of contact objects. 
// It also has a method to filter the contacts based on the input values and display the results in a table format. 
// The table is only shown when there is at least one input value provided.
