import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FolderPageRoutingModule } from './folder-routing.module';

import { FolderPage } from './folder.page';
import { AddFolderComponent } from 'src/app/components/add-folder/add-folder.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FolderPageRoutingModule,
    AddFolderComponent,
    ReactiveFormsModule,
  ],
  declarations: [FolderPage],
})
export class FolderPageModule {}
