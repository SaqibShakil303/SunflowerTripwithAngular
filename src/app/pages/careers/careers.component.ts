import { Component } from '@angular/core';
import { NavbarComponent } from "../../common/navbar/navbar.component";
import { FooterComponent } from "../../common/footer/footer.component";

@Component({
  selector: 'app-careers',
  standalone: true,
  imports: [NavbarComponent, FooterComponent],
  templateUrl: './careers.component.html',
  styleUrl: './careers.component.scss'
})
export class CareersComponent {

}
