const { Op, literal } = require('sequelize');
const COMPARISONS = require('./EnumComparison');


const EARTH_RADIUS = 6371000;

const COMPARISON_FUNCTIONS = {
    [COMPARISONS.COMPARISON_EQUAL]: (value) => ({ [Op.eq]: value }),
    [COMPARISONS.COMPARISON_GREATER_THAN]: (value) => ({ [Op.gt]: value }),
    [COMPARISONS.COMPARISON_LESS_THAN]: (value) => ({ [Op.lt]: value }),
    [COMPARISONS.COMPARISON_GREATER_OR_EQUAL]: (value) => ({ [Op.gte]: value }),
    [COMPARISONS.COMPARISON_LESS_OR_EQUAL]: (value) => ({ [Op.lte]: value }),
    [COMPARISONS.COMPARISON_BETWEEN]: (value) => Array.isArray(value) && value.length === 2 ? { [Op.between]: value } : null,
        // Função para calcular a distância geográfica usando a fórmula de Haversine
    [COMPARISONS.COMPARISON_DISTANCE]: ({ latitude, longitude, radius }) => {
        const haversineFormula = `( ${EARTH_RADIUS} * acos( cos( radians(${latitude}) ) * cos( radians(latitude) ) * cos( radians(longitude) - radians(${longitude}) ) + sin( radians(${latitude}) ) * sin( radians(latitude) ) ) )`;

        return literal(`${haversineFormula} <= ${radius}`);
    }
};

module.exports = COMPARISON_FUNCTIONS;