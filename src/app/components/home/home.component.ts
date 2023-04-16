import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, filter } from 'rxjs';
import { Book } from 'src/app/core/models/book-response.model';
import { ApiService } from 'src/app/core/services/api.service';

@Component({
  selector: 'front-end-internship-assignment-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  bookSearch: FormControl;
  search: boolean;
  searchBook: string;
  books: Book[] = [];
  constructor(private apiService: ApiService) {
    this.bookSearch = new FormControl('');
    this.searchBook = '';
    this.search = false;
    this.books = [];
  }

  trendingSubjects: Array<any> = [
    { name: 'JavaScript' },
    { name: 'CSS' },
    { name: 'HTML' },
    { name: 'Harry Potter' },
    { name: 'Crypto' },
  ];

  ngOnInit(): void {
    this.bookSearch.valueChanges
      .pipe(debounceTime(300))
      .subscribe((value: string) => {
        this.books =[];
        // console.log(value);
        const offset = 0;
        const limit = 10;
        this.searchBook = value;
        this.apiService
          .searchBooks(this.searchBook, offset, limit)
          .subscribe((data) => {
            console.log(data);
            let arr = data.docs;
            console.log(arr);
            this.books.push(...arr);
            console.log('data of book', this.books);
            this.books.forEach((book) => {
              book.authors = [];
              book.authors.push({
                key: book.author_key,
                name: book.author_name,
              });
            });
            this.search = true;
          });
        console.log('Book', this.searchBook);
      });
  }
}
