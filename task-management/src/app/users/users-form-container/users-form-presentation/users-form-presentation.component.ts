import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Employees } from '../../users.model';
import { UsersFormPresnterService } from '../users-form-presenter/users-form-presnter.service';

@Component({
  selector: 'app-users-form-presentation',
  templateUrl: './users-form-presentation.component.html',
  viewProviders: [UsersFormPresnterService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersFormPresentationComponent implements OnInit {

  @Input() public set userData(value: Employees[] | null) {
    if (value) {
      this.formTitle = "Edit Employee"
      this.usersForm.patchValue(value);
      this.usersForm.controls['password'].disable()

      this._userFormData = value
    }
  }

  public get userData(): Employees[] | null {
    return this._userFormData;
  }

  @Output() public add: EventEmitter<Employees>;
  @Output() public edit: EventEmitter<Employees>;

  public usersForm: FormGroup;
  public formTitle: string;
  public formSubmitted: boolean;
  public passwordFieldsVisibility = {
    password: 'close',
    confirmPassword: 'close',
  };

  private _userFormData: Employees[];

  constructor(private userFormPresenter: UsersFormPresnterService, private route: Router) {
    this.formSubmitted = false;
    this.add = new EventEmitter();
    this.edit = new EventEmitter();
    this.usersForm = this.userFormPresenter.buildForm();
    this.formTitle = "New Employee";

    
  }
  
  ngOnInit(): void {
    this.userFormPresenter.userFormdata$.subscribe((result: Employees) =>
    this.formTitle === "New Employee" ? this.add.emit(result) : this.edit.emit(result)
    )
  }

  public get getControls() {
    return this.usersForm.controls;
  }

  public onSubmit() {
    this.formSubmitted = !this.usersForm.valid;
    if (!this.formSubmitted) {
      this.userFormPresenter.onSubmit(this.usersForm);
    }
  }

  public onCancel() {
    this.route.navigateByUrl('users')
  }

  public setPasswordVisibility(passwordField: string, value: string) {
    let key = passwordField as keyof typeof this.passwordFieldsVisibility;
    this.passwordFieldsVisibility[key] = value;
  }

  onChange() {

  }
}
