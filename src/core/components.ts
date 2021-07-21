import { App, Component } from "vue";

import FaceIcon from "/@/components/FaceIcon/index.vue";
import DragView from "/@/components/common/DragView.vue";
const components: Component[] = [FaceIcon, DragView];

const installIepComponents = (app: App<Element>) => {
  components.forEach(component => {
    app.component(component.name as string, component);
  });
};

export { installIepComponents };
