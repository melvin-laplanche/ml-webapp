import { MdSnackBarConfig } from '@angular/material';

export interface AppConfig {
  snackBarDefault: MdSnackBarConfig,
}

export const appConfig: AppConfig = {
  snackBarDefault: {
    duration: 4000,
  }
}