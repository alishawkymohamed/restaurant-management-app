import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuItem } from '../../models/menu-item';
import { MenuService } from '../../services/menu.service';
import { MealDetailsService } from '../../services/meal-details.service';

@Component({
    selector: 'app-menu-card',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './menu-card.component.html',
    styleUrls: ['./menu-card.component.css'],
})
export class MenuCardComponent {
    @Input() item!: MenuItem;

    constructor(
        private menuService: MenuService,
        private mealDetailsService: MealDetailsService
    ) { }

    add() {
        this.item.quantity = 1;
        this.menuService.addToCart(this.item);
    }

    viewDetails(): void {
        if (!this.item) { return; }
        this.mealDetailsService.openMeal(this.item);
    }
}
