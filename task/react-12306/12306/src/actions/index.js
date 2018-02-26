/*
 * action 类型
 */

export const SET_STARTSITE = 'SET_STARTSITE'
export const SET_ENDSITE = 'SET_ENDSITE'
export const LOGIN_IN ='LOGIN_IN'
export const LOGIN_OUT='LOGIN_OUT'
export const TRAIN_PAY='TRAIN_PAY'

/*
 * action 创建函数
 */

export function setStartSite(site) {
  return {type: SET_STARTSITE, site}
}

export function loginin(user) {
  return {type: LOGIN_IN, user}
}

export function loginout(user) {
  return {type: LOGIN_OUT, user}
}

export function setEndSite(site) {
    return { type: SET_ENDSITE, site }
}
export function trainpay(list) {
  return { type: TRAIN_PAY, list }
}
