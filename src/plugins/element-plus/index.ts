import ElementPlus from "element-plus";
import locale from "element-plus/lib/locale/lang/zh-cn";

import "dayjs/locale/zh-cn";
import { App } from "vue";
import "./element-variables.scss";

export const installElementPlus = (app: App<Element>) => {
  app.use(ElementPlus, { locale, size: "medium" });
};
