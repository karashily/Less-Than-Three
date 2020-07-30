import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { FridgePage } from '../pages/fridge/fridge';
import { StatisticsPage } from '../pages/statistics/statistics';
import { AdvicePage } from '../pages/advice/advice';
import { ProfilePage } from '../pages/profile/profile';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { FacialEmotionPage } from '../pages/facial-emotion/facial-emotion';
import { EmotionRecommendationPage } from '../pages/emotion-recommendation/emotion-recommendation';

@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    FridgePage,
    StatisticsPage,
    AdvicePage,
    ProfilePage,
    FacialEmotionPage,
    EmotionRecommendationPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage,
    FridgePage,
    StatisticsPage,
    AdvicePage,
    ProfilePage,
    FacialEmotionPage,
    EmotionRecommendationPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
