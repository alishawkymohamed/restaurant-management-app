import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MenuService } from '../../services/menu.service';
import { CategoryStateService } from '../../services/category-state.service';
import { Category } from '../../models/category';

@Component({
    selector: 'app-sidebar',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
    categories: Category[] = [];
    selectedCategoryId: string | number = 'all';

    @Output() categorySelected = new EventEmitter<string | number>();

    constructor(
        public menuService: MenuService,
        private categoryStateService: CategoryStateService
    ) { }

    ngOnInit(): void {
        this.categories = this.menuService.getCategories();

        // Subscribe to category changes from the service
        this.categoryStateService.selectedCategory$.subscribe(categoryId => {
            this.selectedCategoryId = categoryId;
        });

        // Subscribe to cart count changes
        this.menuService.cartCount$.subscribe(count => {
            console.log('Sidebar received cart count:', count);
        });
    }

    selectCategory(categoryId: string | number): void {
        this.selectedCategoryId = categoryId;
        this.categoryStateService.selectCategory(categoryId);
        this.categorySelected.emit(categoryId);
    }

    getCategoryIcon(categoryId: string | number): string {
        const iconMap: { [key: string]: string } = {
            'all': 'restaurant_menu',
            'main': 'restaurant_menu',
            'starters': 'auto_awesome',
            'salads': 'local_florist',
            'grill': 'outdoor_grill',
            'desserts': 'icecream',
            'drinks': 'local_bar',
            'kids': 'child_care'
        };
        return iconMap[String(categoryId)] || 'restaurant_menu';
    }
}

