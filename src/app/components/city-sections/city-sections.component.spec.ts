import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CitySectionsComponent } from './city-sections.component';

describe('CitySectionsComponent', () => {
  let component: CitySectionsComponent;
  let fixture: ComponentFixture<CitySectionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CitySectionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CitySectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
