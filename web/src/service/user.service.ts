import { Injectable } from '@angular/core';
import {User} from '../entity/user';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject, Observable, ReplaySubject} from 'rxjs';
import {tap} from 'rxjs/operators';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  protected baseUrl = 'user';
  private currentLoginUser: User | null | undefined;


  constructor(protected httpClient: HttpClient,
              private router: Router,
              // private commonService: CommonService,
              ) {
  }

  /**
   * buffer 设置为 1
   * 只保留最新的登录用户
   */
  protected currentLoginUserSubject = new BehaviorSubject<User | null | undefined>(undefined);
  // currentLoginUser$ = this.currentLoginUserSubject.asObservable();

  /**
   * 请求当前登录用户
   */
  initCurrentLoginUser(callback?: () => void): Observable<User> {
    return new Observable<User>(subscriber => {
      this.httpClient.get<User>(`${this.baseUrl}/me`)
        .subscribe({
          next: (user: User) => {
            this.currentLoginUser = user;
            console.log('initCurrentLoginUser', user);
            this.setCurrentLoginUser(user);
            subscriber.next();
          },
          error: () => {
            console.log('initCurrentLoginUser2', );
            if (callback) {
              callback();
            }
            subscriber.error();
          },
          complete: () => {
            console.log('initCurrentLoginUser3', );
            if (callback) {
              callback();
            }
            subscriber.complete();
          }
        });
    });
  }

  /**
   * 登录用户
   */
  login(user: { username: string, password: string}): Observable<User> {
    // 新建Headers，并添加认证信息
    let headers = new HttpHeaders();
    // 添加 content-type
    headers = headers.append('Content-Type', 'application/x-www-form-urlencoded');
    // 添加认证信息
    headers = headers.append('Authorization',
      'Basic ' + btoa(user.username + ':' + encodeURIComponent(user.password)));
    // 发起get请求并返回
    return this.httpClient.get<User>(`${this.baseUrl}/login`, {headers})
      .pipe(tap(data => {
        console.log('登录返回结果', data);
      }));
  }

  /**
   * 设置当前登录用户
   * @param user 登录用户
   */
  setCurrentLoginUser(user: User | undefined): void {
    if (user !== this.currentLoginUserSubject.value) {
      this.currentLoginUserSubject.next(user);
    }
    if (user === undefined) {
      this.router.navigateByUrl('/login').then();
    }
  }
}
