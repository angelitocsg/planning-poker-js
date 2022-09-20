import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CreateComponent } from './pages/create/create.component';
import { NewPlayerComponent } from './pages/new-player/new-player.component';
import { SessionComponent } from './pages/session/session.component';

const routes: Routes = [
  {
    path: 'session/:id',
    component: SessionComponent,
  },
  {
    path: 'session/:id/enter',
    component: NewPlayerComponent,
  },
  {
    path: '**',
    component: CreateComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
