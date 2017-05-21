import { Http, Response } from '@angular/http';
import { environment } from '../environments/environment';
import { SessionService } from './session/session.service'

export class ApiError {
  httpCode: number = 0;
  message: string = "Unknown Client Error";
  raw: Response = null;

  protected internalErrors = [0, 404, 500];

  constructor(error: Response) {
    this.httpCode = error.status;
    this.raw = error;

    if (this.httpCode != 0) {
      this.message = error.json().error;
    }

    if (error.headers.get("X-Deprecated-Endpoint") == "true") {
      console.warn(`${error.url} is a deprecated endpoint`);
    }
  }

  isInternalError() {
    return this.httpCode in this.internalErrors;
  }
}

export class Api {
  protected baseUrl = environment.baseAPI;

  constructor(
    protected http: Http,
    protected sessionService: SessionService
  ) { }

  get defaultHeaders(): Headers {
    let headers = new Headers();
    headers.append('Accept', 'application/json');
    return headers;
  }

  protected handleBasicErrors(err: Response): ApiError {
    return new ApiError(err)
  }
}
