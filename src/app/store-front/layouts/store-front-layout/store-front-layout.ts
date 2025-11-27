import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarStore } from '../../components/navbar-store/navbar-store';

@Component({
  selector: 'app-store-front-layout',
  imports: [RouterOutlet, NavbarStore],
  templateUrl: './store-front-layout.html',
  styleUrls: ['./store-front-layout.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StoreFrontLayout { }
