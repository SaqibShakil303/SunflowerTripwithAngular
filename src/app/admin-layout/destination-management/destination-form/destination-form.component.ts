import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Destination } from '../../../models/destination.model';
import { DestinationService } from '../../../services/destination/destination.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-destination-form',
  templateUrl: './destination-form.component.html',
  styleUrls: ['./destination-form.component.scss']
})
export class DestinationFormComponent implements OnInit {
  @Input() mode: 'add' | 'edit' = 'add';
  @Input() data: Destination | null = null;
// mode: 'add' | 'edit' = 'add';
// data: Destination | null = null;

  selectedTabIndex = 0;
  destinationForm!: FormGroup;

  constructor(private fb: FormBuilder,
    private destinationService: DestinationService,
      private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // this.destinationForm = this.fb.group({
    //   destination: this.fb.group({
    //     title: ['', Validators.required],
    //     image_url: [''],
    //     best_time_to_visit: [''],
    //     weather: [''],
    //     currency: [''],
    //     language: [''],
    //     time_zone: [''],
    //     description: [''],
    //     parent_id: [null]
    //   }),
    //   locations: this.fb.array([]),
    //   attractions: this.fb.array([]),
    //   cuisines: this.fb.array([]),
    //   ethnicities: this.fb.array([]),
    //   activities: this.fb.array([])
    // });

    // if (this.mode === 'edit' && this.data) {
    //   this.destinationForm.patchValue({ destination: this.data });
    //   this.setArrayData('locations', this.data.locations);
    //   this.setArrayData('attractions', this.data.attractions);
    //   this.setArrayData('cuisines', this.data.cuisines);
    //   this.setArrayData('ethnicities', this.data.ethnicities);
    //   this.setArrayData('activities', this.data.activities);
    // }

      const id = this.route.snapshot.paramMap.get('id');

  if (id) {
    this.mode = 'edit';
    this.destinationService.getDestinationDetails(+id).subscribe(res => {
      this.data = res;
      this.initializeForm(); // custom method to build the form
    });
  } else {
    this.mode = 'add';
    this.initializeForm();
  }
  }

  initializeForm(): void {
  this.destinationForm = this.fb.group({
    destination: this.fb.group({
      title: [this.data?.title || '', Validators.required],
      image_url: [this.data?.image_url || ''],
      best_time_to_visit: [this.data?.best_time_to_visit || ''],
      weather: [this.data?.weather || ''],
      currency: [this.data?.currency || ''],
      language: [this.data?.language || ''],
      time_zone: [this.data?.time_zone || ''],
      description: [this.data?.description || ''],
      parent_id: [this.data?.parent_id || null]
    }),
    locations: this.fb.array([]),
    attractions: this.fb.array([]),
    cuisines: this.fb.array([]),
    ethnicities: this.fb.array([]),
    activities: this.fb.array([])
  });

  if (this.mode === 'edit' && this.data) {
    this.setArrayData('locations', this.data.locations);
    this.setArrayData('attractions', this.data.attractions);
    this.setArrayData('cuisines', this.data.cuisines);
    this.setArrayData('ethnicities', this.data.ethnicities);
    this.setArrayData('activities', this.data.activities);
  }
}

  getArrayControl(name: string): FormArray {
    return this.destinationForm.get(name) as FormArray;
  }

  private setArrayData(controlName: string, items: any[]) {
    const array = this.getArrayControl(controlName);
    items.forEach(item => array.push(this.fb.group(item)));
  }

  addItem(controlName: string, fields: any) {
    const array = this.getArrayControl(controlName);
    array.push(this.fb.group(fields));
  }

  removeItem(controlName: string, index: number) {
    const array = this.getArrayControl(controlName);
    array.removeAt(index);
  }

  onSubmit() {
    if (this.destinationForm.valid) {
    const payload = this.destinationForm.value;

    if (this.mode === 'edit' && this.data?.id) {
      this.destinationService.updateDestination(this.data.id, payload).subscribe({
        next: (res) => {
          console.log('Updated successfully', res);
          // Optional: toast or navigate
        },
        error: (err) => {
          console.error('Update failed', err);
        }
      });
    } else {
      this.destinationService.addDestination(payload).subscribe({
        next: (res) => {
          console.log('Added successfully', res);
          // Optional: toast or navigate
        },
        error: (err) => {
          console.error('Add failed', err);
        }
      });
    }
  }
  }
}
