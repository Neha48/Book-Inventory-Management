import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {BookServiceService} from '../book-service.service';
@Component({
  selector: 'app-dialog-component',
  templateUrl: './dialogupdate.component.html',
  styleUrls: ['./dialogupdate.component.scss']
})
export class DialogComponentComponent implements OnInit {
  form:FormGroup
  id:String
  title:String
  newcopies:number
  oldcopies:number
  op:String
  price:number
  constructor(private bookService:BookServiceService, private fb:FormBuilder,private dialogRef:MatDialogRef<DialogComponentComponent>,@Inject(MAT_DIALOG_DATA) data) {
    this.id=data.id;
    this.title=data.title;
    this.op=data.op;
    this.oldcopies=data.copy;
    this.price=data.price;
   }

  ngOnInit(): void {
    this.form=this.fb.group({
      id:[this.id,[]],
      title:[this.title,[]],
      newcopies:[this.newcopies,[]],
      op:[this.op,[]],
      price:[this.price,[Validators.required]]});
  }
  save(){
    // console.log(this.oldcopies)
    // if(this.op=='add'){
    //   this.form.patchValue({newcopies:Number(this.form.get('newcopies').value)+Number(this.oldcopies)})
    // }
    // if(this.op=="rem"){
    //   if(this.oldcopies<Number(this.form.get('newcopies').value))
    //     window.alert("There are less copies available.");
    //   else
    //     this.form.patchValue({newcopies:Number(this.oldcopies)-Number(this.form.get('newcopies').value) });
    // }
    this.bookService.updatePrice(this.form.value).subscribe(res=>{console.log(res);},HttpErrorResponse=>{console.log(HttpErrorResponse)});
    // this.bookService.updateCopies(this.form.value).subscribe(res=>{console.log(res);
    //   this.newcopies=Number(this.oldcopies)-Number(this.form.get('newcopies').value)},(err:HttpErrorResponse)=>{console.log(err)});
    // console.log(this.newcopies);
      this.dialogRef.close();
  }
  cancel(){this.dialogRef.close();}
}
