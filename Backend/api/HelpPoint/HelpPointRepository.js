const HelpPoint = require('./HelpPoint')
const { applyFilters, mountObjectDefaultToSelect} = require('../DatabaseSuport/WhereSuport');
const FILTER_FIELDS = require('./HelpPointFilters');

exports.index = async function (filters, paginationData) {
    objectToSelect = mountObjectDefaultToSelect(
        {
            filters,
            filterFields: FILTER_FIELDS
        },
        paginationData
    )

    const helpPoints = await HelpPoint.findAndCountAll(objectToSelect);
    const totalPages = Math.ceil(helpPoints.count / paginationData.pageSize);

    return {
        total: helpPoints.count,
        page: paginationData.page,
        totalPages,
        helpPoints: helpPoints.rows
    };
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