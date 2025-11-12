import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MenuService } from '../../services/menu.service';
import { AlertService } from '../../services/alert.service';
import { MenuItem } from '../../models/menu-item';

@Component({
    selector: 'app-order-confirmation',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './order-confirmation.component.html',
    styleUrls: ['./order-confirmation.component.css'],
})
export class OrderConfirmationComponent implements OnInit {
    orderNumber: string = '';
    tableNumber: number = 0;
    cartItems: MenuItem[] = [];
    subtotal: number = 0;
    tax: number = 0;
    total: number = 0;
    taxRate: number = 0.1; // 10%
    isDetailsOpen: boolean = true;

    constructor(
        private router: Router,
        private menuService: MenuService,
        private alertService: AlertService
    ) { }

    ngOnInit(): void {
        this.generateOrderNumber();
        this.loadOrderDetails();
    }

    generateOrderNumber(): void {
        // Generate a random order number like #ABC123
        const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const numbers = '0123456789';
        let orderNum = '#';

        for (let i = 0; i < 3; i++) {
            orderNum += letters.charAt(Math.floor(Math.random() * letters.length));
        }
        for (let i = 0; i < 3; i++) {
            orderNum += numbers.charAt(Math.floor(Math.random() * numbers.length));
        }

        this.orderNumber = orderNum;
    }

    loadOrderDetails(): void {
        this.cartItems = this.menuService.getCart();
        this.calculateTotals();
        // In a real app, you'd get tableNumber from a service or state management
        this.tableNumber = 12;
    }

    calculateTotals(): void {
        this.subtotal = this.cartItems.reduce((sum, item) => {
            return sum + (item.price * (item.quantity || 1));
        }, 0);

        this.tax = parseFloat((this.subtotal * this.taxRate).toFixed(2));
        this.total = parseFloat((this.subtotal + this.tax).toFixed(2));
    }

    continueBrowsing(): void {
        this.menuService.clearCart();
        this.router.navigate(['/main']);
    }

    async contactStaff(): Promise<void> {
        await this.alertService.success('Staff Notified', 'A server will be with you shortly. Thank you for your patience!');
    }

    toggleDetails(): void {
        this.isDetailsOpen = !this.isDetailsOpen;
    }
}
