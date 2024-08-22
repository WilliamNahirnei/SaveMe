const { Op } = require('sequelize');
const COMPARISONS = require('./EnumComparison');

const COMPARISON_FUNCTIONS = {
    [COMPARISONS.COMPARISON_EQUAL]: (value) => ({ [Op.eq]: value }),
    [COMPARISONS.COMPARISON_GREATER_THAN]: (value) => ({ [Op.gt]: value }),
    [COMPARISONS.COMPARISON_LESS_THAN]: (value) => ({ [Op.lt]: value }),
    [COMPARISONS.COMPARISON_GREATER_THAN_OR_EQUAL]: (value) => ({ [Op.gte]: value }),
    [COMPARISONS.COMPARISON_LESS_THAN_OR_EQUAL]: (value) => ({ [Op.lte]: value }),
    [COMPARISONS.COMPARISON_BETWEEN]: (value) => Array.isArray(value) && value.length === 2 ? { [Op.between]: value } : null
};

module.exports = COMPARISON_FUNCTIONS;