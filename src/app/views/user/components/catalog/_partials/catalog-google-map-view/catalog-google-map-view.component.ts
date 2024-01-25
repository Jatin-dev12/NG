import { Component, Input, ViewChild } from '@angular/core';
import { MapMarker, MapInfoWindow, MarkerClustererOptions, GoogleMap, GoogleMapsModule } from '@angular/google-maps';
import { Observable } from 'rxjs';
import { EnumRxKey } from 'src/app/enums';
import { ApiResponseData, Catalog, Location } from 'src/app/models';
import { GlobalService } from 'src/app/services';
import { StoreSelector } from 'src/app/store/selector';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
	selector: 'app-catalog-google-map-view',
	templateUrl: './catalog-google-map-view.component.html',
	styleUrls: ['./catalog-google-map-view.component.scss'],
	standalone: true,
	imports: [GoogleMapsModule, RouterLink, CurrencyPipe]
})
export class CatalogGoogleMapViewComponent {
	@ViewChild(GoogleMap) map!: GoogleMap;
	@ViewChild(MapInfoWindow) infoWindow!: MapInfoWindow;
	@ViewChild(MapMarker) marker!: MapMarker;
	@Input() key: any = EnumRxKey.Catalog.listing;
	@Input() item: Catalog | any = null;
	@Input() items: Catalog[] = [];
	catalog!: Observable<ApiResponseData>;
	center: any = { lat: 56.33753808881958, lng: 70.48085630493162 };
	zoom = 3;
	mapOptions: google.maps.MapOptions = { zoomControl: true };
	markerOptions: google.maps.MarkerOptions = {
		draggable: false,
		animation: google.maps.Animation.DROP,
		icon: this.gs.imgUrl + `/marker.png`,
	};
	markerPositions: google.maps.LatLngLiteral[] | any = [];
	infoWindowOpened: any = null;
	infoContent: any = null;
	current_id: number = 0;
	markerClustererImagePath = 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m';
	clustererOptions: MarkerClustererOptions = {
		imagePath: "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m",
		gridSize: 20,
		zoomOnClick: false,
		maxZoom: 10,
	}

	constructor(
		public gs: GlobalService
	) {

	}

	ngOnInit(): void {
		this.catalog = this.gs.store.select(StoreSelector.CatalogSelectors[this.key]);
		var autocompleteService = new google.maps.places.AutocompleteService();
		//autocompleteService.getPlacePredictions
		this.catalog.subscribe(data => {
			let items = data?.items;
			this.markerPositions = [];
			/*this.markerPositions = [];
			items?.forEach((val: Catalog) => {
				let el: any = val.location;
				let latLng = { lat: +el?.latitude, lng: +el?.longitude, data: val, options: { animation: google.maps.Animation.BOUNCE } };
				this.markerPositions.push(latLng);
			});*/

			if (items) {
				let newLocation: any[] = [];
				items.forEach((el: Catalog) => {
					if (el.location_id) {
						let location: any = el.location;
						let latLng = { lat: +location?.latitude, lng: +location?.longitude, data: el };
						newLocation.push(latLng);
						//this.markerPositions.push(latLng);
					}
				});
				const map = new Map();
				newLocation.forEach((o) => map.has(o.lng) ? map.get(o.lng).push(o) : map.set(o.lng, [o]));
				const result: any[] = [];
				for (let [, arr] of map) {
					arr.forEach((o: any, i: any) => {
						//console.log('parseFloat(`0.${i}`', parseFloat(`0.00${i}`));
						result.push({ ...o, lng: (o.lng + parseFloat(`0.00${i}`)) })
					});
				}
				this.markerPositions = result;
				//console.log('this.markerPositions', this.markerPositions, result, map)
			}
		});
		//this.map.data.
	}

	addMarker(event: google.maps.MapMouseEvent | any) {
		this.markerPositions.push(event?.latLng.toJSON());
	}

	openInfoWindow(marker: MapMarker, infoWindow: MapInfoWindow) {
		this.marker = marker;
		this.infoWindow.close();
		this.infoWindow = infoWindow;
		let marker2: any = marker;
		let _position = marker2._position?.data;
		this.current_id = _position.id;
		let lat = +_position.latitude;
		let lng = +_position.longitude;
		this.center = { lat: lat, lng: lng };
		this.infoContent = _position;
		marker.marker?.setAnimation(google.maps.Animation.BOUNCE);
		setTimeout(() => {
			marker.marker?.setAnimation(null);
		}, 3000)
		this.infoWindow?.open(marker);
		this.infoWindow?.closeclick.subscribe(data => {
			this.current_id = 0;
			this.infoContent = null;
			marker.marker?.setAnimation(null);
		});
	}

	mapDrag(event: any) {

		console.log('dgdfgdf', event, this.map.getCenter()?.toJSON());
	}

	markerMouseOver(marker: MapMarker) {
		//marker.marker?.setAnimation(google.maps.Animation.BOUNCE);
		/*if (marker.getAnimation() !== null) {
			marker.marker?.setAnimation(null);
		} else {
			marker.marker?.setAnimation(google.maps.Animation.BOUNCE);
		}*/
	}

	markerMouseOut(marker: MapMarker) {
		//marker.marker?.setAnimation(null);
	}

	clickAddress(item: Location) {
		this.current_id = item.id;
		this.infoWindow.close();
		let index = this.markerPositions?.find((val: any) => val.data.id === item.id);
		//console.log('dfg', this.marker);
		let marker = { ...this.marker };
		// marker['position'] = index;
		this.infoContent = index?.data;
		marker.marker?.setPosition(index);
		this.infoWindow.position = index;
		marker.marker?.setAnimation(google.maps.Animation.BOUNCE);
		//console.log('marker', marker);
		//this.openInfoWindow(this.marker)
		this.infoWindow.open(this.marker);
		setTimeout(() => {
			marker.marker?.setAnimation(null);
		}, 3000)
	}

	visibleChanged(event: any) {
		console.log('visibleChanged', event)
	}

}
