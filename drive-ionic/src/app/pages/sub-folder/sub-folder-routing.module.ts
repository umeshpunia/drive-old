import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SubFolderPage } from './sub-folder.page';

const routes: Routes = [
  {
    path: '',
    component: SubFolderPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SubFolderPageRoutingModule {}
