export class User {
  private id: string
  private name: string
  private email: string

  constructor(payload: User) {
    Object.assign(this, payload);
  }
}