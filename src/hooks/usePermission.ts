import { useStore } from "/@/store";
import { useRoute } from "vue-router";

export const useIepPermission = () => {
  const store = useStore();
  const route = useRoute();
  const matchedArr = route.path.split("/");
  const matched = [];
  for (let sI = 3; sI < matchedArr.length; sI++) {
    const ele = matchedArr[sI];
    if (/^[0-9]*$/.test(ele)) {
      break;
    } else if (/[p,P]age$/.test(ele)) {
      continue;
    } else {
      matched.push(ele);
    }
  }
  console.log(matched.join("/"));
  return {
    p:
      (store.getters.userPermission as Map<string, string[]>).get(
        matched.join("/")
      ) ?? []
  };
};
