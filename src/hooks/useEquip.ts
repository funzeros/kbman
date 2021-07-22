import { EquipTypeOption, qualityMap } from "../const/equip";
import { BasePropertyDTO } from "../types/Users/dto";
import { GMath } from "../utils/custom";

/**
 * Equip
 */
export class Equip extends BasePropertyDTO implements EquipVO {
  public level: number;
  public type: EquipType;
  public name = "";
  public partData: PartInsData = {};
  public quality: number;
  public qualityLabel: string;
  constructor(
    level: number,
    typeOption: EquipTypeOptVO<BaseProps>,
    qualityMap: StrObj
  ) {
    super();
    this.level = level;
    this.type = typeOption.type;
    this.quality = GMath.randomRange(50, 100);
    this.qualityLabel = this.getQualityLabel(qualityMap);
    this.buildBaseProp(typeOption);
  }
  private buildBaseProp(typeOption: EquipTypeOptVO<BaseProps>) {
    const params: StrObj = {};
    const allPartProperty: AllPartPropertyPool = {};
    typeOption.parts.forEach(m => {
      if (GMath.randomBoolean(m.odds)) {
        const part = GMath.randomArray(m.partPool);
        params[m.label] = part.name;
        this.partData[m.label] = {
          data: part,
          label: m.label,
          name: m.name
        };
        this.getPartProperty(allPartProperty, part.attrs);
      }
    });
    this.name = typeOption.buildName(params);
    this.setPartProperty(allPartProperty);
  }
  private getPartProperty(
    allPartProperty: AllPartPropertyPool,
    singlePartProperty: PartPropertyPool
  ) {
    Object.keys(singlePartProperty).forEach(k => {
      const key = k as BaseProps;
      const valueList = singlePartProperty[key] as PartProperty[];
      if (!allPartProperty[key])
        allPartProperty[key] = {
          value: 0,
          percentValue: 0
        };
      const property = allPartProperty[key] as AllPartProperty;
      valueList.forEach(value => {
        property[value.isPercent ? "percentValue" : "value"] += Math.floor(
          value.value * (value.isFixed ? 1 : this.level)
        );
      });
    });
  }
  private setPartProperty(allPartProperty: AllPartPropertyPool) {
    Object.keys(allPartProperty).forEach(k => {
      const key = k as BaseProps;
      const prop = allPartProperty[key] as AllPartProperty;
      this[key] = Math.floor(
        (prop.value * (100 + prop.percentValue) * this.quality) / 10000
      );
    });
  }
  private getQualityLabel(qualityMap: StrObj) {
    return Object.keys(qualityMap).reduce((pre, now) => {
      if (this.quality >= +now) return qualityMap[now];
      return pre;
    }, "");
  }
  static statisticsTotalEquip(equips: DressedEquips) {
    return Object.values(equips).reduce((pre, now) => {
      const p = pre as GObj;
      const n = now as GObj;
      Object.keys(pre).forEach(k => {
        if (k in n && k in p) p[k] += n[k];
      });
      return p;
    }, new BasePropertyDTO(true)) as BasePropertyVO;
  }
}

const useEquip = (): UseEquipVO => {
  return {
    build: {
      weapon(level) {
        return new Equip(level, EquipTypeOption.weapon, qualityMap);
      },
      shield(level) {
        return new Equip(level, EquipTypeOption.shield, qualityMap);
      },
      lorica(level) {
        return new Equip(level, EquipTypeOption.lorica, qualityMap);
      }
    }
  };
};
export default useEquip;
