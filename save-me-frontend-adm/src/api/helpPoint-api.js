import { get, post, destroy, put } from './generic-api';

const basicUserUrl = '/helpPoint';

export const getHelpPoints = async (params, filters, notificationComponent) => {
    try {
        const { data } = await get(basicUserUrl, params, notificationComponent, filters);
        return data;
    } catch (e) {
        throw e;
    }
};

export const getHelpPoint = async (idHelpPoint) => {
    try {
        const { data } = await get(`${basicUserUrl}/${idHelpPoint}`);
        return data;
    } catch (e) {
        throw e;
    }
};

export const updateHelpPoint = async (idHelpPoint, helpPointData) => {
    try {
        const { data } = await put(`${basicUserUrl}/${idHelpPoint}`, helpPointData);
        return data;
    } catch (e) {
        throw e;
    }
};