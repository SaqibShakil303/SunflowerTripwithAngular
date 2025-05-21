import { Component, OnInit, ViewChild } from '@angular/core';
import { ItineraryService } from '../../../services/itinerary/itinerary.service';
import { catchError, of, tap } from 'rxjs';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Itinerary } from '../../../models/itinerary.model';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator'
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-itnerary-admin',
  standalone: true,
 imports: [
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatButtonModule,
    CommonModule,
    RouterModule
  ],
  templateUrl: './itnerary-admin.component.html',
  styleUrl: './itnerary-admin.component.scss'
})
export class ItneraryAdminComponent  implements OnInit{
 displayedColumns: string[] = [
    'id',
    'name',
    'email',
    'phone',
    'destination',
    'travelers',
    'children',
    'childAges',
    'duration',
    'date',
    'created_at'
  ];
  dataSource = new MatTableDataSource<Itinerary>([]);
  error: string | null = null;

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private itineraryService: ItineraryService) {}
  ngOnInit() {
    this.fetchItineraries();
  }

  fetchItineraries() {
    this.itineraryService.getItineraries().pipe(
      tap((itineraries) => {
        this.dataSource.data = itineraries;
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }),
      catchError((error) => {
        console.error('Error fetching itineraries:', error);
        this.error = 'Failed to load itineraries';
        return of([]);
      })
    ).subscribe();
  }

  formatDate(date: string): string {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }

  formatChildAges(ages: number[]): string {
    return ages.join(', ');
  }
}
