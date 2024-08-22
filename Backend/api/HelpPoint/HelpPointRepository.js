const HelpPoint = require('./HelpPoint')
const { applyFilters } = require('../DatabaseSuport/WhereSuport');
const FILTER_FIELDS = require('./HelpPointFilters');

exports.index = async function (filters) {
    const whereClause = applyFilters(filters, FILTER_FIELDS);
    if (Object.keys(whereClause).length === 0) {
        return await HelpPoint.findAll();
    }

    return await HelpPoint.findAll({
        where: whereClause
    });
};

exports.show = async function (idHelpPoint) {
    return await HelpPoint.findByPk(idHelpPoint, {})
}

exports.store = async function (helpPointData, options = null) {
    return await HelpPoint.create(helpPointData, options)
}

exports.update = async function (helpPoint, helpPointData, options = null) {
    return await helpPoint.update(helpPointData, options)
}