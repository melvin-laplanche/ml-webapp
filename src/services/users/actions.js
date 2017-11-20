// @flow

import { AxiosError, AxiosPromise } from 'axios'
import { UserAPI } from './api'

export const FETCH_FEATURED_USER = 'FETCH_FEATURED_USER'
export const FETCH_FEATURED_USER_SUCCESS = 'FETCH_FEATURED_USER_SUCCESS'
export const FETCH_FEATURED_USER_FAIL = 'FETCH_FEATURED_USER_FAIL'

export let fetchFeaturedUser = () => {
	return function (dispatch: any) {
		dispatch({
			type: FETCH_FEATURED_USER,
		})

		UserAPI.getFeaturedUser()
			.then((res: AxiosPromise) => {
				dispatch({
					type: FETCH_FEATURED_USER_SUCCESS,
					payload: res.data,
				})
			})
			.catch((err: AxiosError) => {
				dispatch({
					type: FETCH_FEATURED_USER_FAIL,
					payload: err,
				})
			})
	}
}
