import {TestBed} from '@angular/core/testing';

import {ContentDbService} from './content-db.service';
import {HttpClientModule} from "@angular/common/http";

describe('ContentDbService', () => {
    beforeEach(() => TestBed.configureTestingModule({
        imports: [HttpClientModule]
    }));

    it('should be created', () => {
        const service: ContentDbService = TestBed.get(ContentDbService);
        expect(service).toBeTruthy();
    });
});
