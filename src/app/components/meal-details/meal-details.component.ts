import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuItem } from '../../models/menu-item';
import { MenuService } from '../../services/menu.service';
import { MealDetailsService } from '../../services/meal-details.service';

@Component({
    selector: 'app-meal-details',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './meal-details.component.html',
    styleUrls: ['./meal-details.component.css']
})
export class MealDetailsComponent implements OnInit {
    item?: MenuItem;
    quantity: number = 1;
    isOpen: boolean = false;

    constructor(
        private menuService: MenuService,
        private mealDetailsService: MealDetailsService
    ) { }

    ngOnInit(): void {
        this.mealDetailsService.getSelectedMeal().subscribe(meal => {
            this.item = meal || undefined;
            this.quantity = 1;
        });

        this.mealDetailsService.getIsOpen().subscribe(isOpen => {
            this.isOpen = isOpen;
        });
    }

    increaseQuantity(): void {
        this.quantity++;
    }

    decreaseQuantity(): void {
        if (this.quantity > 1) {
            this.quantity--;
        }
    }

    addToOrder(): void {
        if (this.item) {
            const itemToAdd = { ...this.item, quantity: this.quantity };
            this.menuService.addToCart(itemToAdd);
            this.closeDetails();
        }
    }

    closeDetails(): void {
        this.mealDetailsService.closeMeal();
    }
}
