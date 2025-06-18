import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDestinationsComponent } from './view-destinations.component';

describe('ViewDestinationsComponent', () => {
  let component: ViewDestinationsComponent;
  let fixture: ComponentFixture<ViewDestinationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewDestinationsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewDestinationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
