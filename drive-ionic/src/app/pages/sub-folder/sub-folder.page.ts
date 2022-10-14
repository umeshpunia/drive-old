import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { AddFolderComponent } from 'src/app/components/add-folder/add-folder.component';
import { FileUploadComponent } from 'src/app/components/file-upload/file-upload.component';
import { AuthService } from 'src/app/services/auth.service';
import { FileService } from 'src/app/services/file.service';
import { FolderService } from 'src/app/services/folder.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-sub-folder',
  templateUrl: './sub-folder.page.html',
  styleUrls: ['./sub-folder.page.scss'],
})
export class SubFolderPage implements OnInit {
  folderRes: any;
  folderData: any;
  subFolderRes: any;
  subFolderData: any;
  fileRes:any
  fileData:any
  constructor(
    private ar: ActivatedRoute,
    private folderSer: FolderService,
    private authSer: AuthService,
    private modalController: ModalController,
    private sharedSer: SharedService,
    private fileSer:FileService
  ) {}

  id: any;

  ngOnInit() {
    let id = this.ar.snapshot.paramMap.get('id');
    this.id = id;
    this.getFolder(id);
    this.getFilesAndFolder(id);

    this.sharedSer.isFolderCreated.subscribe((res) => {
      if (res) {
        this.getFilesAndFolder(id);
      }
    });

    this.sharedSer.isFileUploaded.subscribe(res=>{
      if(res){
        this.getFilesAndFolder(id)
        this.modalController.dismiss()
      }
    })
  }

  // refresher
  doRefresh(event) {
    console.log('Begin async operation');

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
      this.getFilesAndFolder(this.id);
    }, 2000);
  }

  getFolder(id: string) {
    this.folderSer.getInsideFolder(id).subscribe((res) => {
      this.folderRes = res;
      console.log(res);
      if (this.folderRes.status == 200) {
        this.folderData = this.folderRes.msg;
      }
    });
  }

  getFilesAndFolder(id: string) {
    let json = {
      id,
      email: this.authSer.login,
    };
    this.folderSer.getInsideFolderFiles(json).subscribe((res) => {
      this.subFolderRes = res;
      if (this.subFolderRes.status == 200) {
        this.subFolderData=this.subFolderRes.msg;
        this.fileSer.getAllFiles(json).subscribe(res=>{
          this.fileRes=res
          if(this.fileRes.status==200){
            this.fileData=this.fileRes.msg

          }
        })
      }
    });
  }

  // modal
  //  folder
  async presentModal() {
    const modal = await this.modalController.create({
      component: AddFolderComponent,
      breakpoints: [0, 0.3, 0.5, 0.8],
      initialBreakpoint: 0.5,
      componentProps: {
        parentFolder: this.folderData.name,
        parentFolderId: this.folderData._id,
      },
    });
    await modal.present();
  }

  async presentImageModal(){
      const modal = await this.modalController.create({
        component: FileUploadComponent,
        breakpoints: [0, 0.3, 0.5, 0.8],
        initialBreakpoint: 0.5,
        componentProps: {
          parentFolder: this.folderData.name,
          parentFolderId: this.folderData._id,
        },
      });
      await modal.present();
    }
}
