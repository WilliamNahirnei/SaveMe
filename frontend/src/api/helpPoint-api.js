import { get, post, destroy, put } from './generic-api'

const basicHelpPointUrl = '/helpPoint'


export const store = async (helpPointData, notificationComponente) => {
  try {
    const { data } =  await post(basicHelpPointUrl, helpPointData, notificationComponente)
    return data;
  } catch (e) {
    throw e
  }
}