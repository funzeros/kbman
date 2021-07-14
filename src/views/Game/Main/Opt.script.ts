import { defineComponent } from "vue";
import Keyboard from "./Components/Keyboard.vue";
import Msg from "./Components/Msg.vue";
import Btns from "./Components/Btns.vue";
export default defineComponent({
  components: {
    Keyboard,
    Msg,
    Btns
  },
  setup() {
    return {};
  }
});
