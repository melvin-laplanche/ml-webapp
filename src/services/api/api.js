// @flow

import axios, { AxiosPromise, AxiosRequestConfig } from 'axios'

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 2000,
  headers: {},
})

export class API {
  static get(url: string, config?: AxiosRequestConfig): AxiosPromise<any> {
    return instance.get(url, config)
  }
}
