import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {ImageSearchComponent} from "./component/image-search/image-search.component";
import {CommonModule} from "@angular/common";
import {BrowserModule} from "@angular/platform-browser";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ImageSearchComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'testtaskfront';
}
