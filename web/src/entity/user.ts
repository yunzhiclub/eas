import {RoleType} from './enum/role-type';

export interface User {
  /**
   * 用户ID
   */
  id: number;
  /**
   * 用户姓名
   */
  name: string;
  /**
   * 用户名
   */
  username: string;

  /**
   * 密码
   */
  password: string;

  /**
   * 邮箱
   */
  email: string;

  /**
   * 身份
   */
  identity: RoleType;
}
