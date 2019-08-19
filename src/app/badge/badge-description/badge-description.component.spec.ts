import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {BadgeDescriptionComponent} from './badge-description.component';
import {BadgeLocationComponent} from "../badge-location/badge-location.component";
import {MarkdownModule} from "ngx-markdown";
import {GameMapComponent} from "../../game-map/game-map/game-map.component";
import {TEST_EXPLORATION_BADGE} from "../../content-db/badge.fixture";

describe('BadgeDescriptionComponent', () => {
    let component: BadgeDescriptionComponent;
    let fixture: ComponentFixture<BadgeDescriptionComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [BadgeDescriptionComponent, BadgeLocationComponent, GameMapComponent],
            imports: [MarkdownModule]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(BadgeDescriptionComponent);
        component = fixture.componentInstance;
        component.badge = TEST_EXPLORATION_BADGE;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
