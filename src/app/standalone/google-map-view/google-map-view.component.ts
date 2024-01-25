
import { Component, Input } from '@angular/core';

import { Location } from 'src/app/models';
import { GoogleMapsModule } from '@angular/google-maps';

@Component({
	selector: 'app-google-map-view',
	standalone: true,
	imports: [GoogleMapsModule],
	templateUrl: './google-map-view.component.html',
	styleUrls: ['./google-map-view.component.scss']
})
export class GoogleMapViewComponent {
	@Input() location: Location | null = null;
	@Input() center: google.maps.LatLngLiteral = { lat: 24, lng: 12 };
	zoom = 15;
	mapOptions: google.maps.MapOptions = { zoomControl: true };
	//markerOptions: google.maps.MarkerOptions = { draggable: false,  };
	markerOptions: google.maps.MarkerOptions = { draggable: false };

	@Input() markerPositions: google.maps.LatLngLiteral[] | any = [];

	constructor() { }


	ngOnInit(): void {
		let location: any = this.location;
		//console.log(location);
		//if(this.item?.is_booked_by_me) {
		this.center = {
			lat: +location?.latitude,
			lng: +location?.longitude,
		}
		let latLng = { lat: +location?.latitude, lng: +location?.longitude };

		this.markerPositions.push(latLng);

		//}
	}
}
