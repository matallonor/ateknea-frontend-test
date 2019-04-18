export class Serializable {
  fromJSON(json) {

    console.log('JSON:::', json);

    if ( json === undefined || json === null || Object.keys(json).length === 0 ) {
      console.log('KO');
      return null;
    }

    for (const propName in json) {
      if (json[propName] !== undefined && json[propName] !== null) {
        console.log('PROP:', this[propName]);
        // this[propName] = json[propName];
      }
    }
    console.log('OK', this);

    return this;
  }
}
