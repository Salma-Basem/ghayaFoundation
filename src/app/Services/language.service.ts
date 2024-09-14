import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private languageSubject = new BehaviorSubject<string>('ar');
  language$ = this.languageSubject.asObservable();
  currentLanguage = 'ar';

  constructor(private translateService: TranslateService) {
    this.translateService.setDefaultLang('ar');
    this.setLanguage('ar');
  }

  getLanguage() {
    return this.language$;
  }

  setLanguage(language: string) {
    this.translateService.use(language);
    this.languageSubject.next(language);
    this.currentLanguage = language;
    this.updateDirection(language); // Update direction internally
  }

  private updateDirection(language: string) {
    const dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.setAttribute('dir', dir);
  }
}
