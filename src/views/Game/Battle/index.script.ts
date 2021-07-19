import { defineComponent, inject, reactive, toRefs } from "vue";
import Keyboard from "./Components/Keyboard.vue";

export default defineComponent({
  components: {
    Keyboard
  },
  setup() {
    const endBattle = inject("endBattle") as Fn;
    class ModelData {
      dialogShow = false;
      dialogHidden = false;
    }
    const modelData = reactive<ModelData>(new ModelData());
    const methods = {
      open() {
        modelData.dialogShow = true;
      },
      close() {
        modelData.dialogShow = false;
      },
      endBattle
    };
    return {
      ...toRefs(modelData),
      ...methods
    };
  }
});
