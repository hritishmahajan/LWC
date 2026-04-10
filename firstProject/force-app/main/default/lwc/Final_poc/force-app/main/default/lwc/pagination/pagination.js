import { LightningElement, track, wire } from 'lwc';
import getAllAccounts from '@salesforce/apex/AccountPaginationController.getAllAccounts';

const PAGE_SIZE = 5;
const MAX_PAGE_BUTTONS = 5;

export default class Pagination extends LightningElement {

    @track currentPage = 1;
    @track allRecords = [];
    @track isLoading = true;
    @track hasError = false;
    @track errorMessage = '';

    @wire(getAllAccounts)
    wiredAccounts({ error, data }) {
        if (data) {
            this.allRecords = data.map((acc, index) => ({
                ...acc,
                rowNumber: index + 1,
                formattedRevenue: acc.AnnualRevenue
                    ? '$' + Number(acc.AnnualRevenue).toLocaleString('en-US', { maximumFractionDigits: 0 })
                    : null
            }));
            this.isLoading = false;
            this.hasError = false;
        } else if (error) {
            this.isLoading = false;
            this.hasError = true;
            this.errorMessage = error?.body?.message || 'An unexpected error occurred while fetching accounts.';
        }
    }

    get totalRecords() {
        return this.allRecords.length;
    }

    get totalPages() {
        return Math.max(1, Math.ceil(this.totalRecords / PAGE_SIZE));
    }

    get currentPageRecords() {
        const start = (this.currentPage - 1) * PAGE_SIZE;
        const end = start + PAGE_SIZE;
        return this.allRecords.slice(start, end);
    }

    get startRecord() {
        if (this.totalRecords === 0) return 0;
        return (this.currentPage - 1) * PAGE_SIZE + 1;
    }

    get endRecord() {
        return Math.min(this.currentPage * PAGE_SIZE, this.totalRecords);
    }

    get isFirstPage() {
        return this.currentPage === 1;
    }

    get isLastPage() {
        return this.currentPage === this.totalPages;
    }

    get hasRecords() {
        return !this.isLoading && !this.hasError && this.totalRecords > 0;
    }

    get isEmpty() {
        return !this.isLoading && !this.hasError && this.totalRecords === 0;
    }

    get pageNumbers() {
        const total = this.totalPages;
        const current = this.currentPage;
        const half = Math.floor(MAX_PAGE_BUTTONS / 2);

        let start = Math.max(1, current - half);
        let end = start + MAX_PAGE_BUTTONS - 1;

        if (end > total) {
            end = total;
            start = Math.max(1, end - MAX_PAGE_BUTTONS + 1);
        }

        const pages = [];
        for (let i = start; i <= end; i++) {
            pages.push({
                number: i,
                isActive: i === current,
                cssClass: i === current ? 'page-btn page-btn--active' : 'page-btn'
            });
        }
        return pages;
    }

    goToFirstPage() {
        this.currentPage = 1;
    }

    goToPreviousPage() {
        if (this.currentPage > 1) {
            this.currentPage -= 1;
        }
    }

    goToNextPage() {
        if (this.currentPage < this.totalPages) {
            this.currentPage += 1;
        }
    }

    goToLastPage() {
        this.currentPage = this.totalPages;
    }

    goToPageNumber(event) {
        const page = parseInt(event.target.dataset.page, 10);
        if (!isNaN(page) && page >= 1 && page <= this.totalPages) {
            this.currentPage = page;
        }
    }
}