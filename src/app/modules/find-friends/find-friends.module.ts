import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FindFriendsComponent } from "./pages";
import { AppSharedModule } from "@app/shared";
import { FindFriendsRoutingModule } from "./find-friends-routing.module";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { FormsModule } from "@angular/forms";
import { MatInputModule } from "@angular/material/input";

@NgModule({
  declarations: [
    FindFriendsComponent
  ],
  imports: [
    CommonModule,
    AppSharedModule,
    FindFriendsRoutingModule,
    MatFormFieldModule,
    MatIconModule,
    FormsModule,
    MatInputModule
  ]
})
export class FindFriendsModule {
}
