import { Component, QueryList, ViewChildren, ViewEncapsulation, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { Platform, AlertController, IonRouterOutlet, ToastController, Config, ModalController } from '@ionic/angular';
import { AuthenticationService } from './shared/services/authentication.service';
import { TranslateService } from '@ngx-translate/core';
import { StorageService } from './shared/storage/storage.service';
import { NetworkService, ConnectionStatus } from './shared/services/network.service';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {

  @ViewChildren(IonRouterOutlet) routerOutlets: QueryList<IonRouterOutlet>;
  @ViewChild(IonRouterOutlet) routerOutlet: IonRouterOutlet;

  lastTimeBackPress = 0;
  timePeriodToExit = 2000;

  constructor(
    private platform: Platform,
    private router: Router,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authService: AuthenticationService,
    public alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private translate: TranslateService,
    private config: Config,
    private storage: StorageService,
    private networkService: NetworkService,
    public modalCtrl: ModalController,
    private screenOrientation: ScreenOrientation
  ) {

    this.initTranslate();
    this.initializeApp();
    this.backButtonEvent();

  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.checkToken();
      this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);

      if (this.networkService.getCurrentNetworkStatus() == ConnectionStatus.Offline) {
        this.showAlert('네트워크 연결 확인 바랍니다.');
        setInterval(() => {
          navigator['app'].exitApp();
        }, 3000);
      }
    });
  }

  initTranslate() {
    this.translate.setDefaultLang('ko');
    this.storage.getLang().then(lang => {
      if (!lang && this.translate.getBrowserLang() !== undefined) {
        this.translate.use(this.translate.getBrowserLang());
      } else {
        this.translate.use(lang || 'ko'); // Establezca su idioma aquí
      }
      this.translate.get(['BACK_BUTTON_TEXT']).subscribe(values => {
        this.config.set('backButtonText', values.BACK_BUTTON_TEXT);
      });
    });
  }

  checkToken() {
    this.authService.checkToken();
  }

  backButtonEvent() {
    this.platform.backButton.subscribe(async () => {

      try {
        const element = await this.modalCtrl.getTop();
        if (element) {
          element.dismiss();
          return;
        }
      } catch (error) {
        console.log(error);
      }

      this.routerOutlets.forEach((outlet: IonRouterOutlet) => {
        if (outlet && outlet.canGoBack()) {
          outlet.pop();
        }
        if (this.router.url === '/home' || this.router.url === '/login' ) {

          if (new Date().getTime() - this.lastTimeBackPress < this.timePeriodToExit) {
            navigator['app'].exitApp();

          } else {

            let toast = this.toastCtrl.create({
              message: '뒤로 버튼을 한번 더 누르시면 앱이 종료됩니다.',
              duration: 2000,
              position: 'bottom'
            });
            toast.then(toast => toast.present());
            
            this.lastTimeBackPress = new Date().getTime();
          }
            /*
            let alert = this.alertCtrl.create({
              header: '종료창',
              message: '앱을 종료하시겠습니까?',
              buttons: [
                {
                  text: '취소',
                  role: 'cancel'
                },
                {
                  text: '종료',
                  handler: () => {
                    navigator['app'].exitApp();
                  }
                }
              ]
            });
            alert.then(alert => alert.present());
            */
        }
      });
    });
  }

  async presentToast(text) {
    const toast = await this.toastCtrl.create({
      message: text,
      position: 'bottom',
      duration: 2000
  });
  toast.present();
  }

  showAlert(msg) {
    let alert = this.alertCtrl.create({
      message: msg,
      header: '알림',
      buttons: ['확인']
    });
    alert.then(alert => alert.present());
  }
  
}
