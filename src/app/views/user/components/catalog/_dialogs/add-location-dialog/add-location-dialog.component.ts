import { Component, Input, ViewChild, ViewEncapsulation } from '@angular/core';
import { UntypedFormGroup, ReactiveFormsModule } from '@angular/forms';
import { GoogleMap, MapInfoWindow, MapMarker, GoogleMapsModule } from '@angular/google-maps';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { handleAddressState } from 'src/app/helpers';
import { Catalog } from 'src/app/models';
import { LaddaDirective } from 'src/app/modules';
import { GlobalService } from 'src/app/services';
import { FormSubmitDirective, ErrorSummaryComponent } from 'src/app/shared';

@Component({
    selector: 'app-add-location-dialog',
    templateUrl: './add-location-dialog.component.html',
    styleUrls: ['./add-location-dialog.component.scss'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [ReactiveFormsModule, FormSubmitDirective, ErrorSummaryComponent, GoogleMapsModule, LaddaDirective]
})
export class AddLocationDialogComponent {
	@Input() update: Catalog | null = null;
	@Input() form!: UntypedFormGroup;
	@ViewChild(GoogleMap) map!: GoogleMap;
	@ViewChild(MapMarker) marker!: MapMarker | any;
	@ViewChild(MapInfoWindow) infoWindow!: MapInfoWindow;
	submitted = false;
	center: any = { lat: 23.4241, lng: 53.8478 };
	zoom = 6;
	mapOptions: google.maps.MapOptions = { zoomControl: true };
	markerOptions: google.maps.MarkerOptions = { 
		draggable: true,
	};
	markerPositions: google.maps.LatLngLiteral[] | any = [];
	latlng = { lat: 0, lng: 0 }

	constructor(
		public gs: GlobalService,
		public activeModal: NgbActiveModal,
	) { }

	ngOnInit(): void {
		this.markerPositions = [];
		let location = this.form.value?.location;
		//console.log('location', location)
		if(location?.latitude && location?.longitude) {
			let latlng = { lat: +location?.latitude, lng: +location?.longitude };
			this.center = latlng;
			this.zoom = 8;
			this.markerPositions.push(latlng);
		};
		/*let geocoder = new google.maps.Geocoder();
		const latlng = {
			lat: 40.714224,
			lng: -73.961452,
		};
		geocoder.geocode({ location: latlng }).then((response) => {
			console.log('response', response)
			if (response.results[0]) {
				let result = response.results[0];

			} else {
			  this.gs.alert("No results found", 'danger');
			}
		}).catch((e) => {
			this.gs.alert("Geocoder failed due to: " + e, 'danger')
		});*/
	}

	mapClick(event: any, marker: MapMarker, infoWindow: MapInfoWindow) {
		let { latLng } = event;
		let lat = latLng.lat();
		let lng = latLng.lng();
		//this.zoom = 9;
		//this.center = { lat: lat, lng: lng };
		this.latlng = { lat: lat, lng: lng };
		this.markerPositions = [];
		this.markerPositions.push({ lat: lat, lng: lng });
		this.marker = marker;
		this.infoWindow = infoWindow;
		this.infoWindow?.open(marker);
	}

	mapDragend(event: any) {
		let { latLng } = event;
		let lat = latLng.lat();
		let lng = latLng.lng();
		this.markerPositions[0] = { lat: lat, lng: lng };
	}

	onAddLocation() {
		this.submitted = true;
		let geocoder = new google.maps.Geocoder();
		const latlng = this.markerPositions[0];
		geocoder.geocode({ location: latlng }).then((response) => {
			this.submitted = false;
			//console.log('response', response);
			if (response.results[0]) {
				let result: any = response.results[0];
				this.handleAddressChange(result);
				//let state = handleAddressState(result);
				//console.log('state', state);
			} else {
			  this.gs.alert("No results found", 'danger');
			}
		}).catch((e) => {
			this.submitted = false;
			this.gs.alert("Geocoder failed due to: " + e, 'danger')
		});
	}

	onSubmit(form: any) {
		this.submitted = true;
		if (!form.valid) {
			this.submitted = false;
			this.gs.validateAllFormFields(this.form);
			return;
		}
		this.gs.clearErrorMessages();
	}

	handleAddressChange(address: any) {
		//console.log('address', address);
		let state = handleAddressState(address);
		this.form.get('location')?.patchValue({
			location: state.location,
			country_code: state.country_code,
			city: state.city,
			state_code: state.state_code,
			zip5: state.postal_code,
			latitude: state.latitude,
			longitude: state.longitude,
			map_url: address.url
		});
		this.activeModal.close();
	}

}
