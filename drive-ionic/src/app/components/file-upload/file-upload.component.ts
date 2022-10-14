import { Component, Input, OnInit } from '@angular/core';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';
import { FileService } from 'src/app/services/file.service';
import { SharedService } from 'src/app/services/shared.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
})
export class FileUploadComponent implements OnInit {

  @Input() parentFolderId:string
  myFile: any;
  res: any;

  constructor(
    private alrtSer: AlertService,
    private fileSer: FileService,
    private toastSer: ToastService,
    private alertSer: AlertService,
    private authSer: AuthService,
    private sharedSer: SharedService
  ) {}

  ngOnInit() {}

  uploadFile() {
    let fData = new FormData();

    fData.append('email', this.authSer.login);
    fData.append('parentFolderId', this.parentFolderId?this.parentFolderId:'');
    fData.append('picture', this.myFile);


    if(this.parentFolderId){
      this.fileSer.uploadFileToFolder(fData,this.parentFolderId).subscribe((res) => {
        this.res = res;
  
        if (this.res.status == 200) {
          this.toastSer.presentToast('File Successfully Uploaded', 3000);
          this.sharedSer.isFileUploaded.next(true);
        } else {
          this.alertSer.presentAlert('Warning', this.res.status, this.res.msg, [
            'Ok',
          ]);
        }
      });

    }else{
      this.fileSer.fileUpload(fData).subscribe((res) => {
        this.res = res;
  
        if (this.res.status == 200) {
          this.toastSer.presentToast('File Successfully Uploaded', 3000);
          this.sharedSer.isFileUploaded.next(true);
        } else {
          this.alertSer.presentAlert('Warning', this.res.status, this.res.msg, [
            'Ok',
          ]);
        }
      });
    }

    
  }

  pickFile(e: any) {
    let myFile = e.target.files[0];

    let { size } = myFile;

    let sizeInMb = parseFloat((size / 1024 / 1024).toPrecision(2));

    if (sizeInMb > 10) {
      this.alrtSer.presentAlert(
        'Warning',
        '',
        'File Size Should Less Than 10 MB',
        ['Ok']
      );
      e.target.files = null;
    } else {
      this.myFile = myFile;
    }
  }
}
