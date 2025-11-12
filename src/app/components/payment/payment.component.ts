import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MenuService } from '../../services/menu.service';
import { AlertService } from '../../services/alert.service';
import { MenuItem } from '../../models/menu-item';

@Component({
    selector: 'app-payment',
    standalone: true,
    imports: [CommonModule, FormsModule, RouterModule],
    templateUrl: './payment.component.html',
    styleUrls: ['./payment.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaymentComponent implements OnInit {
    cartItems: MenuItem[] = [];
    tableNumber: number = 12;

    // Form fields
    cardholderName: string = '';
    cardNumber: string = '';
    expiryDate: string = '';
    cvv: string = '';
    rememberMe: boolean = false;

    subtotal: number = 0;
    taxRate: number = 0.1; // 10%
    tax: number = 0;
    total: number = 0;

    isProcessing: boolean = false;

    constructor(
        private menuService: MenuService,
        private router: Router,
        private alertService: AlertService
    ) { }

    ngOnInit(): void {
        this.loadCartItems();
        this.calculateTotals();
    }

    loadCartItems(): void {
        this.cartItems = this.menuService.getCart();
    }

    calculateTotals(): void {
        this.subtotal = this.cartItems.reduce((sum, item) => {
            return sum + (item.price * (item.quantity || 1));
        }, 0);

        this.tax = parseFloat((this.subtotal * this.taxRate).toFixed(2));
        this.total = parseFloat((this.subtotal + this.tax).toFixed(2));
    }

    formatCardNumber(event: any): void {
        let value = event.target.value.replace(/\s/g, '');
        let formattedValue = value.match(/.{1,4}/g)?.join(' ') || value;
        this.cardNumber = formattedValue;
    }

    formatExpiryDate(event: any): void {
        let value = event.target.value.replace(/\D/g, '');
        if (value.length >= 2) {
            value = value.substring(0, 2) + ' / ' + value.substring(2, 4);
        }
        this.expiryDate = value;
    }

    formatCVV(event: any): void {
        this.cvv = event.target.value.replace(/\D/g, '').substring(0, 4);
    }

    validatePaymentForm(): boolean {
        if (!this.cardholderName.trim()) {
            this.alertService.error('Validation Error', 'Please enter the cardholder name.');
            return false;
        }
        if (!this.cardNumber.replace(/\s/g, '') || this.cardNumber.replace(/\s/g, '').length < 13) {
            this.alertService.error('Validation Error', 'Please enter a valid card number (16 digits).');
            return false;
        }
        if (!this.expiryDate || this.expiryDate.replace(/\s/g, '').length < 4) {
            this.alertService.error('Validation Error', 'Please enter a valid expiry date (MM / YY).');
            return false;
        }
        if (!this.cvv || this.cvv.length < 3) {
            this.alertService.error('Validation Error', 'Please enter a valid CVV (3 or 4 digits).');
            return false;
        }
        return true;
    }

    payNow(): void {
        if (!this.validatePaymentForm()) {
            return;
        }

        this.isProcessing = true;

        // Simulate payment processing
        setTimeout(() => {
            this.isProcessing = false;
            this.router.navigate(['/order-confirmation']);
        }, 2000);
    }

    backToMenu(): void {
        this.router.navigate(['/main']);
    }
}
