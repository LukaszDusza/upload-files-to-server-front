import { Component, OnInit } from '@angular/core';
import { MainService } from '../main.service';
import { Book } from '../objects/book';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private mainServie: MainService) { }

  ngOnInit() {
    this.getBooks();
  }

  books = new Array<Book>();
  
  getBooks() {
    this.mainServie.getTable("http://localhost:8080/books").subscribe(result => {    
      
    result.map(book => {
      this.books.push(book);
      });
    }
    ), err => {}, () => {
      
    };

  }

}
