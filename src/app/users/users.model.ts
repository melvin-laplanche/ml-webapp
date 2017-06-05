export class UserPayload {
  public id = '';
  public name = '';
  public email = '';
}


export class User extends UserPayload {
  constructor(payload: UserPayload) {
    super();
    Object.assign(this, payload);
  }
}
