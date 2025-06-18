import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateDestinationComponent } from './update-destination.component';

describe('UpdateDestinationComponent', () => {
  let component: UpdateDestinationComponent;
  let fixture: ComponentFixture<UpdateDestinationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateDestinationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateDestinationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
