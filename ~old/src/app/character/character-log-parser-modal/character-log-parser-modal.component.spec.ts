import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterLogParserModalComponent } from './character-log-parser-modal.component';

describe('CharacterLogParserModalComponent', () => {
  let component: CharacterLogParserModalComponent;
  let fixture: ComponentFixture<CharacterLogParserModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CharacterLogParserModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacterLogParserModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
