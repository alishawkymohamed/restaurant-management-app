import { bootstrapApplication } from '@angular/platform-browser';
import { importProvidersFrom } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app/app.component';
import { MainComponent } from './app/components/main/main.component';
import { StartersComponent } from './app/components/starters/starters.component';
import { SaladsComponent } from './app/components/salads/salads.component';
import { GrillComponent } from './app/components/grill/grill.component';
import { DessertsComponent } from './app/components/desserts/desserts.component';
import { DrinksComponent } from './app/components/drinks/drinks.component';
import { KidsComponent } from './app/components/kids/kids.component';
import { OrderSummaryComponent } from './app/components/order-summary/order-summary';
import { MealDetailsComponent } from './app/components/meal-details/meal-details.component';
import { PaymentComponent } from './app/components/payment/payment.component';
import { OrderConfirmationComponent } from './app/components/order-confirmation/order-confirmation.component';

const routes: Routes = [
  { path: '', redirectTo: '/main', pathMatch: 'full' },
  { path: 'main', component: MainComponent },
  { path: 'starters', component: StartersComponent },
  { path: 'salads', component: SaladsComponent },
  { path: 'grill', component: GrillComponent },
  { path: 'desserts', component: DessertsComponent },
  { path: 'drinks', component: DrinksComponent },
  { path: 'kids', component: KidsComponent },
  { path: 'order-summary', component: OrderSummaryComponent },
  { path: 'payment', component: PaymentComponent },
  { path: 'order-confirmation', component: OrderConfirmationComponent },
  { path: 'meal/:id', component: MealDetailsComponent },
];

bootstrapApplication(AppComponent, {
  providers: [importProvidersFrom(BrowserModule, FormsModule, RouterModule.forRoot(routes))],
}).catch((err) => console.error(err));

