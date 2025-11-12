import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuService } from '../../services/menu.service';
import { MenuCardComponent } from '../menu-card/menu-card.component';
import { MenuItem } from '../../models/menu-item';

@Component({
    selector: 'app-salads',
    standalone: true,
    imports: [CommonModule, MenuCardComponent],
    templateUrl: './salads.component.html',
    styleUrls: ['./salads.component.css'],
})
export class SaladsComponent implements OnInit {
    items: MenuItem[] = [];

    constructor(private menuService: MenuService) { }

    ngOnInit(): void {
        // Show the same dishes as the Main Dishes page per request
        this.items = this.menuService.getMenu().filter((i) => i.category === 'main');
    }
}
