import {Model} from 'mongoose';
import {Decimal128} from 'bson';

const convertObject = (dbObj: any, exclude?: Array<string>): object => {
  const apiObj = {};

  if (dbObj instanceof Model) {
    dbObj = dbObj.toObject();
  }

  for (let name of Object.keys(dbObj)) {
    let value = dbObj[name];

    if (value instanceof Decimal128) {
      value = Number(value.toString());
    }

    if (name === '_id') {
      name = 'id';
      value = value.toString();
    }

    if (name.indexOf('_') === 0) {
      continue;
    }

    if (exclude && exclude.indexOf(name) >= 0) {
      continue;
    }

    apiObj[name] = value;
  }

  return apiObj;
};

export function db2api<T1, T2>(db: T1, exclude?: string[]): T2 {
  return (
    !Array.isArray(db) ? convertObject(db, exclude) : db.map((obj) => convertObject(obj, exclude))
  ) as T2;
}
