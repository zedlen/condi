export interface ValueObject {
  toPrimitive(): string | number | object;
  validate(): void;
  comparePrimitive(value: string | number | object): boolean;
  compare(value: ValueObject): boolean;
}
