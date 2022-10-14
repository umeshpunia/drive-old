import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SubFolderPageRoutingModule } from './sub-folder-routing.module';

import { SubFolderPage } from './sub-folder.page';
import { AddFolderComponent } from 'src/app/components/add-folder/add-folder.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SubFolderPageRoutingModule,
    ReactiveFormsModule,
    // AddFolderComponent
  ],
  declarations: [SubFolderPage, AddFolderComponent],
})
export class SubFolderPageModule {}
