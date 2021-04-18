import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { book } from './book';
import Swal from 'sweetalert2';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {

  constructor(private _auth:AuthService) { }

  book = {
    bookname :"",
    bookqty :""
  }
   
  mybook : FormGroup;

  books = [];
  ngOnInit(): void {
    this.mybook = new FormGroup({
      bookname:new FormControl(null,[Validators.required,Validators.minLength(3)]),
      bookqty:new FormControl(null,[Validators.required,Validators.min(3)])
    })
    this._auth.getBooks().subscribe((response:book[])=>{
      this.books = response;
      console.log(this.books);
      
  })
  }

  addbook(){
    this._auth.addBook(this.mybook.value).subscribe(res=>{
      console.log(this.mybook.value);
      this.mybook.reset();
      this.ngOnInit();
    })
  }

  edit(book){
    book.isEdit = true;
  }

  cancle(book){
    book.isEdit = false;
  }

  update(book){
    this._auth.update(book).subscribe(data=>{
      console.log(data);
    })
    book.isEdit = false;
  }

  delete(book){
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this data!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        Swal.fire(
          'Deleted!',
          'Your data has been deleted.',
          'success',
        )
        this._auth.delete(book).subscribe(data=>{
          console.log(data);
        })
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Your data is safe :)',
          'error'
        )
      }
    })
  }

}
