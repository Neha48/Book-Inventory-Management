import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DialogDeleteComponent } from 'src/app/dialog-delete/dialog-delete.component';
import { AuthService } from '../auth.service';
import { BookServiceService } from '../book-service.service';

@Component({
  selector: 'app-update',
  templateUrl:'./update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent implements OnInit {
  searchForm: any;
  deleteForm: any;
  updata: any;
  length: any;
  dedata: any;
  details: any;
  id:string;
  constructor(private formbuilder:FormBuilder,private bookservice:BookServiceService,private dialog:MatDialog,private router:Router,private auth:AuthService) {
    this.searchForm=this.formbuilder.group({btitle:['']});
    this.deleteForm=this.formbuilder.group({btitle:['',Validators.required]});
   }

  ngOnInit(): void {
    this.id=localStorage.getItem("token");
  }
  openDialog(event){
    var copy;
    var t=event.target||event.srcElement||event.currentTarget;
    const dialogConfig=new MatDialogConfig();
    dialogConfig.disableClose=true;
    dialogConfig.autoFocus=true;
    dialogConfig.data={
      id:this.dedata[0]._id,
      title:this.dedata[0].title,
      copy:this.dedata[0].copies,
      price:this.dedata[0].price
    };
    console.log(dialogConfig.data);
    this.dialog.open(DialogDeleteComponent,dialogConfig);
  }
  onSearch(){
    // var formData:FormData= new FormData();
    var title=this.searchForm.get("btitle").value;
    var category="";
    this.bookservice.searchBook(title,category).subscribe(
      res=>{this.updata=res;this.length=this.updata.length;},
      (err:HttpErrorResponse)=>{console.log(err);}
      );
  }
  onDelete(){
    var title=this.deleteForm.get("btitle").value;
    this.bookservice.searchBook(title,"").subscribe(
      res=>{this.dedata=res;this.length=this.dedata.length;console.log(this.dedata);},
      (err:HttpErrorResponse)=>{console.log(err);}
      );
  }
  logout(){
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
