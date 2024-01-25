import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'img-lazy',
    template: `
		@if (!state.loaded) {
		  <div class="lazy-bg"></div>
		}
		@if (state.visible) {
		  <figure [class]="class">
		    <img [hidden]="!state.loaded" (load)="onLoad()" [src]="src" [alt]="alt" [class]="class" />
		  </figure>
		}
		`,
    styles: [`
		@keyframes shimmer {
			0% {
				background-position: -468px 0;
			}
			100% {
				background-position: 468px 0;
			}
		}

		img {
			max-width: 100%;
			//width: 100%;
		}

		.lazy-bg {
			padding-top: calc(1080 / 1920 * 100%);
			margin: auto;
			animation: shimmer 1s linear 0s infinite forwards;
			background: #d0d3da;
			box-shadow: 0 8px 16px rgba(0, 30, 84, 0.1);
			background-image: linear-gradient(to right, #d0d3da 0%, #e9ebee 20%, #d0d3da 40%, #d0d3da 100%);
			background-repeat: no-repeat;
			position: relative;
			height: 100%;
			box-sizing: border-box;
		}

		figure {
			margin: 0;
			padding: 0;
			background: transparent;
			text-align: center; 
			&.full-image {width: 100%; max-height: 300px; height: 300px;
				img {width: 100%; height: 100%; }
			}
		}

	`],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
})
export class ImgLazyComponent implements OnInit {

	@Input() src: any = null;
    @Input() alt: any = 'Alt';
    @Input() class: any = 'img-fluid';
    @Input() width: any = '100';
    @Input() height: any = '100';

    @Output() isVisible = new EventEmitter();

    state = {
        visible: false,
        loaded: false
    };

    constructor(private el: ElementRef, private cd: ChangeDetectorRef) {
    }

    private setState(key: any, value: any) {
        this.state = {...this.state, [key]: value};
        //if(!this.cd['destroyed']) {
        if(!this.cd['detectChanges']) {
            this.cd.detectChanges();
        }
    }

    private calcVisibility() {
        
    }

    ngOnInit() {
        this.calcVisibility();
        // console.log(this.width);
    }

    @HostListener('window:scroll', ['$event'])
    onscroll(e: any) {
        this.calcVisibility();
    }

    onLoad() {
        setTimeout(() => {
            this.setState('loaded', true);
        }, 300);
    }

    @Input()
    public log = () => {
        const state = this.state;
        console.log(state);
    };

    // Custom Events
    private customEmit(val: any) {
        this.isVisible.emit(val);
        const domEvent = new CustomEvent('is-visible');
        this.el.nativeElement.dispatchEvent(domEvent);
    }

}
