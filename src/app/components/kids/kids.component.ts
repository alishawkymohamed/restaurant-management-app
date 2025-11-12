import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuService } from '../../services/menu.service';
import { MenuCardComponent } from '../menu-card/menu-card.component';
import { MenuItem } from '../../models/menu-item';

@Component({
    selector: 'app-kids',
    standalone: true,
    imports: [CommonModule, MenuCardComponent],
    templateUrl: './kids.component.html',
    styleUrls: ['./kids.component.css'],
})
export class KidsComponent implements OnInit {
    items: MenuItem[] = [];

    constructor(private menuService: MenuService) { }

    ngOnInit(): void {
        // Show the same dishes as the Main Dishes page per request
        this.items = this.menuService.getMenu().filter((i) => i.category === 'main');
    }
}
