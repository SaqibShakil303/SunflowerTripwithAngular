import { Component, OnInit } from '@angular/core';
import { Destination } from '../../../models/destination.model';
import { ActivatedRoute } from '@angular/router';
import { DestinationService } from '../../../services/destination/destination.service';

@Component({
  selector: 'app-update-destination',
  // standalone: true,
  // imports: [],
  templateUrl: './update-destination.component.html',
  styleUrl: './update-destination.component.scss'
})
export class UpdateDestinationComponent implements OnInit {
  destination!: Destination;

  constructor(
    private route: ActivatedRoute,
    private destinationService: DestinationService
  ) {}

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.destinationService.getDestinationDetails(id).subscribe((res) => {
      this.destination = res;
    });
  }
}
