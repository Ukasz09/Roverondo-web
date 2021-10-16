import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Routes } from "@app/routes";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"]
})
export class NavbarComponent implements OnInit {

  constructor(private readonly router: Router) {
  }

  public ngOnInit(): void {
  }

  public navigateToHome(): void {
    this.router
      .navigateByUrl(Routes.home).then(_ => {
    });
  }
}