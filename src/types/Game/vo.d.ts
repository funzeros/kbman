enum equipTypes {
  weapon,
  shield,
  lorica
}
type PartProperty = {
  value: number; // 值
  isPercent?: boolean; // 是否百分比
  isFixed?: boolean; // 是否固定不可成长
};
type PartPropertyPool = {
  [K in BaseProps]?: PartProperty[];
};
type AllPartProperty = {
  value: number; // 值
  percentValue: number; // 百分比值
};
type AllPartPropertyPool = {
  [K in BaseProps]?: AllPartProperty;
};
interface PartKind {
  id: number;
  name: string;
  style: string;
  attrs: PartPropertyPool;
}
type PartKindAttr = [string, string, PartPropertyPool];
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
  [key: number]: string;
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
  quality: number;
  qualityLabel: string;
}
interface UseEquipVO {
  build: {
    [K in EquipType]: (level: number) => EquipVO;
  };
}

type DressedEquips = {
  [K in EquipType]?: EquipVO;
};
