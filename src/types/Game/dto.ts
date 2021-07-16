export class PartKindDTO implements PartKind {
  public id: number;
  public name: string;
  public style: string;
  public attrs: PartPropertyPool;
  constructor(name: string, style: string, attrs: PartPropertyPool) {
    this.name = name;
    this.id = this.chatCodeAtAll(name);
    this.style = style;
    this.attrs = attrs;
  }
  // 字符转code
  protected chatCodeAtAll(name: string) {
    return +name
      .split("")
      .map(m => m.charCodeAt(0))
      .join("");
  }
}
