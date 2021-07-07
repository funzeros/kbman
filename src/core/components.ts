import { App } from "vue";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const components: any[] = [];

const installIepComponents = (app: App<Element>) => {
  components.forEach(component => {
    app.component(component.name, component);
  });
};

export { installIepComponents };
