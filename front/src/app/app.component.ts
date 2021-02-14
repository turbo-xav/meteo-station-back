import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, ViewChild, AfterViewInit, AfterContentChecked, OnInit } from '@angular/core';
import {ChangeDetectorRef } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  @ViewChild('main', { static: false }) main: ElementRef;

  updateHeight(height: number): void{
    this.main.nativeElement.style.marginBottom = (height + 5 ) + 'px';
  }

  constructor( 
    private readonly translateService: TranslateService,
    private readonly httpService: HttpClient) { 
    this.translateService.use('fr');    
  }

  ngOnInit(): void {
    console.log('load app front');
    this.httpService.get('/api').subscribe(
      (message) => {
        console.log(message);
      }
    )
  }


}
