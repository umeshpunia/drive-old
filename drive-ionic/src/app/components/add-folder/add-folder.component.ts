import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';
import { FolderService } from 'src/app/services/folder.service';
import { ModalService } from 'src/app/services/modal.service';
import { SharedService } from 'src/app/services/shared.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-add-folder',
  templateUrl: './add-folder.component.html',
  styleUrls: ['./add-folder.component.scss'],
})
export class AddFolderComponent implements OnInit {
  folderForm!: FormGroup;

  res: any;

  @Input() parentFolder: string;
  @Input() parentFolderId: string;
  constructor(
    private formBuilder: FormBuilder,
    private folderSer: FolderService,
    private authSer: AuthService,
    private sharedSer: SharedService,
    private modalSer: ModalService,
    private alrtSer: AlertService,
    private toastSer: ToastService
  ) {}

  ngOnInit() {
    console.log(this.parentFolder);
    this.folderForm = this.formBuilder.group({
      name: '',
    });
  }

  create() {
    let fData = this.folderForm.value;
    let json = {
      name: fData.name,
      email: this.authSer.login,
      parentFolderId: '',
    };

    if (!this.parentFolderId) {
      this.folderSer.createFolder(json).subscribe((res) => {
        console.log('main', res);
        this.res = res;
        if (this.res.status == 200) {
          this.sharedSer.isFolderCreated.next(true);
          this.toastSer.presentToast(
            `Your Folder ${json.name} Created Successfully`,
            3000
          );
          this.modalSer.dismiss();
        } else {
          this.alrtSer.presentAlert('Error', '', 'Please Try Again', ['Ok']);
        }
      });
    } else {
      let json = {
        name: fData.name,
        email: this.authSer.login,
        parentFolderId: this.parentFolderId,
      };
      this.folderSer.createSubFolder(json).subscribe((res) => {
        console.log('child', res);
        this.res = res;
        if (this.res.status == 200) {
          this.sharedSer.isFolderCreated.next(true);
          this.toastSer.presentToast(
            `Your Folder ${json.name} Created Successfully`,
            3000
          );
          this.modalSer.dismiss();
        } else {
          this.alrtSer.presentAlert('Error', '', 'Please Try Again', ['Ok']);
        }
      });
    }
  }
}
