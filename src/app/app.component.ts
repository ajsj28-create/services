import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Iproduct } from './models/products.type';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'http-client';
  products_url: string = 'https://angular-7ceb3-default-rtdb.asia-southeast1.firebasedatabase.app/products.json';
  
  productsArray!: Array<Iproduct>;

  constructor(
    private _httpClient: HttpClient
  ) {}

  ngOnInit(): void {
    this._httpClient.get(this.products_url).subscribe(res => {
      this.productsArray = this.objToArray(res);
    })
  }

  objToArray(data: any) {
    return Object.entries(data).map(([id, obj]) => ({id: id, ...obj as object})) as Array<Iproduct>;
  }
}