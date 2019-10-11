export interface Unit {
  text: string;
  value: string;
}

export interface UnitGroup extends Unit {
  children?: Array<UnitGroup>;
}
