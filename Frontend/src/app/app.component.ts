import { Inject } from '@angular/core';
import { ApplicationRef, ChangeDetectorRef, Component, Input, OnInit, ViewChild} from '@angular/core';
import { BookServiceService } from './book-service.service';
import { HomeComponent } from './home/home.component';
import { SharedService } from './sharedservice.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ISProviders';
  @Input() length:number;
  log:string;
  books: any;
  constructor(private service:BookServiceService, private shared:SharedService,private cdr:ChangeDetectorRef){}
  ngOnInit(){
    this.log=this.shared.log;
    // this.service.getBook().subscribe((res)=>{this.books=res;this.shared.sharedBooks=this.books;
      // console.log(this.shared.sharedBooks);
  //     this.length=this.books.length;},(HttpErrorResponse)=>{console.error(HttpErrorResponse)});
  //  console.log(this.books);   
  //  this.cdr.detectChanges();
  }
  onActivate(event){
    // event.books=this.books;
    // console.log(event.books)
  }
}
