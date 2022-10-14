import { Component, OnInit } from '@angular/core';
import {
  CheckboxCustomEvent,
  ModalController,
  ModalOptions,
} from '@ionic/angular';
import { AddFolderComponent } from '../components/add-folder/add-folder.component';
import { AuthService } from '../services/auth.service';
import { FolderService } from '../services/folder.service';
import { SharedService } from '../services/shared.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page implements OnInit {
  folderData: any;
  resData: any;
  constructor(
    private modalController: ModalController,
    private folderSer: FolderService,
    private authSer: AuthService,
    private sharedSer: SharedService
  ) {}

  ngOnInit(): void {
    this.getFolders();
    this.sharedSer.isFolderCreated.subscribe((res) => {
      if (res) {
        this.getFolders();
      }
    });
  }

  // get folders
  getFolders() {
    this.folderSer
      .getFolders({ email: this.authSer.login })
      .subscribe((res) => {
        console.log(res);
        this.resData = res;
        if (this.resData.status == 200) {
          this.folderData = this.resData.msg;
        }
      });
  }

  // refresher
  doRefresh(event) {
    console.log('Begin async operation');

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
      this.getFolders();
    }, 2000);
  }

  // modal
  async presentModal() {
    const modal = await this.modalController.create({
      component: AddFolderComponent,
      breakpoints: [0, 0.3, 0.5, 0.8],
      initialBreakpoint: 0.5,
    });
    await modal.present();
  }
}
