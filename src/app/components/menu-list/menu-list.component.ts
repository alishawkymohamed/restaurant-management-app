import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuService } from '../../services/menu.service';
import { MenuItem } from '../../models/menu-item';
import { MenuCardComponent } from '../menu-card/menu-card.component';

@Component({
    selector: 'app-menu-list',
    standalone: true,
    imports: [CommonModule, MenuCardComponent],
    templateUrl: './menu-list.component.html',
    styleUrls: ['./menu-list.component.css'],
})
export class MenuListComponent implements OnInit {
    items: MenuItem[] = [];

    constructor(private menuService: MenuService) { }

    ngOnInit(): void {
        this.items = this.menuService.getMenu();
    }
}
