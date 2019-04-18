
export class User {
  _id: number;
  name: string;
  lastName: string;
  email: string;
  enabled: boolean;

  get id(): number {
    return this._id;
  }

  fromJSON(json) {
    if ( json === undefined || json === null || Object.keys(json).length === 0 ) {
      return null;
    }
    this._id = json.id;
    this.name = json.name;
    this.lastName = json.lastName;
    this.email = json.email;
    this.enabled = json.enabled;

    return this;
  }
}
