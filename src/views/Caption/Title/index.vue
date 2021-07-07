<template>
  <div class="startup">
    <div class="info">
      <p>您已攻破主机防火墙,<br />您需要暴力破解访问密码...</p>
      <p class="">按下任意键<span class="blink">_</span></p>
    </div>
    <div class="password" v-show="pShowFlag" @click="hack()">
      {{ innerText }}
    </div>
    <div class="button start" v-show="!pShowFlag" @click="start()">
      开始骇入!
    </div>
    <div class="blink granted" v-show="gShowFlag">授权许可!</div>
  </div>
</template>
<script lang="ts">
import {
  computed,
  defineComponent,
  onMounted,
  onUnmounted,
  reactive,
  ref,
  toRefs
} from "vue";
import { mainRoutePath } from "/@/const/path";
import { useGRoute } from "/@/hooks/useRoute";
import { GMath } from "/@/utils/custom";
export default defineComponent({
  setup() {
    const { pushRouteFullpath } = useGRoute();
    const passwords = ["KeyboardMan", "MajorCombat"];
    const modelData = reactive({
      pShowFlag: false,
      gShowFlag: false,
      disappear: false,
      password: "",
      counter: 0,
      innerText: ""
    });
    let interval: NodeJS.Timer;
    const characters = ref<string[]>([]);
    const passwordList = computed(() => modelData.password.split(""));
    const methods = {
      init() {
        modelData.password = GMath.randomArray(passwords);
        interval = setInterval(function () {
          passwordList.value.forEach((m, i) => {
            characters.value[i] =
              i < modelData.counter
                ? modelData.password.charAt(i)
                : Math.random().toString(36).charAt(2);
          });
          modelData.innerText = characters.value.join("");
          if (modelData.counter === modelData.password.length)
            clearInterval(interval);
        }, 25);
        document.body.addEventListener("keydown", methods.hack);
      },
      hack() {
        if (!modelData.pShowFlag) return methods.start();
        if (++modelData.counter === modelData.password.length) {
          modelData.gShowFlag = true;
          return;
        }
        if (modelData.counter > modelData.password.length) {
          pushRouteFullpath(mainRoutePath);
        }
      },
      start() {
        modelData.pShowFlag = true;
      }
    };
    onMounted(() => {
      methods.init();
    });
    onUnmounted(() => {
      document.body.removeEventListener("keydown", methods.hack);
    });
    return {
      ...toRefs(modelData),
      ...methods,
      characters
    };
  }
});
</script>
<style lang="scss" scoped>
@keyframes blink {
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}

.startup {
  height: 100%;
  width: 100%;
  color: $--color-text-primary;
  font-family: "Share Tech Mono", monospace;
}

.startup .password {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 60px;
  letter-spacing: 5px;
  text-transform: uppercase;
}

.startup .granted {
  position: absolute;
  top: 75%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 30px;
}

.startup .info {
  position: absolute;
  top: 0;
  left: 0;
}
.startup .info p {
  margin: 10px;
  line-height: 24px;
}

.startup .button {
  background-color: #111;
  border: solid 1px $--color-text-primary;
  padding: 8px 25px;
  font-size: 26px;
  letter-spacing: 2px;
  cursor: pointer;
  &:hover {
    background: rgba($color: $--color-primary, $alpha: 0.1);
  }
}

.startup .start {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.startup .blink {
  will-change: opacity;
  animation: blink 0.8s steps(1, start) infinite alternate;
}
</style>
