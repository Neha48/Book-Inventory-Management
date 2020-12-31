import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http'
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class BookServiceService {
  
  url:string="http://localhost:8000/api/getBooks"
  constructor(private http:HttpClient) { }
  getUser(id, psw) {
    let params = new HttpParams().set("id",id).append("psw",psw);
    return this.http.get("/api/users",{params:params});
  }
  saveUser(formdata){
    return this.http.post("/api/user",formdata);
  }
  getBook(){return this.http.get(this.url);}
  saveBook(formdata){
    return this.http.post("/api/saveBooks",formdata);
  }  
  searchBook(title,category) {
    let params = new HttpParams()
    if(title!="")
      params=params.append('title',title)
    if(category!="")
      params=params.append('category',category);
    return this.http.get("/api/books/",{params});
  }
  updateCopies(formData){
    return this.http.put("/api/updateCopies",formData);
  }
  updatePrice(formData) {
    return this.http.put("/api/updatePrice",formData);
  }
  deleteBook(id){
    let params = new HttpParams().set('id',id)
    // console.log(params.toString())
    let options = { params: params };
    return this.http.delete("/api/deleteBooks/",options);
  }
  downloadBook(title):Observable<Blob>{
    let params = new HttpParams().set('title',title)
    // let options = { };
    let headers = new HttpHeaders().set('Accept','application/pdf');
    return this.http.get("/api/download/",{params: params ,headers:headers,responseType:'blob'})
  }
}
