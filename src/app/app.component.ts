import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeaderComponent } from './components/header/header.component';
import { MealDetailsComponent } from './components/meal-details/meal-details.component';
import { AlertModalComponent } from './components/alert-modal/alert-modal.component';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [CommonModule, RouterModule, SidebarComponent, HeaderComponent, MealDetailsComponent, AlertModalComponent],
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
    isOrderSummaryPage: boolean = false;

    constructor(private router: Router) { }

    ngOnInit(): void {
        this.router.events
            .pipe(filter(event => event instanceof NavigationEnd))
            .subscribe((event: any) => {
                this.isOrderSummaryPage = event.url.includes('/order-summary') || event.url.includes('/payment') || event.url.includes('/order-confirmation');
            });
    }
}
