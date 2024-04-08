class PaginationHelper {
    /**
     * Constructs a new PaginationHelper instance.
     * @param {Array} collection - The array of values to paginate.
     * @param {number} itemsPerPage - The number of items per page.
     */
    constructor(collection, itemsPerPage) {
        this.collection = collection;
        this.itemsPerPage = itemsPerPage;
    }

    /**
     * Returns the number of pages.
     * @returns {number} The number of pages.
     */
    pageCount() {
        return Math.ceil(this.collection.length / this.itemsPerPage);
    }

    /**
     * Returns the total number of items in the collection.
     * @returns {number} The total number of items.
     */
    itemCount() {
        return this.collection.length;
    }

    /**
     * Returns the number of items on the specified page.
     * @param {number} pageIndex - The index of the page.
     * @returns {number} The number of items on the page.
     */
    pageItemCount(pageIndex) {
        const totalPages = this.pageCount();
        if (pageIndex < 0 || pageIndex >= totalPages) {
            return -1; // Invalid page index
        }
        if (pageIndex === totalPages - 1) {
            return this.collection.length % this.itemsPerPage; // Last page
        }
        return this.itemsPerPage;
    }

    /**
     * Returns the page index of the item at the specified index.
     * @param {number} itemIndex - The index of the item.
     * @returns {number} The index of the page.
     */
    pageIndex(itemIndex) {
        if (itemIndex < 0 || itemIndex >= this.collection.length) {
            return -1; // Invalid item index
        }
        return Math.floor(itemIndex / this.itemsPerPage);
    }
}

// Example usage:
var helper = new PaginationHelper(['a', 'b', 'c', 'd', 'e', 'f'], 4);
console.log(helper.pageCount()); // should == 2
console.log(helper.itemCount()); // should == 6
console.log(helper.pageItemCount(0)); // should == 4
console.log(helper.pageItemCount(1)); // last page - should == 2
console.log(helper.pageItemCount(2)); // should == -1 since the page is invalid

console.log(helper.pageIndex(5)); // should == 1 (zero based index)
console.log(helper.pageIndex(2)); // should == 0
console.log(helper.pageIndex(20)); // should == -1
console.log(helper.pageIndex(-10)); // should == -1

// ----------------------------------------------------------

// For this exercise you will be strengthening your page-fu mastery. You will complete the PaginationHelper class, which is a utility class helpful for querying paging information related to an array.

// The class is designed to take in an array of values and an integer indicating how many items will be allowed per each page. The types of values contained within the collection/array are not relevant.

// The following are some examples of how this class is used:

