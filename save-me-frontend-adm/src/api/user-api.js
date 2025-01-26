import { get, post, destroy, put } from './generic-api';

const basicUserUrl = '/user';

export const getUsers = async (params, filters, notificationComponent) => {
    try {
        const { data } = await get(basicUserUrl, params, notificationComponent, filters);
        return data;
    } catch (e) {
        throw e;
    }
};

export const getUser = async (idUser) => {
    try {
        const { data } = await get(`${basicUserUrl}/${idUser}`);
        return data;
    } catch (e) {
        throw e;
    }
};

export const storeUser = async (userData) => {
    try {
        const { data } = await post(basicUserUrl, userData);
        return data;
    } catch (e) {
        throw e;
    }
};

export const updateUser = async (idUser, userData) => {
    try {
        const { data } = await put(`${basicUserUrl}/${idUser}`, userData);
        return data;
    } catch (e) {
        throw e;
    }
};

export const deleteUser = async (idUser) => {
    try {
        const url = `${basicUserUrl}/${idUser}/delete`;
        const { data } = await destroy(url);
        return data;
    } catch (e) {
        throw e;
    }
};

export const deactiveUser = async (idUser) => {
    try {
        const url = `${basicUserUrl}/${idUser}/deactive`;
        const { data } = await destroy(url);
        return data;
    } catch (e) {
        throw e;
    }
};

export const activeUser = async (idUser) => {
    try {
        const { data } = await put(`${basicUserUrl}/${idUser}/active`);
        return data;
    } catch (e) {
        throw e;
    }
};