import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { LoadingService } from './loading.service';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  constructor(
    private alertController: AlertController,
    private loadingSer: LoadingService
  ) {}

  async presentAlert(
    header: string,
    subHeader: string,
    message: any,
    buttons: any[]
  ) {
    this.loadingSer.dismissLoader();
    const alert = await this.alertController.create({
      header,
      subHeader,
      message,
      buttons,
    });

    await alert.present();
  }
}
