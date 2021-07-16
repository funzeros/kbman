import { BasePropertyDTO } from "../Users/dto";

export type BaseProps = keyof BasePropertyDTO;

export class PartKindDTO implements PartKind {
  public id: number;
  public name: string;
  public style: string;
  constructor(name: string, style: string) {
    this.name = name;
    this.id = this.chatCodeAtAll(name);
    this.style = style;
  }
  // 字符转code
  protected chatCodeAtAll(name: string) {
    return +name
      .split("")
      .map(m => m.charCodeAt(0))
      .join("");
  }
}
