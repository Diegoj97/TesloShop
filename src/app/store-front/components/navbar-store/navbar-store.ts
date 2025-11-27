import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar-store',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar-store.html',
  styleUrls: ['./navbar-store.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarStore { }
