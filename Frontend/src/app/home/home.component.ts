import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { inject } from '@angular/core/testing';
import { BookServiceService } from '../book-service.service';
import { SharedService } from '../sharedservice.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  books:any;
  totBooks:any;
  constructor(private service:BookServiceService,private shared:SharedService,private cdr:ChangeDetectorRef) { }

  ngOnInit(): void {
    // this.books=this.shared.sharedBooks;
    // console.log(this.books)
    // this.cdr.detectChanges();
    this.service.getBook().subscribe(
      (res)=>{this.books=res;document.getElementById("total").innerHTML="Total books: "+this.books.length;this.totBooks=res;console.log(res)}
    ,(HttpErrorResponse)=>{console.error(HttpErrorResponse)});
  }
  onSearch(event){
    var val=event.target.value;
    this.books=this.totBooks.filter(a=>a.title.toLowerCase().indexOf(val.toString())==0);
    console.log(this.books)
  }
  onSelect(event){
    var v = event.value;
    if(v!="")
      this.books=this.totBooks.filter(a=>a.category.toString()==v);
    else
      this.books=this.totBooks;
  }
}