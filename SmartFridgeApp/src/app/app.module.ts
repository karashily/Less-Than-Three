import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { firebaseConfig } from './credentials';
import {AngularFireAuthModule} from 'angularfire2/auth'

import { FridgePage } from '../pages/fridge/fridge';
import { StatisticsPage } from '../pages/statistics/statistics';
import { AdvicePage } from '../pages/advice/advice';
import { ProfilePage } from '../pages/profile/profile';
import { TabsPage } from '../pages/tabs/tabs';
import { SplashPage } from '../pages/splash/splash';
import { SignUpLogInPage } from '../pages/signuplogin/signuplogin';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { FacialEmotionPage } from '../pages/facial-emotion/facial-emotion';
import { EmotionRecommendationPage } from '../pages/emotion-recommendation/emotion-recommendation';
import { FirebaseAuthServiceProvider } from '../providers/firebase-auth-service/firebase-auth-service';
import { SignUpPage } from '../pages/signup/signup';
import { LogInPage } from '../pages/login/login';
import { ForgotPasswordPage } from '../pages/forgot-password/forgot-password';
import { AddFoodToFridgePage } from '../pages/add-food-to-fridge/add-food-to-fridge';
import { FoodNutrientsProvider } from '../providers/food-nutrients/food-nutrients';
import { AddToGroceryListPage } from '../pages/add-to-grocery-list/add-to-grocery-list';
import { OnboardingPage } from '../pages/onboarding/onboarding';
import { EmotionNutrientRestServiceProvider } from '../providers/emotion-nutrient-rest-service/emotion-nutrient-rest-service';
import { HttpClientModule } from '@angular/common/http';
import { FoodAiServiceProvider } from '../providers/food-ai-service/food-ai-service';
import { AddFridgeItemPage } from '../pages/add-fridge-item/add-fridge-item';
import { Camera } from '@ionic-native/camera';

@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    FridgePage,
    StatisticsPage,
    AdvicePage,
    ProfilePage,
    FacialEmotionPage,
    EmotionRecommendationPage,
    SplashPage,
    SignUpLogInPage,
    SignUpPage,
    LogInPage,
    ForgotPasswordPage,
    AddFoodToFridgePage,
    AddToGroceryListPage,
    OnboardingPage,
    AddFridgeItemPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    HttpClientModule
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
    EmotionRecommendationPage,
    SplashPage,
    SignUpLogInPage,
    SignUpPage,
    LogInPage,
    ForgotPasswordPage,
    AddFoodToFridgePage,
    AddToGroceryListPage,
    OnboardingPage,
    AddFridgeItemPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    FirebaseAuthServiceProvider,
    FoodNutrientsProvider,
    EmotionNutrientRestServiceProvider,
    FoodAiServiceProvider,
    Camera
  ]
})
export class AppModule {}
