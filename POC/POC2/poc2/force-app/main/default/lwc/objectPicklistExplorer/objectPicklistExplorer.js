import { LightningElement, track, wire } from 'lwc';
import getAllObjects from '@salesforce/apex/ObjectPicklistController.getAllObjects';
import getPicklistFields from '@salesforce/apex/ObjectPicklistController.getPicklistFields';

export default class ObjectPicklistExplorer extends LightningElement {

    @track objectOptions = [];
    @track picklistFieldOptions = [];
    @track selectedObject = '';
    @track selectedField = '';
    @track isLoading = false;

    // Wire: Load all objects on component init
    @wire(getAllObjects)
    wiredObjects({ error, data }) {
        if (data) {
            this.objectOptions = data.map(obj => ({
                label: obj.label,
                value: obj.value
            }));
        } else if (error) {
            console.error('Error loading objects:', error);
        }
    }

    // When user selects an object
    handleObjectChange(event) {
        this.selectedObject = event.detail.value;
        this.selectedField = '';         // Reset field selection
        this.picklistFieldOptions = [];  // Clear previous fields
        this.isLoading = true;

        getPicklistFields({ objectApiName: this.selectedObject })
            .then(result => {
                this.picklistFieldOptions = result.map(field => ({
                    label: field.label,
                    value: field.value
                }));
                this.isLoading = false;
            })
            .catch(error => {
                console.error('Error loading picklist fields:', error);
                this.isLoading = false;
            });
    }

    // When user selects a picklist field
    handleFieldChange(event) {
        this.selectedField = event.detail.value;
    }

    // Computed: show field dropdown only if fields exist
    get hasPicklistFields() {
        return this.picklistFieldOptions.length > 0;
    }
}