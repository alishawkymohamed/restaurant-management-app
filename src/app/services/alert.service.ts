import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface AlertConfig {
    title: string;
    message: string;
    type: 'success' | 'error' | 'info' | 'warning';
    showConfirm?: boolean;
    confirmText?: string;
    cancelText?: string;
}

@Injectable({ providedIn: 'root' })
export class AlertService {
    private alertSubject = new BehaviorSubject<AlertConfig | null>(null);
    public alert$ = this.alertSubject.asObservable();

    private resolveCallback: ((value: boolean) => void) | null = null;

    show(config: AlertConfig): Promise<boolean> {
        this.alertSubject.next(config);

        return new Promise((resolve) => {
            this.resolveCallback = (value: boolean) => {
                this.alertSubject.next(null);
                resolve(value);
            };
        });
    }

    confirm(title: string, message: string): Promise<boolean> {
        return this.show({
            title,
            message,
            type: 'info',
            showConfirm: true,
            confirmText: 'Yes',
            cancelText: 'No'
        });
    }

    success(title: string, message: string): Promise<boolean> {
        return this.show({
            title,
            message,
            type: 'success',
            showConfirm: false
        });
    }

    error(title: string, message: string): Promise<boolean> {
        return this.show({
            title,
            message,
            type: 'error',
            showConfirm: false
        });
    }

    info(title: string, message: string): Promise<boolean> {
        return this.show({
            title,
            message,
            type: 'info',
            showConfirm: false
        });
    }

    warning(title: string, message: string): Promise<boolean> {
        return this.show({
            title,
            message,
            type: 'warning',
            showConfirm: false
        });
    }

    onConfirm(): void {
        if (this.resolveCallback) {
            this.resolveCallback(true);
            this.resolveCallback = null;
        }
    }

    onCancel(): void {
        if (this.resolveCallback) {
            this.resolveCallback(false);
            this.resolveCallback = null;
        }
    }
}
