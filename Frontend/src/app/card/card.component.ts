import { Component, Input, OnInit } from '@angular/core';
import {MatDialog,MatDialogConfig} from '@angular/material/dialog';
import { DialogComponentComponent } from '../dialogupdate/dialogupdate.component';
import { SimpleChanges } from '@angular/core';
import { BookServiceService } from '../book-service.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  imgUrl: any;

  constructor(private dialog:MatDialog,private service:BookServiceService,private router:Router) { }
  @Input() book:Object;
  @Input() main:boolean;
  details:any; 
  ngOnChanges(changes:SimpleChanges){
    this.ngOnInit();
  }
  ngOnInit(): void {
    this.details=this.book;
    if(this.details.cover==undefined){
      this.details.cover=[];}
    else{
      const reader = new FileReader();
	// reader.onload = (e) => this.imgUrl = e.target.result;
	// reader.readAsDataURL(new Blob([data]));
      // const blob = new Blob([this.details.cover.data.data],{type:'image/jpeg'});
      // this.imgUrl=this.domSanitizer.bypassSecurityTrustUrl(URL.createObjectURL(blob));
      // this.base64Image = domSanitizer.bypassSecurityTrustUrl(myReader.result)
      let u=btoa([].reduce.call(new Uint8Array(this.details.cover.data.data),function(p,c){return p+String.fromCharCode(c)},''));
      this.imgUrl = 'data:'+this.details.cover.contentType+';base64,' +u;
      }
  }
  openDialog(event){
    var copy;var op;
    var t=event.target||event.srcElement||event.currentTarget;
    var id=t.attributes.id.nodeValue;
    // if(id=='addbtn'){op='add';}
    // if(id=='rembtn'){op='rem';}
    const dialogConfig=new MatDialogConfig();
    dialogConfig.disableClose=true;
    dialogConfig.autoFocus=true;
    dialogConfig.data={
      id:this.details._id,
      title:this.details.title,
      copy:this.details.copies,
      price:this.details.price,
      // op:op,
    };
    this.dialog.open(DialogComponentComponent,dialogConfig);
  }
  down(){
    if(localStorage.getItem("isLoggedIn")=="true")
      this.service.downloadBook(this.details.title).subscribe(res=>{
        console.log('start download:',res);
        var url = window.URL.createObjectURL(res);
        var a = document.createElement('a');
        document.body.appendChild(a);
        a.setAttribute('style', 'display: none');
        a.href = url;
        a.download =this.details.title+".pdf";
        a.click();
        window.URL.revokeObjectURL(url);
        a.remove(); // remove the element
      },HttpErrorResponse=>{console.error(HttpErrorResponse);});
    else
      this.router.navigate(['login']);
  }
}
