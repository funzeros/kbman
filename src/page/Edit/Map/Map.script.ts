import { defineComponent, onMounted, onUnmounted, ref } from "vue";
import Edit from "/@/hooks/useEdit";
export default defineComponent({
  props: {
    mapList: {
      type: Array as PropType<MapBlockVO[]>,
      required: true
    }
  },
  setup(props) {
    const mapWrapRef = ref();
    let edit: Edit | undefined;
    onMounted(() => {
      edit = new Edit(mapWrapRef.value);
      edit.renderMap(props.mapList);
      edit.registeredControl();
    });
    onUnmounted(() => {
      edit?.cancelledControl();
    });
    const methods = {
      refreshBlock() {
        edit?.mapContainer.removeChildren(
          0,
          edit?.mapContainer.children.length
        );
        edit?.renderMap(props.mapList);
      }
    };
    return {
      mapWrapRef,
      ...methods
    };
  }
});
