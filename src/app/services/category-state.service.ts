import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CategoryStateService {
    private selectedCategorySubject = new BehaviorSubject<string | number>('all');
    selectedCategory$: Observable<string | number> = this.selectedCategorySubject.asObservable();

    selectCategory(categoryId: string | number): void {
        this.selectedCategorySubject.next(categoryId);
    }

    getCurrentCategory(): string | number {
        return this.selectedCategorySubject.getValue();
    }
}
