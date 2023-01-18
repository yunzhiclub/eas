import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../../service/user.service';
import {CommonService} from '../../../service/common.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  /** 登录表单对象 */
  loginForm: FormGroup;

  /** 错误信息 */
  errorInfo: string | undefined;

  /** 提交状态 */
  submitting = false;

  showValidateCode = false;


  constructor(
    private builder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private commonService: CommonService,
    private userService: UserService
  ) {
    /** 创建登录表单 */
    this.loginForm = this.builder.group({
      username: ['', [Validators.minLength(11),
        Validators.maxLength(11),
        Validators.pattern('\\d+'),
        Validators.required]],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.errorInfo = '';
    this.loginForm.valueChanges
      .subscribe(() => {
        this.errorInfo = '';
      });
  }

  login(): void {
    const user = {
      username: this.loginForm.get('username')!.value as string,
      password: this.loginForm.get('password')!.value as string,
    };

    this.userService.login(user)
      .subscribe((data) => {
        if (data) {
          this.userService.initCurrentLoginUser(() => {
            this.commonService.success(() => this.router.navigateByUrl('/dashboard').then());
          }).subscribe();
        } else {
          this.commonService.error(() => {}, '登录失败，请检查您填写的信息是否正确');
        }
      }, () => {
        this.errorInfo = '登录失败，请检查您填写的信息是否正确';
      });
  }
}
