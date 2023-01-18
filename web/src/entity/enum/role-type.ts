/**
 * 用户角色
 */
import {StatusEnum} from './statusEnum';

export type RoleType = 0 | 1 | 2;

export const RoleType = {
  manager: {
    value: 0 as RoleType,
    description: '管理员',
  } as StatusEnum<RoleType>,
  teacher: {
    value: 1 as RoleType,
    description: '老师',
  } as StatusEnum<RoleType>,
  student: {
    value: 2 as RoleType,
    description: '学生',
  } as StatusEnum<RoleType>,
};
