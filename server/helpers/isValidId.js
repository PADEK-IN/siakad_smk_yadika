import Hashids from 'hashids';

export const hashids = new Hashids(process.env.HASHID, 11);

export function checkValidId(id) {
    const validId = hashids.decode(id);
    if (!validId || validId.length === 0) {
      return false;
    };

    const validIdIsNumber = parseInt(validId[0].toString());
    if (isNaN(validIdIsNumber)) {
      return false;
    };

    return validIdIsNumber;
}