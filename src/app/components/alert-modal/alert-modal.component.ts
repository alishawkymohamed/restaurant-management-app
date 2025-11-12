import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertService, AlertConfig } from '../../services/alert.service';

@Component({
    selector: 'app-alert-modal',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './alert-modal.component.html',
    styleUrls: ['./alert-modal.component.css'],
})
export class AlertModalComponent implements OnInit {
    alert: AlertConfig | null = null;

    constructor(private alertService: AlertService) { }

    ngOnInit(): void {
        this.alertService.alert$.subscribe(alert => {
            this.alert = alert;
        });
    }

    getIcon(): string {
        switch (this.alert?.type) {
            case 'success': return 'check_circle';
            case 'error': return 'error';
            case 'warning': return 'warning';
            case 'info':
            default:
                return 'info';
        }
    }

    getIconColor(): string {
        switch (this.alert?.type) {
            case 'success': return 'text-green-600 dark:text-green-400';
            case 'error': return 'text-red-600 dark:text-red-400';
            case 'warning': return 'text-yellow-600 dark:text-yellow-400';
            case 'info':
            default:
                return 'text-blue-600 dark:text-blue-400';
        }
    }

    getBackgroundColor(): string {
        switch (this.alert?.type) {
            case 'success': return 'bg-green-50 dark:bg-green-950/30';
            case 'error': return 'bg-red-50 dark:bg-red-950/30';
            case 'warning': return 'bg-yellow-50 dark:bg-yellow-950/30';
            case 'info':
            default:
                return 'bg-blue-50 dark:bg-blue-950/30';
        }
    }

    onConfirm(): void {
        this.alertService.onConfirm();
    }

    onCancel(): void {
        this.alertService.onCancel();
    }
}
