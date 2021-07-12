<template>
  <div class="login-wrap">
    <div class="title">{{ websiteName }}</div>
    <el-form
      ref="FormRef"
      :model="modelRef"
      :rules="rule"
      class="form-box"
      label-width="80px"
    >
      <el-form-item label="用户名" prop="name">
        <el-input
          ref="nameRef"
          v-model.trim="modelRef.name"
          placeholder="请输入你的大名"
        ></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          type="password"
          v-model.trim="modelRef.password"
          placeholder="请输入你的密码"
          @keydown.enter="handleKeySubmit(isReg)"
        ></el-input>
      </el-form-item>
      <el-form-item v-if="isReg" label="确认密码" prop="confirmPassword">
        <el-input
          type="password"
          v-model.trim="modelRef.confirmPassword"
          placeholder="请输入确认密码"
          @keydown.enter="handleKeySubmit()"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <template v-if="!isReg">
          <el-button
            type="text"
            @click="handleSubmit()"
            :loading="gSubmitLoading"
            >登录</el-button
          >
          <el-button type="text" @click="replaceRouteQuery({ type: 'reg' })"
            >注册</el-button
          >
        </template>
        <template v-else>
          <el-button
            type="text"
            @click="handleSubmit(false)"
            :loading="gSubmitLoading"
            >注册</el-button
          >
          <el-button type="text" @click="replaceRouteQuery({ type: 'login' })"
            >返回登录</el-button
          >
        </template>
      </el-form-item>
    </el-form>
    <div class="title small">{{ websiteNameEn }}</div>
    <div class="overlay"></div>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, reactive, ref, toRefs } from "vue";
import { LoginDTO, RegDTO } from "/@/types/Users/dto";
import { useGRoute } from "/@/hooks/useRoute";
import { loginReq, registryReq } from "/@/api/Users";
import { encryptStrByObj } from "/@/utils/encrypt";
import { gMessage } from "/@/hooks/useMessage";
import { useStore } from "/@/store";
import { MutationTypes } from "/@/store/modules/user/mutation-types";
import { ActionTypes } from "/@/store/modules/user/action-types";
import { mainRoutePath } from "/@/const/path";
import { ElFormRefs } from "/@/types/ElementPlus";
import { useGSubmit } from "/@/hooks/useForm";
import { websiteName, websiteNameEn } from "/@/const/website";
export default defineComponent({
  setup() {
    const { pushRouteFullpath, currentQuery, replaceRouteQuery } = useGRoute();
    const { gSubmitLoading, gSubmit } = useGSubmit();

    const store = useStore();
    const FormRef = ref<ElFormRefs>();
    const nameRef = ref();
    const modelData = reactive({
      modelRef: new RegDTO()
    });
    const isReg = computed(() => {
      return currentQuery.value.type === "reg";
    });
    const methods = {
      pushRouteFullpath,
      replaceRouteQuery,
      async login() {
        const params = encryptStrByObj<LoginDTO>(modelData.modelRef, [
          "password"
        ]);
        const { data, msg } = await loginReq(params);
        if (data) {
          store.commit(MutationTypes.SET_USERINFO, data);
          await store.dispatch(ActionTypes.TOKEN_AUTH);
          const path = currentQuery.value.redirect
            ? decodeURIComponent(currentQuery.value.redirect as string)
            : mainRoutePath;
          pushRouteFullpath(path);
        } else gMessage(msg, "warning");
      },
      async registry() {
        const params = encryptStrByObj<RegDTO>(modelData.modelRef, [
          "password"
        ]);
        const { data, msg } = await registryReq(params);
        if (data) {
          gMessage("注册成功", "success");
          replaceRouteQuery({ type: "login" });
        } else gMessage(msg, "warning");
      },
      handleSubmit(flag = true) {
        if (flag) gSubmit(FormRef, methods.login);
        else gSubmit(FormRef, methods.registry);
      },
      handleKeySubmit(disabled = false) {
        if (disabled) return;
        methods.handleSubmit(!isReg.value);
      }
    };
    const validConfirmPassword = (rules: GObj, value: string, callBack: Fn) => {
      if (value !== modelData.modelRef.password)
        callBack(new Error("两次密码不一致"));
      else callBack();
    };
    const constData = {
      rule: {
        name: { required: true, message: "用户名不能为空", trigger: "blur" },
        password: { required: true, message: "密码不能为空", trigger: "blur" },
        confirmPassword: [
          { required: true, message: "确认密码不能为空", trigger: "blur" },
          { validator: validConfirmPassword, trigger: "blur" }
        ]
      }
    };

    return {
      isReg,
      FormRef,
      nameRef,
      gSubmitLoading,
      websiteName,
      websiteNameEn,
      ...toRefs(modelData),
      ...methods,
      ...constData
    };
  }
});
</script>
<style lang="scss" scoped>
.login-wrap {
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
}
.form-box {
  border-radius: 10px;
  width: 400px;
  box-sizing: border-box;
  padding: 20px;
  box-shadow: 0 0 2px 1px $--color-text-primary,
    0 0 10px 0px $--color-text-primary inset;
  position: relative;
  z-index: 2;
  :deep(label) {
    color: $--color-text-primary;
  }
  :deep(input) {
    background: transparent;
    color: $--color-text-primary;
    -webkit-text-fill-color: $--color-text-primary;
    border-color: $--color-text-primary;
    &:-webkit-autofill {
      transition: background-color 5000s ease-in-out 0s;
    }
  }
  :deep(button) {
    padding: 10px 20px;
    font-size: 18px;
  }
  :deep(.el-form-item__error) {
    color: $--color-text-regular;
  }
}
.title {
  font-size: 60px;
  font-weight: 600;
  margin: 0;
  line-height: 100px;
  text-shadow: 0 0 10px rgba(50, 255, 50, 0.5), 0 0 5px rgba(100, 255, 100, 0.5);
  color: #fff;
  animation: breathTextColor 2s infinite;
  &.small {
    animation: breathTextColor 2s 1s infinite;
    font-size: 30px;
  }
}
.overlay {
  background-image: linear-gradient(transparent 0%, rgba(10, 16, 10, 0.5) 50%);
  background-size: 1000px 2px;
  bottom: 0;
  content: "";
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
  z-index: 1;
}
@keyframes breathTextColor {
  from {
    color: #fff;
  }
  50% {
    color: #6f6;
  }
  to {
    color: #fff;
  }
}
</style>
