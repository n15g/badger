import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterLogParserHowToModalComponent } from './character-log-parser-how-to-modal.component';

describe('CharacterLogParserHowToModalComponent', () => {
  let component: CharacterLogParserHowToModalComponent;
  let fixture: ComponentFixture<CharacterLogParserHowToModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CharacterLogParserHowToModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacterLogParserHowToModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
