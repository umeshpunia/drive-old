import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'drive',
    component: TabsPage,
    children: [
      {
        path: 'folders',
        loadChildren: () =>
          import('../tab1/tab1.module').then((m) => m.Tab1PageModule),
      },
      {
        path: 'files',
        loadChildren: () =>
          import('../tab2/tab2.module').then((m) => m.Tab2PageModule),
      },
      {
        path: 'trashed',
        loadChildren: () =>
          import('../tab3/tab3.module').then((m) => m.Tab3PageModule),
      },
      {
        path: 'profile',
        loadChildren: () =>
          import('../pages/profile/profile.module').then(
            (m) => m.ProfilePageModule
          ),
      },
      {
        path: 'more',
        loadChildren: () =>
          import('../pages/more/more.module').then((m) => m.MorePageModule),
      },

      {
        path: 'folders/:id',
        loadChildren: () =>
          import('../pages/sub-folder/sub-folder.module').then(
            (m) => m.SubFolderPageModule
          ),
      },
      {
        path: '',
        redirectTo: '/drive/folders',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/drive/folders',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
