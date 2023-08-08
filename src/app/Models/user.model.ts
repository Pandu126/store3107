export class User {
  constructor(
    private email: string,
    private idToken: string,
    private localId: string,
    private expirationdate: Date
  ) {}
  get expireDate() {
    return this.expirationdate;
  }

  get getUserToken(){
    return this.idToken
  }
}
