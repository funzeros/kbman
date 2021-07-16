import { EquipTypeOption } from "../const/equip";
import { BaseProps } from "../types/Game/dto";
import { BasePropertyDTO } from "../types/Users/dto";
import { GMath } from "../utils/custom";

/**
 * Equip
 */
export class Equip extends BasePropertyDTO implements EquipVO {
  public type: EquipType;
  public name = "";
  public partData: PartInsData = {};
  constructor(level: number, typeOption: EquipTypeOptVO<BaseProps>) {
    super();
    this.level = level;
    this.type = typeOption.type;
    this.buildBaseProp(typeOption);
  }
  private buildBaseProp(typeOption: EquipTypeOptVO<BaseProps>) {
    const params: StrObj = {};
    typeOption.parts.forEach(m => {
      if (GMath.randomBoolean(m.odds)) {
        const part = GMath.randomArray(m.partPool);
        params[m.label] = part.name;
        this.partData[m.label] = {
          data: part,
          label: m.label,
          name: m.name
        };
      }
    });
    this.name = typeOption.buildName(params);
  }
}

const useEquip = (): UseEquipVO => {
  return {
    build: {
      weapon(level) {
        return new Equip(level, EquipTypeOption.weapon);
      },
      shield(level) {
        return new Equip(level, EquipTypeOption.shield);
      },
      lorica(level) {
        return new Equip(level, EquipTypeOption.lorica);
      }
    }
  };
};
export default useEquip;
