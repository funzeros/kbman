import { defineComponent, reactive, toRefs } from "vue";
import Keyboard from "./Components/Keyboard.vue";
export default defineComponent({
  components: {
    Keyboard
  },
  setup() {
    class ModelData {
      dialogShow = false;
    }
    const modelData = reactive<ModelData>(new ModelData());
    const methods = {
      open() {
        modelData.dialogShow = true;
      },
      close() {
        modelData.dialogShow = false;
      }
    };
    return {
      ...toRefs(modelData),
      ...methods
    };
  }
});
