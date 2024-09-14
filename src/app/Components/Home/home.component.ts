import { Component, ElementRef, HostBinding, HostListener, Renderer2 } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { LanguageService } from 'src/app/Services/language.service';
import { VideoControlService } from 'src/app/Services/VideoControl.service';

declare var bootstrap: any; 

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  customOptions: OwlOptions = {
    loop: true,
    rtl: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    autoplay: true,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      740: {
        items: 1
      },
      940: {
        items: 1
      }
    },
    nav: false
  }
  private player: any;
  private isPlayerReady = false;

  language: string = 'en';
  isLoading: boolean = false;
  showScrollToTopButton = false;
  private iframe: HTMLIFrameElement | null = null;
  
  @HostBinding('attr.dir') get dir() {
    return this.language === 'ar' ? 'rtl' : 'ltr';
  }

  constructor(
    private languageService: LanguageService,
    private sanitizer: DomSanitizer,
    private el: ElementRef,
    private renderer: Renderer2,
    private videoControlService: VideoControlService
  ) { }

  ngOnInit() {
    this.isLoading = true;
    // Subscribe to language changes
    this.languageService.getLanguage().subscribe(language => {
      this.isLoading = false;
      this.language = language;
    });

    // Intersection Observer to detect when iframe is in view
    this.initIntersectionObserver();
   
  
  }

  changeLanguage(newLanguage: string) {
    this.languageService.setLanguage(newLanguage);
  }
 


  @HostListener('window:scroll', ['$event'])
  onScroll() {
    this.showScrollToTopButton = window.scrollY > 700; // Adjust as needed
  }

  getTitle(): SafeHtml {
    let titleHtml: string;
    if (this.language === 'ar') {
      titleHtml = 'مؤسسة<span class="fw-bolder">غايا</span> للابداع';
    } else {
      titleHtml = '<span class="fw-semibold ">Ghaya</span> Foundation for Creativity';
    }
    return this.sanitizer.bypassSecurityTrustHtml(titleHtml);
  }

  switchLanguage(language: string) {
    this.languageService.setLanguage(language);
  }

  private initIntersectionObserver() {
    const iframe = this.el.nativeElement.querySelector('#videoIframe');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Modify iframe src to include autoplay
          iframe.src += '&autoplay=1';
          // Optionally unobserve once the video has started
          observer.unobserve(entry.target);
        }
      });
    }, {
      rootMargin: '0px',
      threshold: 0.5 // Adjust this value as needed
    });

    // Start observing the iframe
    observer.observe(iframe);
  }
  

}