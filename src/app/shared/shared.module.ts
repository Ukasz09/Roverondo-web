import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card';
import { MatButton, MatButtonModule } from '@angular/material/button';

import { GlassCardComponent } from './components/glass-card/glass-card.component';
import { GlassBtnComponent } from './components/glass-btn/glass-btn.component';
import { FbIconComponent } from './components/icons/fb-icon/fb-icon.component';
import { GithubIconComponent } from './components/icons/github-icon/github-icon.component';
import { GoogleIconComponent } from './components/icons/google-icon/google-icon.component';
@NgModule({
  declarations: [GlassCardComponent, GlassBtnComponent, FbIconComponent, GithubIconComponent, GoogleIconComponent],
  imports: [CommonModule, MatCardModule, MatButtonModule],
  exports: [GlassCardComponent, GlassBtnComponent, FbIconComponent, GithubIconComponent, GoogleIconComponent],
})
export class SharedModule {}
