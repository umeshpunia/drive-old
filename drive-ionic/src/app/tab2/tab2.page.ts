import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { FileUploadComponent } from '../components/file-upload/file-upload.component';
import { AuthService } from '../services/auth.service';
import { FileService } from '../services/file.service';
import { SharedService } from '../services/shared.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page implements OnInit {
  constructor(
    private modalController: ModalController,
    private sharedSer: SharedService,
    private fileSer: FileService,
    private authSer: AuthService
  ) {}

  ngOnInit(): void {
    this.getAllFiles();
    this.sharedSer.isFileUploaded.subscribe((res) => {
      if (res) {
        this.getAllFiles();
        this.modalController.dismiss(null);
      }
    });
  }

  fileRes: any;
  fileData: any;
  errMsg: any;
  fileUrl = environment.mediaUrl;
  getAllFiles() {
    this.fileSer.getFiles(this.authSer.login).subscribe((res) => {
      console.log(res);
      this.fileRes = res;
      if (this.fileRes.status == 200) {
        this.fileData = this.fileRes.msg;
      } else {
        this.errMsg = this.fileRes.msg;
      }
    });
  }

  removeExtension(name: string) {
    let nameArr = name.split('.');
    let ext = nameArr[nameArr.length - 1];
    let newName = name.replace('.' + ext, '');
    return newName.length > 20 ? newName.slice(0, 20) + '...' : newName;
  }

  // refresher
  doRefresh(event) {
    console.log('Begin async operation');

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
      this.getAllFiles();
    }, 2000);
  }
  // modal
  async presentModal() {
    const modal = await this.modalController.create({
      component: FileUploadComponent,
      breakpoints: [0, 0.3, 0.5, 0.8],
      initialBreakpoint: 0.5,
    });
    await modal.present();
  }
}
