import { Injectable } from '@angular/core';
import { EnumRxKey, Enums } from '../enums';
import { Catalog } from '../models';
import { ConfirmDialogService } from '../modules';
import { GlobalService, ItemService } from '../services';
import { StoreAction } from '../store/actions';

@Injectable({
	providedIn: 'root'
})
export class ActionsHelper {
	wishlistLoading: boolean = false;
	constructor(
		public gs: GlobalService,
		private confirmDialog: ConfirmDialogService,
		private itemService: ItemService
	) { }

	handleWishlist(item: any, key: any) {
		//console.log('item.is_wishlist', item.is_wishlist);
		if (this.gs.identity === null) {
			this.confirmDialog.confirm({
				message: `Login Required`,
			}, () => {
				this.gs.loginDialog();
			}, () => { console.log('No clicked'); });
			return
		}
		!item?.is_wishlist ? this.addToWishlist(item, key) : this.removeFromWishlist(item, key);
	}

	addToWishlist(item: any, key: any) {
		this.confirmDialog.confirm({
			message: "Are you sure you want to add the property to favorites?"
		}, () => {
			let data = Object.assign({}, item, { is_wishlist: true });
			this.actionWishlist(data, key);
		}, () => { console.log('No clicked'); });
	}

	removeFromWishlist(item: any, key: any) {
		this.confirmDialog.confirm({
			message: "Are you sure you want to remove the property from favorites?"
		}, () => {
			let data = Object.assign({}, item, { is_wishlist: false });
			this.actionWishlist(data, key);
		}, () => { console.log('No clicked'); });
	}

	actionWishlist(item: any, key: any) {
		let method = item.is_wishlist === true ? 'POST' : "DELETE";
		let params2: any = { 'user_id': this.gs.identity?.id, 'catalog_id': item.id, key: EnumRxKey.Catalog.wishlist };
		let params: any = (method === 'POST') ? params2 : null;
		this.wishlistLoading = true;
		this.itemService.catalog(method, (method === "POST") ? { form: params } : null, params2).subscribe(response => {
			this.wishlistLoading = false;
			let action = (method === 'POST') ? 'added' : 'removed';
			let className = (method === 'POST') ? 'success' : 'danger';
			if (action == 'add') {
				this.gs.alert(`You have successfully added the property to favorites`, className);
			}
			else {
				this.gs.alert(`You have successfully ${action} the property to favorite`, className);
			}
			// this.gs.alert(`You have successfully ${action} favorite`, className);
			this.gs.store.dispatch(StoreAction.CatalogUpdate({ item: item, key: EnumRxKey.Catalog.view }));

			if (key === EnumRxKey.Catalog.wishlist) {
				this.gs.store.dispatch(StoreAction.CatalogDelete({ item: { id: item.id }, key: key }));
				this.gs.store.dispatch(StoreAction.CatalogList({ data: null, key: EnumRxKey.Catalog.listing }));
				this.gs.store.dispatch(StoreAction.CatalogList({ data: null, key: EnumRxKey.Catalog.search }));
			} else {
				this.gs.store.dispatch(StoreAction.CatalogUpdate({ item: item, key: key }));
				this.gs.store.dispatch(StoreAction.CatalogList({ data: null, key: EnumRxKey.Catalog.wishlist }));
			}
		}, (error: Response) => {
			this.wishlistLoading = false;
		})
	}

	isEqual(a: any, b: any) {
		if (a.length !== b.length) {
			return false;
		} else {
			for (let i = 0; i < a.length; i++) {
				if (a[i].options.value !== b[i].options.value) {
					return false;
				} else {
					return true;
				}
			}
		}
		return;
	};

	addToCard(item: Catalog, cartForm: any, key?: any, params2 = { key: EnumRxKey.Catalog.cart }) {
		this.gs.store.dispatch(StoreAction.CatalogParams({ method: "POST", params: cartForm, params2: params2, key: `add-${EnumRxKey.Catalog.cart}` }));
		setTimeout(() => {
			this.gs.store.dispatch(StoreAction.CatalogParams({ method: "GET", params: null, params2: { key: EnumRxKey.Catalog.cart, size: 500 }, key: EnumRxKey.Catalog.cart }));
		}, 600);
	}

	guestAddToCart(cartForm: any, item: Catalog, cartData: any[], key = EnumRxKey.GuestCart.add) {
		let newCart = { ...cartForm, item: item };
		if (cartData === null || cartData.length === 0) {
			newCart['id'] = 1;
			this.gs.store.dispatch(StoreAction.GuestCartAdd({ item: newCart }));
			this.gs.alert('You have successfully add product to cart.');
		} else {
			let findItem = cartData.find(((obj: any) => obj.item.id === item.id));
			switch (key) {
				case EnumRxKey.GuestCart.add:
					if (findItem) {
						let options = findItem.options ?? [];
						if (options.length > 0) {
							if (this.isEqual(options, newCart.options)) {
								newCart['id'] = findItem.id;
								newCart['quantity'] = +findItem.quantity + newCart.quantity;
								this.gs.store.dispatch(StoreAction.GuestCartUpdate({ item: newCart }));
							} else {
								newCart['id'] = cartData.length + 1;
								this.gs.store.dispatch(StoreAction.GuestCartAdd({ item: newCart }));
							}
							this.gs.alert('You have successfully add product to cart.');
							return;
						}
						newCart['id'] = findItem.id;
						newCart['quantity'] = +findItem.quantity + 1;
						this.gs.store.dispatch(StoreAction.GuestCartUpdate({ item: newCart }));
					} else {
						newCart['id'] = cartData.length + 1;
						this.gs.store.dispatch(StoreAction.GuestCartAdd({ item: newCart }));
					}
					break;
				case EnumRxKey.GuestCart.update:
					newCart['id'] = findItem.id;
					//newCart['quantity'] = +findItem.quantity + 1;
					this.gs.store.dispatch(StoreAction.GuestCartUpdate({ item: newCart }));
					this.gs.alert('You have successfully update product to cart.');
					break;
				case EnumRxKey.GuestCart.decrement:
					newCart['id'] = findItem.id;
					newCart['quantity'] = +findItem.quantity - 1;
					this.gs.store.dispatch(StoreAction.GuestCartUpdate({ item: newCart }));
					this.gs.alert('You have successfully update product to cart.');
					break;
				case EnumRxKey.GuestCart.increment:
					newCart['id'] = findItem.id;
					newCart['quantity'] = +findItem.quantity + 1;
					this.gs.store.dispatch(StoreAction.GuestCartUpdate({ item: newCart }));
					this.gs.alert('You have successfully update product to cart.');
					break;
				case EnumRxKey.GuestCart.remove:
					newCart['id'] = findItem.id;
					this.gs.store.dispatch(StoreAction.GuestCartDelete({ item: newCart, key: EnumRxKey.GuestCart.remove }));
					this.gs.alert('You have successfully remove product to cart.', 'danger');
					break;
				case EnumRxKey.GuestCart.removeAll:
					this.gs.store.dispatch(StoreAction.GuestCartDelete({ item: newCart, key: EnumRxKey.GuestCart.removeAll }));
					this.gs.alert('You have successfully remove all product to cart.', 'danger');
					break;
				default:
					break;
			}
		}
		//this.gs.alert('You have successfully add product to cart.');
	}

}
