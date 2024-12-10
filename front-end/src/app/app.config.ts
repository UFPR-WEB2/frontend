import { provideRouter } from '@angular/router';
import { importProvidersFrom } from '@angular/core';
import { AppComponent } from './app.component';

export const appConfig = {
  providers: [  // Importe o componente standalone
    provideRouter([]),  // Caso você tenha rotas, pode configurá-las aqui
  ]
};
