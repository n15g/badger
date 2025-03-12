import { Directive, HostListener, Output, EventEmitter } from '@angular/core';

@Directive({
    selector: '[appDragAndDropFile]'
})
export class DragAndDropFileDirective {
    @Output() fileDropped = new EventEmitter<undefined>();
    @Output() fileDragLeave = new EventEmitter<undefined>();
    @Output() fileDragEnter = new EventEmitter<undefined>();

    // chrome doesn't fire the 'dragexit' event, so we have to mock it by keeping track of it manually
    // simply using dragleave/dragenter to toggle styles on an element will result in flickering
    private dragOverCounter = 0;

    @HostListener('dragenter', ['$event'])
    public onDragEnter(evt) {
        evt.preventDefault();
        evt.stopPropagation();

        if (++this.dragOverCounter === 1) {
            this.fileDragEnter.emit();
        }

    }
    @HostListener('dragover', ['$event'])
    public onDragOver(evt) {
        evt.preventDefault();
        evt.stopPropagation();
    }

    @HostListener('dragleave', ['$event'])
    public onDragLeave(evt) {
        evt.preventDefault();
        evt.stopPropagation();

        if (--this.dragOverCounter === 0) {
            this.fileDragLeave.emit();
        }

    }

    @HostListener('drop', ['$event'])
    public ondrop(evt) {
        evt.preventDefault();
        evt.stopPropagation();
        this.dragOverCounter = 0;
        if (evt.dataTransfer.files.length > 0) {
            this.fileDropped.emit(evt.dataTransfer.files);
        }
    }

}
