import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MenuService } from '../../services/menu.service';

@Component({
    selector: 'app-sidebar',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
    constructor(public menuService: MenuService) { }

    ngOnInit(): void {
        // Subscribe to cart count changes
        this.menuService.cartCount$.subscribe(count => {
            console.log('Sidebar received cart count:', count);
        });
    }
}
