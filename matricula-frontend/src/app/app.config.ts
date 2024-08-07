import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideToastr } from 'ngx-toastr';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [
    provideToastr(),
    provideHttpClient(),
    provideRouter(routes), 
    //provideClientHydration(), 
    provideAnimationsAsync(), provideFirebaseApp(() => initializeApp({"projectId":"matricula-c89f2","appId":"1:351728256892:web:069f58d6d5608c198dc6f9","storageBucket":"matricula-c89f2.appspot.com","apiKey":"AIzaSyDx4jP2b2QVt_dke7ulq-gtDxiI9NBovuk","authDomain":"matricula-c89f2.firebaseapp.com","messagingSenderId":"351728256892","measurementId":"G-ZBCJE0ZNLB"})), provideAuth(() => getAuth()), provideFirestore(() => getFirestore())
  ]
};
