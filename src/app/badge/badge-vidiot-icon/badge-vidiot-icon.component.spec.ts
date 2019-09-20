import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BadgeVidiotIconComponent } from './badge-vidiot-icon.component';

describe('BadgeVidiotIconComponent', () => {
  let component: BadgeVidiotIconComponent;
  let fixture: ComponentFixture<BadgeVidiotIconComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BadgeVidiotIconComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BadgeVidiotIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
