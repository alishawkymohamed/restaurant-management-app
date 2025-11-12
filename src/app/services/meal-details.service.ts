import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { MenuItem } from '../models/menu-item';

@Injectable({ providedIn: 'root' })
export class MealDetailsService {
    private selectedMeal$ = new BehaviorSubject<MenuItem | null>(null);
    private isOpen$ = new BehaviorSubject<boolean>(false);

    getSelectedMeal(): Observable<MenuItem | null> {
        return this.selectedMeal$.asObservable();
    }

    getIsOpen(): Observable<boolean> {
        return this.isOpen$.asObservable();
    }

    openMeal(item: MenuItem): void {
        this.selectedMeal$.next(item);
        this.isOpen$.next(true);
    }

    closeMeal(): void {
        this.isOpen$.next(false);
        this.selectedMeal$.next(null);
    }
}
