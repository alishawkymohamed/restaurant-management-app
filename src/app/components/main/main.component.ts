import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuService } from '../../services/menu.service';
import { CategoryStateService } from '../../services/category-state.service';
import { MenuCardComponent } from '../menu-card/menu-card.component';
import { MenuItem } from '../../models/menu-item';
import { Category } from '../../models/category';

@Component({
    selector: 'app-main-list',
    standalone: true,
    imports: [CommonModule, MenuCardComponent],
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
    items: MenuItem[] = [];
    categoryTitle: string = 'All Items';
    private selectedCategoryId: string | number = 'all';

    constructor(
        private menuService: MenuService,
        private categoryStateService: CategoryStateService
    ) { }

    ngOnInit(): void {
        // Subscribe to category changes
        this.categoryStateService.selectedCategory$.subscribe(categoryId => {
            this.selectedCategoryId = categoryId;
            this.loadItemsForCategory(categoryId);
            this.updateTitle(categoryId);
        });
    }

    private loadItemsForCategory(categoryId: string | number): void {
        this.items = this.menuService.getMenu(categoryId);
    }

    private updateTitle(categoryId: string | number): void {
        if (categoryId === 'all') {
            this.categoryTitle = 'All Items';
        } else {
            const categories = this.menuService.getCategories();
            const category = categories.find(c => c.id === categoryId);
            this.categoryTitle = category?.name || 'Menu';
        }
    }
}
