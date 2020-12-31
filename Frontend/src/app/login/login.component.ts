import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { BookServiceService } from '../book-service.service';
import { SharedService } from '../sharedservice.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm:FormGroup;registerForm:FormGroup;
  returnurl:String;
  cdr:ChangeDetectorRef
  constructor(private fb:FormBuilder,private bookservice:BookServiceService,private shared:SharedService,private auth:AuthService,private router:Router) { }
  // model: ILogin = { userid: "admnin", password: "admin@123" }  
  ngOnInit(): void {
    this.loginForm=this.fb.group({
      id:["",Validators.required],password:["",Validators.required]
    });
    this.registerForm=this.fb.group({
      id:['',[Validators.required,Validators.email]],
      psw:["",[Validators.required,Validators.minLength(3)]],
      confirm:["",Validators.required],
      role:["user"]
    },{validator:this.matchValidator("psw","confirm")})
    this.returnurl='./view';
    this.auth.logout();
  }
  onlogin(){    // console.log(this.loginForm.controls.id.value);
    if(this.loginForm.invalid)
      return;
    var user;
    this.bookservice.getUser(this.loginForm.controls.id.value,this.loginForm.controls.password.value).subscribe(
      res=>{
            document.getElementsByTagName("a")[1].text="Logout";
            localStorage.setItem('isLoggedIn','true');
            localStorage.setItem("token",this.loginForm.controls.id.value);
            this.shared.log="logout";
            if(res[0].role=="admin")
              this.router.navigate(['view']);
            else if(res[0].role=="user")
              this.router.navigate(['home']);
            else
              alert("Please check your credentials");
      },err=>{console.log(err)});
    console.log(user)
    this.cdr.detectChanges(); 
  }
  private matchValidator(field1: string, field2: string) {
    return function (frm) {
      let field1Value = frm.get(field1).value;
      let field2Value = frm.get(field2).value;
      if (field1Value !== '' && field1Value !== field2Value)
        return { 'notMatch': `value ${field1Value} is not equal to ${field2}` }
      return null;
    }
  }
  onregister(){
    if(this.registerForm.valid){
      this.bookservice.saveUser(this.registerForm.value).subscribe(
        res=>{this.router.navigate(['home'])},
        HttpErrorResponse=>{console.error(HttpErrorResponse)});
    }
    console.log(this.registerForm.controls.confirm.value);
  }
}
export class ILogin {      
  userid: string;    
  password: string;    
} 