import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GlobalService } from 'src/app/services';
import { GroupInfoComponent } from '../group-info/group-info.component';
import { RouterLink } from '@angular/router';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import moment from 'moment';

@Component({
    selector: 'message-user-profile',
    templateUrl: './user-profile.component.html',
    standalone: true,
    imports: [NgxSkeletonLoaderModule, RouterLink],
})
export class UserProfileComponent implements OnInit {
	@Input() profile: any = null;
	@Input() recipients: any = null;
	@Input() chatRequestLoading: boolean = false;

	constructor(
		public gs: GlobalService,
		private modalService: NgbModal,
	) { }

	ngOnInit(): void {

	}

	get recipient() {
		let profile = this.profile?.recipients;
		return profile && profile[0];
	}

	openGroup() {
		const modalRef = this.modalService.open(GroupInfoComponent, {
			windowClass: 'center',
			keyboard: false,
			animation: true
		});
		modalRef.componentInstance.profile = this.profile;
		modalRef.result.then((result) => {
			console.log('result', result);
		}, (reason) => console.log(reason));
	}

	timeNow(time: any) {
		return moment(parseInt(time)).fromNow(true);
	}

}
