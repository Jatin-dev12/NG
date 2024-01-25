import moment from "moment-timezone";
import { EnumRxKey } from "../enums";
import { ApiResponseData } from "../models";

export const isBrowser = typeof window !== 'undefined';

export const getItem = (key: string): any => {
	if (isBrowser) {
		return localStorage.getItem(key);
	} else {
		//console.log('Server getItem', key)
		return null; // Return a default value or handle the server-side case
	}
}

export const setItem = (key: string, value: string): void => {
	if (isBrowser) {
		localStorage.setItem(key, value);
	} else {
		console.log('Server setItem', key, value);
		// Handle the server-side case, e.g., log or store in-memory
	}
}

export const removeItem = (key: string): void => {
	if (isBrowser) {
		localStorage.removeItem(key);
	} else {
		console.log('Server removeItem', key);
		// Handle the server-side case, e.g., log or store in-memory
	}
}


export const fileManupulate = (uploadFiles: any) => {
	let files: any[] = [];
	uploadFiles?.docs && uploadFiles?.docs.map((file: any) => files.push(file.id));
	uploadFiles?.image && uploadFiles?.image.map((file: any) => files.push(file.id));
	uploadFiles?.video && uploadFiles?.video.map((file: any) => files.push(file.id));
	return files;
};

export const categoryListToTree = (items: any[] | null, id: any = null, link: string = 'parent_id') => {
	let newItem: any = items && items.filter((item: any) => item[link] === id).map((item: any) => ({ ...item, children: categoryListToTree(items, item.id) }));
	return newItem;
}

export const chunkArray = (inputArray: any[], perChunk = 4) => {
	return inputArray && inputArray.reduce((resultArray, item, index) => {
		const chunkIndex = Math.floor(index / perChunk)
		if (!resultArray[chunkIndex]) {
			resultArray[chunkIndex] = [] // start a new chunk
		}
		resultArray[chunkIndex].push(item)
		return resultArray
	}, []);
}

export const momentDate = (date: any, format: any = 'MM/DD/YYYY') => {
	let time: any;
	let value: any = Object.getOwnPropertyNames(date ?? new Date()).length === 0 ? date * 1000 : date;
	time = moment(value).format(format);
	return time;
}

export const moments = () => {
	return moment;
}

export const convertTimestamptoTime = (unixTimestamp: any) => {
	// and then create a new Date object
	const dateObj = new Date(unixTimestamp * 1000);
	// Get hours from the timestamp
	const hours = dateObj.getUTCHours();
	// Get minutes part from the timestamp
	const minutes = dateObj.getUTCMinutes();
	// Get seconds part from the timestamp
	const seconds = dateObj.getUTCSeconds();
	//+ ':' +  seconds.toString().padStart(2, '0')
	return hours.toString().padStart(2, '0') + ':' + minutes.toString().padStart(2, '0');
}

export const reduxItemAdd = (items: any, action: any, sort: any) => {
	let arrayItem = null;
	if (EnumRxKey.ArrayOrder.asc === sort) arrayItem = [...items, action.item];
	if (EnumRxKey.ArrayOrder.desc === sort) arrayItem = [action.item, ...items];
	return arrayItem;
}

export const reduxAddArray = (items: any, action: any) => {
	let itemArray = action.item ? action.item.items : null;
	return (items?.length > 0) ? [...items.concat(itemArray)] : null;
}

export const reduxItemUpdate = (items: any, action: any) => {
	let index = 0;
	switch (action.key) {
		case EnumRxKey.User.settings:
			index = items?.findIndex((f: any) => f.key === action.item.key);
			break;
		default:
			index = items?.findIndex((f: any) => f.id === action.item.id);
			break;
	}
	return (items?.length > 0) ? [...items?.slice(0, index), action.item, ...items?.slice(index + 1)] : null;
}

export const reduxIDelete = (items: any, action: any) => {
	let newItem: any = [];
	switch (action.key) {
		case EnumRxKey.Catalog.wishlist:
			newItem = items.filter((f: any) => f.catalog_id !== action.item.catalog_id);
			break;
	
		default:
			newItem = items.filter((f: any) => f.id !== action.item.id);
			break;
	}
	return newItem;
}

export const reduxListingAdd = (data: ApiResponseData, action: any, key: any, sort = EnumRxKey.ArrayOrder.asc) => {
	return reduxItemAdd(data?.items ?? [], action, sort);
}

export const reduxListingUpdate = (data: ApiResponseData, action: any, key: any) => {
	let updateCatalog = (key === 'view') ? action.item : reduxItemUpdate(data?.items, action);
	return (key === 'view') ? updateCatalog : updateCatalog ? updateCatalog : null;
}

export const removeDuplicates = (items: any, identity = 'id') => {
	let setObj: any = new Set(); // create key value pair from array of array
	let result = items?.reduce((acc: any, item: any) => {
		if (!setObj.has(item[`${identity}`])) {
			setObj.add(item[`${identity}`], item)
			acc.push(item)
		}
		return acc;
	}, []); //converting back to array from mapobject
	return result;
}

export const reduxMatchPagination = (state: any, items: any) => {
	let newObject = { total: state?.total, page: state?.page, size: state?.size, total_pages: state?.total_pages, max_page: state?.max_page, visible: state?.visible, last: state?.last, fist: state?.fist, items: items }
	return newObject;
}

export const handleAddressState = (address: google.maps.places.PlaceResult) => {
	let location = address.formatted_address;
	let country_code = '';
	let state_code = '';
	let city = '';
	let postal_code = '';
	let zip5 = '';
	let latitude: any = address.geometry?.location?.lat();
	let longitude: any = address.geometry?.location?.lng();
	if (address.address_components) {
		let length = address.address_components.length;
		for (let i = 0; i < length; i++) {
			if (address.address_components[i].types[0] === "country") {
				country_code = address.address_components[i].short_name;
			}
			if (address.address_components[i].types[0] === "administrative_area_level_1") {
				let short_name = address.address_components[i].short_name
				state_code = short_name.substring(0, 3);
			}
			if ((address.address_components[i].types[0] === "locality") || (address.address_components[i].types[0] === 'administrative_area_level_2')) {
				city = address.address_components[i].short_name;
			}
			if (address.address_components[i].types[0] === "postal_code") {
				postal_code = address.address_components[i].short_name;
				zip5 = address.address_components[i].short_name;
			}
		}
	}
	return { location, country_code, state_code, city, postal_code, zip5, latitude, longitude }
}

export const isJsonString = (str: any) => {
	try {
		JSON.parse(str);
	} catch (e) {
		return false;
	}
	return true;
}

export const isEmpty = (e: any) => {
	switch (e) {
		case "":
		case 0:
		case "0":
		case null:
		case false:
		case undefined:
			return true;
		default:
			return false;
	}
}

export const budgetRange = () => {
	return {
		'0-50': '0-50',
		'50-100': '50-100',
		'100-200': '100-200',
		'200-400': '200-400',
		'400-800': '400-800',
		'800-1600': '800-1600',
	}
}

export const numberOfProposals = () => {
	return {
		'0-3': '0-3 Proposals',
		'3-6': '3-6 Proposals',
		'6-9': '6-9 Proposals',
		'9-18': '9-18 Proposals',
	}
}

export const genderPrefer = () => {
	return {
		'1': 'Any Gender',
		'2': 'Male',
		'3': 'Female',
	}
}
