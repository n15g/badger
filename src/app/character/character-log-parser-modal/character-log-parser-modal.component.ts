import { Component } from '@angular/core';
import { faSpinner, faTrash } from '@fortawesome/free-solid-svg-icons';
import { BsModalRef } from 'ngx-bootstrap';
import { CharacterDbService } from '../character-db.service';
import { getFileHash } from '../../common/log-parser';

@Component({
    selector: 'app-character-log-parser-modal',
    templateUrl: './character-log-parser-modal.component.html',
    styleUrls: ['./character-log-parser-modal.component.scss']
})
export class CharacterLogParserModalComponent {
    private dragOver = false;
    private isGeneratingHashes = false;

    private fileList: {[hash: string]: File} = {};

    public close = faTrash;
    public spinner = faSpinner;

    private get disableSubmit() {
        return Object.keys(this.fileList).length === 0;
    }

    constructor(
        public bsModalRef: BsModalRef,
        private charDb: CharacterDbService) {
    }

    private removeFile(hash: string) {
        delete this.fileList[hash];
    }

    private fileDragEnter() {
        this.dragOver = true;
    }

    private fileDragLeave() {
        this.dragOver = false;
    }

    private submit() {
        console.log('submit');
    }

    private async fileDropped($event: FileList) {
        this.isGeneratingHashes = true;
        this.dragOver = false;
        const newFiles = Array.from($event);

        const newFileList = {
            ...this.fileList
        };

        for await (const newFile of newFiles) {
            const hash = await getFileHash(newFile);

            if (newFileList[hash] === undefined) {
                newFileList[hash] = newFile;
            }
        }

        this.fileList = newFileList;

        this.isGeneratingHashes = false;
    }
}
