import { Component, HostBinding } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { LanguageService } from 'src/app/Services/language.service';

@Component({
  selector: 'app-slider-page',
  templateUrl: './slider-page.component.html',
  styleUrls: ['./slider-page.component.css']
})
export class SliderPageComponent {
  bookId: string = '';
  book: { name: string, image: string, description: string[] } = { name: '', image: '', description: [] };
  language: string = 'en';

  @HostBinding('attr.dir') get dir() {
    return this.language === 'ar' ? 'rtl' : 'ltr';
  }

  constructor(
    private route: ActivatedRoute,
    private translateService: TranslateService,
    private languageService: LanguageService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.bookId = params['id']; // Ensure this matches the route parameter name
      this.loadBookDetails(this.bookId);
    });

    this.languageService.getLanguage().subscribe(language => {
      this.language = language;
      this.loadBookDetails(this.bookId); // Reload book details on language change
    });
  }

  loadBookDetails(bookId: string): void {
    const bookDetails = [
      { 
        id: '1',
        nameKey: 'SLIDER_TEXT.SLIDER1_TEXT.TITLE',
        imageKey: "./assets/Images/slider.png",
        descriptionKey: 'SLIDER_TEXT.SLIDER1_TEXT.DETAILS'
      },
      // { 
      //   id: '2',
      //   nameKey: 'SLIDER_TITLE.TITLE2',
      //   imageKey: "./assets/Images/slider.png",
      //   descriptionKey: 'SLIDER_TEXT.SLIDER2_TEXT.DETAILS'
      // },
      // { id: '3',
      //   nameKey: 'SLIDER_TITLE.TITLE3',
      //   imageKey: "./assets/Images/slider.png",
      //   descriptionKey: 'SLIDER_TEXT.SLIDER3_TEXT.DETAILS'
      // },
    ];
    
    const book = bookDetails.find(bk => bk.id === bookId);
  
    if (book) {
      this.translateService.get([book.nameKey, book.imageKey, book.descriptionKey]).subscribe(translations => {
        const descriptionObject = translations[book.descriptionKey] || {};
        
        // Convert descriptionObject to an array of strings
        const descriptionArray = Object.keys(descriptionObject)
          .map(key => descriptionObject[key])
          .filter(value => typeof value === 'string');  // Ensure value is a string
  
        // Log description to see if there's an issue
        console.log('Description Array:', descriptionArray);
    
        // Apply trimming only if there are multiple points
        const finalDescriptionArray = descriptionArray.length > 1
          ? descriptionArray.map(point => point.trim())  // Trim if there are multiple points
          : descriptionArray;  // No trimming if only one point
  
        this.book = {
          name: translations[book.nameKey],
          image: translations[book.imageKey],
          description: finalDescriptionArray
        };
      });
    }
  }
}