export class SessionPayload {
  public user_id = '';
  public token = '';
}

export class Session extends SessionPayload {
  constructor(payload: SessionPayload) {
    super();
    Object.assign(this, payload);
  }

  get userId(): string {
    return this.user_id
  }

  set userId(id: string) {
    this.user_id = id;
  }
}
