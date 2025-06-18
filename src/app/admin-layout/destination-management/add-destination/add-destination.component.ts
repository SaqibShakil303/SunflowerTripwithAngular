import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-add-destination',
  // standalone: true,
  // imports: [],
  templateUrl: './add-destination.component.html',
  styleUrl: './add-destination.component.scss'
})
export class AddDestinationComponent {
  @Input() mode: string = '';
}
