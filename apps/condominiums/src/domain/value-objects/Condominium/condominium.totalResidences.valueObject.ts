import { ValueObject } from '@shared/domain/interfaces/valueObject.interface';

export class CondominiumTotalResidences implements ValueObject {
  constructor(private value: number) {}

  validate() {}

  compare(value: ValueObject): boolean {
    return this.value === value.toPrimitive();
  }

  comparePrimitive(value: number): boolean {
    return this.value === value;
  }

  toPrimitive(): number {
    return this.value;
  }
}
