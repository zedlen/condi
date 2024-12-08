import { ValueObject } from '@shared/domain/interfaces/valueObject.interface';

export class AddressCountry implements ValueObject {
  constructor(private value: string) {}

  validate() {}

  compare(value: ValueObject): boolean {
    return this.value === value.toPrimitive();
  }

  comparePrimitive(value: string): boolean {
    return this.value === value;
  }

  toPrimitive(): string {
    return this.value;
  }
}
