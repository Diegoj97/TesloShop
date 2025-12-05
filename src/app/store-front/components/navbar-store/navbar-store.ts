import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Auth } from '../../../auth/services/auth';

@Component({
  selector: 'app-navbar-store',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar-store.html',
  styleUrls: ['./navbar-store.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarStore {

  auhtService = inject(Auth);
 }
