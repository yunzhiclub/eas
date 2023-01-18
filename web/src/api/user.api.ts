// import {ApiInjector, MockApiInterface, randomNumber} from '@yunzhi/ng-mock-api';
import {ApiInjector, MockApiInterface, randomNumber, randomString} from '@yunzhi/ng-mock-api';
import {HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {User} from '../entity/user';
// import {randomNumber} from '../common/utils';
// import {RoleType} from '../entity/enum/role-type';
import {Observable} from 'rxjs';
import {RoleType} from '../entity/enum/role-type';

export class UserApi implements MockApiInterface {
  public static currentLoginUser = {
    id: randomNumber(12345),
    name: randomString('name'),
    username: randomString('username'),
    email: randomString('yunzhi@'),
    identity: RoleType.manager.value,
  } as User;

  protected baseUrl = 'user';
  private sessionKey = 'currentLoginUser';

  /**
   * 设置当前登录用户
   * @param user 用户
   */
  private setCurrentLoginUser(user: User): void {
    localStorage.setItem(this.sessionKey, JSON.stringify(user));
  }

  /**
   * 获取当前登录用户
   */
  getCurrentLoginUser(): User {
    return UserApi.currentLoginUser;
  }

  getInjectors(): ApiInjector[] {
    return [
      {
        url: this.baseUrl + '/login',
        method: 'GET',
        description: '登录',
        result: (urlMatches: any, options: { headers: HttpHeaders; }) => {
          const auth = options.headers.get('Authorization');
          if (auth === null) {
            const xAuthToken = options.headers.get('x-auth-token');
            if (xAuthToken === null) {
              return new Observable<HttpErrorResponse>(subscriber => {
                subscriber.error(new HttpErrorResponse({status: 401}));
                subscriber.complete();
              });
            } else {
              return {};
            }
          } else {
            const auths = atob(auth!.substring(6)).split(':');

            const username = auths[0];
            const password = auths[1];
            // 设定为用户名不为null 密码为yunzhi 可登录
            if (username !== null && password === 'yunzhi') {
              let user: User;
              user = {
                id: randomNumber(),
                username,
                password
              } as User;
              // 设置user基本信息
              user.name = randomString('姓名');
              this.setCurrentLoginUser(user);
              return user;
            } else {
              return new Observable<HttpErrorResponse>(subscriber => {
                subscriber.error(new HttpErrorResponse({status: 401}));
                subscriber.complete();
              });
            }
          }
        }
      },
      {
        method: 'GET',
        url: this.baseUrl + '/me',
        description: '获取当前登录用户',
        result: () => {
          console.log('current');
          return this.getCurrentLoginUser();
        }
      },
    ];
  }
}
