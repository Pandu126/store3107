import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CounterComponent } from './Components/counter/counter/counter.component';
import { CounterOutputComponent } from './Components/counter/counter-output/counter-output.component';
import { CounterButtonsComponent } from './Components/counter/counter-buttons/counter-buttons.component';
import { StoreModule } from '@ngrx/store';
import { MaterialModule } from './shared/material/material.module';
import { CustomCounterInputComponent } from './Components/counter/custom-counter-input/custom-counter-input.component';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './shared/home/home.component';
import { HeaderComponent } from './shared/header/header.component';
import { PostsListComponent } from './posts/posts-list/posts-list.component';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { appReducer } from './Store/app.state';
import { AddPostComponent } from './posts/add-post/add-post.component';
import { EditPostComponent } from './posts/edit-post/edit-post.component';

@NgModule({
  declarations: [
    AppComponent,
    CounterComponent,
    CounterOutputComponent,
    CounterButtonsComponent,
    CustomCounterInputComponent,
    HomeComponent,
    HeaderComponent,
    PostsListComponent,
    AddPostComponent,
    EditPostComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forRoot(appReducer),
    MatInputModule,
    // StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    StoreDevtoolsModule.instrument({ logOnly: environment.production }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
