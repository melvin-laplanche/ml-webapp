export class Session {
  private user_id: string
  private token: string

  constructor(payload: Session) {
    Object.assign(this, payload);
  }

  get userId(): string {
    return this.user_id
  }

  set userId(id: string) {
    this.user_id = id;
  }
}