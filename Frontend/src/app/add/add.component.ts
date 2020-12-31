import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { BookServiceService } from '../book-service.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  uploadForm: any;
  file: any ;
  imgSrc: any;
  id: string;
  constructor(private formbuilder: FormBuilder,private bookservice:BookServiceService,private dialog:MatDialog,private auth:AuthService,private router:Router) { 
    this.uploadForm=this.formbuilder.group({
      ttl :['',Validators.required],
      ath:['',Validators.required],
      pub:['',Validators.required],
      isbn:['',[Validators.required,this.validateISBN]],
      cat:[''],
      prc:0,
      cpy:0
    });
    // this.searchForm=this.formbuilder.group({btitle:[''],cselect:['']});
    // this.deleteForm=this.formbuilder.group({btitle:['',Validators.required]});
  }
  ngOnInit(): void {
    this.id=localStorage.getItem("token");
  }
  validateISBN(control:AbstractControl) {
    if (control.value && control.value.length != 10) {
      return { 'validateISBN': true };
    }
    return null;
  }
  get f(){return this.uploadForm.controls;}
onSubmit(){
    if(this.uploadForm.valid){
      var formData:FormData= new FormData();
      formData.set("title",this.uploadForm.get("ttl").value);
      formData.set("author",this.uploadForm.get("ath").value);
      formData.set("publisher",this.uploadForm.get("pub").value);
      formData.set("category",this.uploadForm.get("cat").value);
      formData.set("isbn",this.uploadForm.get("isbn").value);
      formData.set("price",this.uploadForm.get("prc").value);
      formData.set("copies",this.uploadForm.get("cpy").value);
      formData.set("cover",this.file);
      // console.log(formData.get('cvr').toString());
      // console.log(formData.forEach((data,err)=>{console.log(data)}));
      this.bookservice.saveBook(formData).subscribe(res=>{console.log(res);},(err:HttpErrorResponse)=>{console.log(err)});
    }
    else
      console.log("err");
    // this.uploadForm.resetForm();
    // console.log(this.uploadForm.get("pub").value);
  }
onPreview(event:any){
    if(event.target.files && event.target.files[0]){
      this.file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = e=>{this.imgSrc=reader.result;}
      reader.readAsDataURL(this.file);
      var t=document.getElementsByName("imgcvr")[0].style.display="block";
      console.log(t);
    }
  }
  logout(){
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
