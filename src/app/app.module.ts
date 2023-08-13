import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BookListComponent } from './book-list/book-list.component';
import { MemberListComponent } from './member-list/member-list.component';
import { TransactionListComponent } from './transaction-list/transaction-list.component';
import { InputSearchPanelComponent } from './input-search-panel/input-search-panel.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BookRentalComponent } from './book-rental/book-rental.component';
import { RouterModule } from '@angular/router'; // Import RouterModule

@NgModule({
  declarations: [
    AppComponent,
    BookListComponent,
    MemberListComponent,
    TransactionListComponent,
    InputSearchPanelComponent,
    BookRentalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot([  
      { path: 'books', component: BookListComponent },
      { path: 'members', component: MemberListComponent },
      { path: 'transactions', component: TransactionListComponent },
      { path: 'rentalbook', component: BookRentalComponent },
      { path: '', redirectTo: '/books', pathMatch: 'full' }
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
