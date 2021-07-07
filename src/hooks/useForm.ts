import { Ref, ref } from "vue";
import { ElFormRef } from "/@/types/ElementPlus";
import { FieldErrorList } from "async-validator";
import { gMessage } from "./useMessage";

export function useGSubmit() {
  const gSubmitLoading = ref<boolean>(false);

  const showValidMessage = (error: FieldErrorList) => {
    for (const key in error) {
      if (Object.prototype.hasOwnProperty.call(error, key)) {
        const i = Object.keys(error).indexOf(key);
        if (i === 0) {
          const element = error[key];
          gMessage(element[0].message);
          break;
        }
      }
    }
  };

  const promiseValidate = (ref: ElFormRef | Ref<undefined>) => {
    return new Promise((resolve, reject) => {
      if (ref.value) {
        ref.value.validate((v, o) => {
          if (v) resolve(v);
          else reject(o);
        });
      }
      reject("ref组件未加载成功");
    });
  };

  const gSubmit = async (ref: ElFormRef | Ref<undefined>, cb: Fn) => {
    try {
      gSubmitLoading.value = true;
      const valid = await promiseValidate(ref);
      if (valid) {
        try {
          await cb();
        } catch (error) {
          console.log(error);
        }
      }
    } catch (error) {
      showValidMessage(error);
    } finally {
      gSubmitLoading.value = false;
    }
  };
  return {
    gSubmitLoading,
    gSubmit
  };
}
