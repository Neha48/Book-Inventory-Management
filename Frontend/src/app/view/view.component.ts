import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BookServiceService } from '../book-service.service';
import { SharedService } from '../sharedservice.service';

@Component({
  selector: 'app-view',
  templateUrl:'./view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {
  title = 'ISProviders';
  books:any;
  imgSrc:any;
  totBooks:any;
  // detail:any;
  // detail:{title:'',author:'',publisher:'',category:'',isbn:'',price:'',copies:''};
  search:string;
  @Input() detail;
  @Output() length = new EventEmitter<number>();
  constructor(private service:BookServiceService,private shared:SharedService,private cdr:ChangeDetectorRef){}
  ngOnInit(){
    console.log(this.shared.log);
    this.service.getBook().subscribe(
      (res)=>{this.books=res;this.totBooks=res;console.log(res);document.getElementById("total").innerText="Total books : "+this.totBooks.length;}
      ,(HttpErrorResponse)=>{console.error(HttpErrorResponse)});
    // this.length.emit(this.books.length);
 }
  getDetails(event){
    var t=event.target||event.srcElement||event.currentTarget;
    var id = t.attributes.id.nodeValue;
    this.detail=this.books.filter(a=>a.isbn==id)[0];
    this.cdr.detectChanges();
    // document.getElementById("card").setAttribute('book',this.detail);
    this.length.emit(this.detail.length);
    // ApplicationRef.bind(this.detail);
    this.cdr.markForCheck();
  }
 
  onRb(event){
    var t=event.target||event.srcElement||event.currentTarget;
    var val=t.attributes.value.nodeValue;
    if(val=='price'){
      this.books.sort((a,b)=>{return (a.price)-(b.price);      })
      // console.log(this.books)
    }
  }
  onSearch(event){
    this.search =event.target.value;
    // console.log(this.search);
    const c=this.totBooks.filter(a=>a.title.toString().toLowerCase().indexOf(this.search.toString())==0);
    console.log(c)
    this.books=c
  }
  download(){
    console.log(this.detail)
    window.print()
    // File f = new File(btoa(this.books),"hi")
  }

}
