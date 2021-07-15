enum equipTypes {
  weapon,
  shield,
  lorica
}
type EquipPart = {
  name: string; // 部件名称
  odds: number; // 部件出现几率
};
type EquipType = keyof typeof equipTypes;
type EquipTypeOptVO<T> = {
  type: EquipType;
  baseProp: T[];
  parts: EquipPart[];
};
type EquipOptVO<T> = {
  [K in EquipType]: EquipTypeOptVO<T>;
};
interface UseEquipVO {
  build: {
    [K in EquipType]: (level: number) => Equip;
  };
}
