import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VideoControlService {

  private videoActionSubject = new Subject<'play' | 'stop'>();
  videoAction$ = this.videoActionSubject.asObservable();

  playVideo() {
    this.videoActionSubject.next('play');
  }

  stopVideo() {
    this.videoActionSubject.next('stop');
  }
}
