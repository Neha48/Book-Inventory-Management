import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BookServiceService } from '../book-service.service';

@Component({
  selector: 'app-dialog-delete',
  templateUrl: './dialog-delete.component.html',
  styleUrls: ['./dialog-delete.component.scss']
})
export class DialogDeleteComponent implements OnInit {
  id:String
  title:String
  copies:Number
  constructor(private bookService:BookServiceService, private fb:FormBuilder,private dialogRef:MatDialogRef<DialogDeleteComponent>,@Inject(MAT_DIALOG_DATA) data) {
    this.id=data.id;
    this.title=data.title;
    // this.op=data.op;
    this.copies=data.copy;
   }
  ngOnInit(): void {
  }
  delete(){
    // console.log(this.id);
    this.bookService.deleteBook(this.id).subscribe(
      (res)=>{window.alert("Book deleted successfully!!!");this.dialogRef.close();},
      (HttpErrorResponse)=>{console.error("Couldn't delete");}
    )
  }
  cancel(){this.dialogRef.close();}
}
