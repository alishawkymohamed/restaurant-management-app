import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MenuService } from '../../services/menu.service';
import { AlertService } from '../../services/alert.service';
import { MenuItem } from '../../models/menu-item';

@Component({
    selector: 'app-order-summary',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './order-summary.html',
    styleUrls: ['./order-summary.css']
})
export class OrderSummaryComponent implements OnInit {
    cartItems: MenuItem[] = [];
    tableNumber: string = '';
    subtotal: number = 0;
    taxesAndFees: number = 0;
    total: number = 0;

    constructor(
        private menuService: MenuService,
        private router: Router,
        private alertService: AlertService
    ) { }

    ngOnInit(): void {
        this.cartItems = this.menuService.getCart();
        this.calculateTotals();
    }

    calculateTotals(): void {
        this.subtotal = this.cartItems.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
        this.taxesAndFees = parseFloat((this.subtotal * 0.09).toFixed(2));
        this.total = this.subtotal + this.taxesAndFees;
    }

    updateQuantity(item: MenuItem, quantity: number): void {
        if (quantity > 0) {
            item.quantity = quantity;
            this.calculateTotals();
        }
    }

    removeItem(item: MenuItem): void {
        this.menuService.removeFromCart(item.id);
        this.cartItems = this.menuService.getCart();
        this.calculateTotals();
    }

    backToMenu(): void {
        this.router.navigate(['/menu']);
    }

    proceedToCheckout(): void {
        if (this.cartItems.length === 0) {
            this.alertService.error('Empty Cart', 'Your cart is empty. Please add items before proceeding to checkout.');
            return;
        }
        if (!this.tableNumber) {
            this.alertService.error('Table Number Required', 'Please enter your table number to proceed.');
            return;
        }
        this.router.navigate(['/payment']);
    }
}
