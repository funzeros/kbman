enum equipTypes {
  weapon,
  shield,
  lorica
}

interface PartKind {
  id: number;
  name: string;
  style: string;
}
type PartKindAttr = [string, string];
interface BasePart {
  label: string; // 部分标注
  name: string; // 部件名称
}
interface EquipPart extends BasePart {
  odds: number; // 部件出现几率
  partPool: PartKind[];
}
interface PartIns extends BasePart {
  data: PartKind;
}
interface PartInsData {
  [key: string]: PartIns;
}
interface StrObj {
  [key: string]: string;
}
type EquipType = keyof typeof equipTypes;
interface EquipTypeOptVO<T> {
  type: EquipType;
  baseProp: T[];
  parts: EquipPart[];
  buildName: (opt: StrObj) => string;
}
type EquipOptVO<T> = {
  [K in EquipType]: EquipTypeOptVO<T>;
};
interface EquipVO extends Partial<BasePropertyVO> {
  type: EquipType;
  name: string;
  partData: PartInsData;
}
interface UseEquipVO {
  build: {
    [K in EquipType]: (level: number) => EquipVO;
  };
}
