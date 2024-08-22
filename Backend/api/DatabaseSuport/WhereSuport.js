const COMPARISON_FUNCTIONS = require('./ComparisonDatabase');

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

module.exports = { applyFilters };