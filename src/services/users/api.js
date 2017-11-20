// @flow

import { AxiosPromise } from 'axios'
import { API } from '../api'

export class UserAPI {
  static getFeaturedUser(): AxiosPromise<any> {
    return API.get('/users/featured')
  }
}
