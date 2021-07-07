export class LoginDTO {
  name = "";
  password = "";
}

export class RegDTO extends LoginDTO {
  confirmPassword = "";
}

export class UserInfoDTO implements UserInfoVO {
  id = 0;
  name = "";
  token = "";
  coin = 0; // 金币
  chip = 0; // 碎片
  exp = 0; // 经验
  medal = 0; // 奖章
}
