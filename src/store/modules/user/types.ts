import Game from "/@/hooks/useGame";
import { UserInfoDTO } from "/@/types/Users/dto";

// types.ts
export interface UserState {
  userInfo?: UserInfoDTO;
  roleInfo?: RoleInfoVO;
  game?: Game;
}
