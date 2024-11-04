import { inject, Injectable } from '@angular/core';
import { DEFAULT_TOAST_TIMEOUT } from '../constants';
import { ToastVariant } from '../types';
import { ToastService } from './toast.service';

@Injectable({
  providedIn: 'root',
})
export class ToastSetupService {
  private readonly toastService = inject(ToastService);

  public setupToast(
    show: boolean,
    message: string,
    variant: ToastVariant = 'success',
    timeout: number = DEFAULT_TOAST_TIMEOUT
  ): void {
    this.toastService.updateToastState({
      showToast: show,
      toastMessage: message,
      toastVariant: variant,
      timeout,
    });
  }
}
