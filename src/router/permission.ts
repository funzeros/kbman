import type { Router } from "vue-router";
import { nProgress } from "/@/core/nProgress";
import { loginRoutePath, roleRoutePath } from "/@/const/path";
import store from "/@/store";
import { ActionTypes } from "../store/modules/user/action-types";
export function createPermissionGuard(router: Router) {
  router.beforeEach(async (to, from, next) => {
    nProgress.start();
    const meta = to.meta || {};
    const accessToken = store.state.user.userInfo?.token;
    if (!meta.isAuth) return next();
    if (accessToken) {
      if (!meta.isRole) return next();
      else if (store.state.user.roleInfo) return next();
      else return next(roleRoutePath);
    }
    const data = await store.dispatch(ActionTypes.TOKEN_AUTH);
    if (data) {
      if (!meta.isRole) return next();
      else if (store.state.user.roleInfo) return next();
      else return next(roleRoutePath);
    }
    const redirect = encodeURIComponent(to.fullPath);
    next({
      path: loginRoutePath,
      query: {
        redirect
      }
    });
  });

  router.afterEach(() => {
    nProgress.done();
  });
}
