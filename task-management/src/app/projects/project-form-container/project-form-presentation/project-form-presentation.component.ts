import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Users } from 'src/app/users/users.model';
import { Project } from '../../project.model';
import { ProjectFormPresenterService } from '../project-form-presenter/project-form-presenter.service';

@Component({
  selector: 'app-project-form-presentation',
  templateUrl: './project-form-presentation.component.html'
})
export class ProjectFormPresentationComponent implements OnInit {

  @Input() public set projectData(value: Project[] | null) {
    if (value) {
      this._projectData = value;
    }
  }

  public get projectData(): Project[] | null {
    return this._projectData;
  }

  @Input() public set teamMembers(value: Users[] | null) {
    if (value) {
      this._teamMembers = value;
    }
  }

  public get teamMembers(): Users[] | null {
    return this._teamMembers;
  }

  @Output() public add: EventEmitter<Project>;

  public projectForm: FormGroup;

  private _projectData: Project[];
  private _teamMembers: Users[];

  constructor(private projectFormPresenter: ProjectFormPresenterService, private route: Router) {
    this.projectForm = this.projectFormPresenter.buildform()
    this.add = new EventEmitter();
  }

  ngOnInit(): void {
    this.projectFormPresenter.projectFormData$.subscribe((data) => {
      this.add.emit(data);
    })
  }

  public onSubmit() {
    this.projectFormPresenter.onSubmit(this.projectForm);
  }

  public onCancel() {
    this.route.navigateByUrl('project-list')
  }

}
