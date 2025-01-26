const COMPARISON_FUNCTIONS = require('./ComparisonDatabase');
const {isNumber} = require("../Validation/BasicChecks");

function applyFilters(filters, filterFields) {
    const whereClause = {};

    Object.keys(filterFields).forEach(field => {
        if (filters[field] && filters[field].comparison && filters[field].value !== undefined) {
            const availableComparisons = filterFields[field];
            const comparison = filters[field].comparison;
            const value = filters[field].value;

            if (availableComparisons.includes(comparison)) {
                const comparisonFunction = COMPARISON_FUNCTIONS[comparison];
                const filterCondition = comparisonFunction(value);
                
                if (filterCondition) {
                    whereClause[field] = filterCondition;
                }
            }
        }
    });

    return whereClause;
}

function mountObjectDefaultToSelect(filtersData = {}, paginationData = {}) {
    let selectParameters = {}
    const whereClause = applyFilters(filtersData.filters, filtersData.filterFields);
    if(whereClause) {
        selectParameters.where = whereClause
    }
    if(isNumber(paginationData.offset)) {
        selectParameters.offset = paginationData.offset
    }
    if(isNumber(paginationData.pageSize)) {
        selectParameters.limit = paginationData.pageSize
    }
    // if(order) {
    //     selectParameters.order = [['createdAt', 'DESC']]
    // } else {
    //     selectParameters.order = [['createdAt', 'DESC']]
    // }

    return selectParameters
}

module.exports = { applyFilters, mountObjectDefaultToSelect };