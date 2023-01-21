import { Directive, ElementRef, HostBinding, HostListener, Renderer2 } from "@angular/core";

@Directive({
    selector: '[appDropdown]',
    exportAs: 'appDropdown'
})
export class DropdownDirective {
    constructor(private el: ElementRef, private renderer: Renderer2) {}

    private isOpen = false;

    @HostListener('document:click', ['$event']) toggleOpen(event: Event) {
        this.isOpen = this.el.nativeElement.contains(event.target) ? !this.isOpen : false;
        let part = this.el.nativeElement.querySelector('.dropdown-menu');
        if (this.isOpen) this.renderer.addClass(part, 'show');
        else this.renderer.removeClass(part, 'show');
    }
}