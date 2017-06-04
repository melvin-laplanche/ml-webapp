export class SessionPayload {
  public user_id = 0;
  public token = '';
}

export class Session extends SessionPayload {
  constructor(payload: SessionPayload) {
    super();
    Object.assign(this, payload);
  }

  get userId(): number {
    return this.user_id
  }

  set userId(id: number) {
    this.user_id = id;
  }
}
