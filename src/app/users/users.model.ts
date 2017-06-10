export class UserPayload {
  public id = '';
  public name = '';
  public email = '';
  public is_admin?= false;
}

export class User extends UserPayload {
  constructor(payload: UserPayload) {
    super();
    Object.assign(this, payload);
  }

  get isAdmin(): boolean {
    return this.is_admin;
  }

  set isAdmin(value: boolean) {
    this.is_admin = value;
  }
}
