import ElForm from "element-plus/es/el-form";
import ElFormItem from "element-plus/es/el-form/src/form-item.vue";
import { Ref } from "vue";

type ElFormRefs = InstanceType<typeof ElForm>;
type ElFormItemRefs = InstanceType<typeof ElFormItem>;

type ElFormRef = Ref<ElFormRefs>;
type ElFormItemRef = Ref<ElFormItemRefs>;
