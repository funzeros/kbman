import { EquipTypeOption } from "../const/equip";
import { BaseProps } from "../types/Game/dto";
import { BasePropertyDTO } from "../types/Users/dto";

/**
 * Equip
 */
export class Equip extends BasePropertyDTO {
  public type: EquipType;
  constructor(level: number, typeOption: EquipTypeOptVO<BaseProps>) {
    super();
    this.level = level;
    this.type = typeOption.type;
    this.buildBaseProp();
  }
  private buildBaseProp() {
    //
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
