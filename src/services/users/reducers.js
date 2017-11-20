// @flow

import { Map, fromJS } from 'immutable';
import { FETCH_FEATURED_USER_SUCCESS, FETCH_FEATURED_USER_FAIL, FETCH_FEATURED_USER} from "./actions"

// Typying
import { User } from './models'
import { AxiosError } from 'axios'

function newState(data: User = {}, err: AxiosError, isFetching: bool = false): Map<string, any> {
  return Map(fromJS({
    data: data,
    error: err,
    isLoading: isFetching,
  }))
}

const defaultState = newState()

export function featuredUser(state: Map<string, any> = defaultState, action: any) {
  switch (action.type) {
    case FETCH_FEATURED_USER_SUCCESS: return newState(action.payload)
    case FETCH_FEATURED_USER_FAIL: return newState({}, action.payload)
    case FETCH_FEATURED_USER: return newState({}, {}, true)
    default: return  state
  }
}
