import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, exhaustMap, map, mergeMap } from "rxjs/operators";
import { GlobalService, ItemService } from "src/app/services";
import { of } from "rxjs";
import { EnumRxKey, Enums } from "src/app/enums";
import { StoreAction } from "src/app/store/actions";
import { Router } from "@angular/router";
import { isBrowser, removeItem } from "src/app/helpers";


@Injectable()
export class UserEffects {
    constructor(
        private actions$: Actions,
        private gs: GlobalService,
        private itemService: ItemService,
        private router: Router
    ) {

    }

    ProfileParams$ = createEffect(() => this.actions$.pipe(
        ofType(StoreAction.ProfileParams),
        mergeMap((action) => {
            if (action.key === EnumRxKey.User.logout) {

            }
            return this.itemService.profile(action.method, action.params, action.params2).pipe(map(response => {
                let LoginSuccess = StoreAction.LoginSuccess({ user: response.data });
                //console.log('response.data', response.data)
                switch (action.key) {
                    case 'profile':
                        this.gs.alert('You have successfully updated your profile');
                        let url = action.url;
                        url && this.router.navigate([url]);
                        return LoginSuccess;
                        break;
                    case 'verification':
                        this.gs.alert('You have successfuly submit to profile verification');
                        return LoginSuccess;
                        break;
                    case 'avatar':
                        this.gs.alert('You have successfully updated your profile picture.');
                        return LoginSuccess;
                        break;
                    case 'removeAvatar':
                        this.gs.alert('You have successfully remove your profile picture.');
                        return LoginSuccess;
                        break;
                    case 'banner':
                        this.gs.alert('You have uploaded your banner photo.');
                        return LoginSuccess;
                        break;
                    case EnumRxKey.Trriger.ProfileSpecialitiesDialog:
                        this.gs.alert('You have successfully updated the specialities');
                        action.key && this.gs.trrigerAction(action.key);
                        action.url && this.router.navigate([action.url]);
                        return LoginSuccess;
                        break;
                    case EnumRxKey.User.changePassword:
                        this.gs.alert(`You have successfully changed your password`);
                        action.key && this.gs.trrigerAction(action.key);
                        action.url && this.router.navigate([action.url]);
                        return StoreAction.Failure({ error: 'Change password Success' });;
                        break;
                    case EnumRxKey.User.deactivate:
                        this.gs.alert(`You have successfuly deactivate your account.`);
                        // let loginLogout = StoreAction.ProfileParams({ method: "POST", params: null, params2: { key: EnumRxKey.User.logout }, key: EnumRxKey.User.logout });
                        // this.gs.store.dispatch(loginLogout);
                        this.gs.logout();
                        return StoreAction.Failure({ error: 'Deactivate your account Success' });;
                        break
                    case EnumRxKey.User.logout:
                        this.gs.alert(`You have successfully logged out.`);
                        removeItem('token');
                        removeItem('user');
                        removeItem('ref_by');
                        if (isBrowser) {
                            window.location.href = '/';
                        }
                        return StoreAction.Failure({ error: 'Logout Success' });
                        break;
                    case EnumRxKey.Trriger.ProfileLocationDialog:
                        this.gs.alert(`You have successfully updated language and location`);
                        action.key && this.gs.trrigerAction(action.key);
                        action.url && this.router.navigate([action.url]);
                        //console.log('LoginSuccess', LoginSuccess)
                        return LoginSuccess;
                        break;
                    case EnumRxKey.Trriger.ProfileNameDialog:
                    case EnumRxKey.Trriger.ProfileScreenNameDialog:
                    case EnumRxKey.Trriger.ProfileAvatarDialog:
                    case EnumRxKey.Trriger.ProfileReviewsDialog:
                    case EnumRxKey.Trriger.ProfileEmailDialog:
                    case EnumRxKey.Trriger.ProfileMobileNumberDialog:
                    case EnumRxKey.Trriger.ProfilePasswordDialog:
                    case EnumRxKey.Trriger.Profile2StepVerificationDialog:
                    case EnumRxKey.Trriger.ProfileDeactivateDialog:
                    case EnumRxKey.Trriger.ProfilePrivacyDialog:
                    case EnumRxKey.Trriger.ProfileSpecialitiesDialog:
                    case EnumRxKey.Trriger.ProfileAboutDialog:
                        let successMsg = '';
                        switch (action.key) {
                            case EnumRxKey.Trriger.ProfileNameDialog:
                                successMsg = 'your name.';
                                break;
                            case EnumRxKey.Trriger.ProfileScreenNameDialog:
                                successMsg = 'your screen name.';
                                break;
                            case EnumRxKey.Trriger.ProfileAvatarDialog:
                                successMsg = 'your profile picture.';
                                break;
                            case EnumRxKey.Trriger.ProfileReviewsDialog:
                                successMsg = 'your reviews.';
                                break;
                            case EnumRxKey.Trriger.ProfileEmailDialog:
                                successMsg = 'your email.';
                                break;
                            case EnumRxKey.Trriger.ProfileMobileNumberDialog:
                                successMsg = 'your mobile number.';
                                break;
                            case EnumRxKey.Trriger.ProfilePasswordDialog:
                                successMsg = 'your password.';
                                break;
                            case EnumRxKey.Trriger.Profile2StepVerificationDialog:
                                successMsg = 'your 2-Step verification.';
                                break;
                            case EnumRxKey.Trriger.ProfileDeactivateDialog:
                                successMsg = 'your deactivate my account.';
                                break;
                            case EnumRxKey.Trriger.ProfilePrivacyDialog:
                                successMsg = 'your privacy & cookies.';
                                break;
                            case EnumRxKey.Trriger.ProfileAboutDialog:
                                successMsg = 'your about.';
                                break;
                            default:
                                successMsg = 'message';
                                break;
                        }
                        this.gs.alert(`You have successfully updated ${successMsg}`);
                        action.key && this.gs.trrigerAction(action.key);
                        action.url && this.router.navigate([action.url]);
                        //console.log('LoginSuccess', LoginSuccess)
                        return LoginSuccess;
                        break;
                    case 'load_profile':
                        return LoginSuccess;
                        break;
                    default:
                }
                return StoreAction.Failure({ error: 'Action not perform' });
            }), catchError((error: Response) => {
                this.gs.trrigerAction(`Error-${action.key?.substring(action.key.indexOf('-') + 1)}`);
                return of(StoreAction.Failure({ error }));
            }));
        })));

    UserParams$ = createEffect(() => this.actions$.pipe(
        ofType(StoreAction.UserParams),
        mergeMap((action) => {
            return this.itemService.profile(action.method, action.params, action.params2).pipe(map(response => {
                let key = action.key ?? '';
                let userRxKey: any = EnumRxKey.User;
                let keySplit = key.substring(key.indexOf('-') + 1);
                let sort = action.sort ?? EnumRxKey.ArrayOrder.desc;
                let custom_msg = action.msg ?? null;
                //console.log('custom_msg', action)
                switch (key) {
                    case userRxKey[key]:
                        action.url && this.router.navigate([action.url]);
                        return StoreAction.UserList({ data: response.data, key: key });
                        break;
                    case `delete-${keySplit}`:
                        this.gs.alert(custom_msg ? custom_msg : `You have successfully deleted the ${keySplit}`, 'danger');
                        action.url && this.router.navigate([action.url]);
                        this.gs.trrigerAction(key);
                        return StoreAction.UserDelete({ item: { id: action.params2.item_id }, key: keySplit });
                        break;
                    case `update-${keySplit}`:
                        this.gs.alert(custom_msg ? custom_msg : `You have successfully updated the ${keySplit}`);
                        action.url && this.router.navigate([action.url]);
                        this.gs.trrigerAction(key);
                        return StoreAction.UserUpdate({ item: response.data, key: keySplit });
                        break;
                    case `add-${keySplit}`:
                        switch (key) {
                            case `add-${EnumRxKey.User.coupon}`:
                                this.gs.alert(`You have successfully purchased the coupon.`);
                                break;
                            default:
                                this.gs.alert(custom_msg ? custom_msg : `You have successfully added the ${keySplit}`);
                                break;
                        }
                        action.url && this.router.navigate([action.url]);
                        this.gs.trrigerAction(key);
                        return StoreAction.UserAdd({ item: response.data, key: keySplit, sort: sort });
                        break;
                    default:
                        return StoreAction.UserList({ data: response.data, key: key });
                        //return StoreAction.Failure({ error: response.message });
                        break;
                }
            }), catchError((error: Response) => {
                this.gs.trrigerAction(`Error-${action.key?.substring(action.key.indexOf('-') + 1)}`);
                return of(StoreAction.Failure({ error }));
            }));
        })));

    userLoadMOre$ = createEffect(() => this.actions$.pipe(
        ofType(StoreAction.UserMoreParams),
        exhaustMap((action) =>
            this.itemService.profile(action.method, action.params, action.params2).pipe(map(response => {
                let key: any = action?.key;
                return StoreAction.UserMore({ item: response.data, key: key });
            }), catchError((error: Response) => {
                this.gs.trrigerAction(`Error-${action.key?.substring(action.key.indexOf('-') + 1)}`);
                return of(StoreAction.Failure({ error }));
            }))
        )));


    // Catalog Effects 

    catalog$ = createEffect(() => this.actions$.pipe(
        ofType(StoreAction.CatalogParams),
        mergeMap((action) =>
            this.itemService.catalog(action.method, action.params, action.params2).pipe(map(response => {
                let key: any = action?.key;
                let catalogRxKey: any = EnumRxKey.Catalog;
                let keySplit = key.substring(key.indexOf('-') + 1);
                //console.log('response-catalog', response);
                let msgKey = (keySplit === EnumRxKey.Catalog.wishlist) ? 'favorite' : keySplit;
                let custom_msg = action.msg ?? null;
                switch (key) {
                    case catalogRxKey[key]:
                        action.url && this.router.navigate([action.url]);
                        return StoreAction.CatalogList({ data: response.data ?? { items: [], pagination: null }, key: key });
                        break;
                    case `delete-${keySplit}`:
                        this.gs.alert(custom_msg ? custom_msg : `You have successfully deleted the ${msgKey}`, 'danger');
                        action.url && this.router.navigate([action.url]);
                        this.gs.trrigerAction(key);
                        return StoreAction.CatalogDelete({ item: { id: action.params2.item_id }, key: keySplit });
                        break;
                    case `update-${keySplit}`:
                        this.gs.alert(custom_msg ? custom_msg : `You have successfully updated the ${(msgKey === EnumRxKey.Catalog.view) ? 'availability' : msgKey}`);
                        action.url && this.router.navigate([action.url]);
                        this.gs.trrigerAction(key);
                        return StoreAction.CatalogUpdate({ item: response.data, key: keySplit });
                        break;
                    case `add-${keySplit}`:
                        this.gs.alert(custom_msg ? custom_msg : `You have successfully added the ${msgKey}`);
                        action.url && this.router.navigate([action.url]);
                        this.gs.trrigerAction(key);
                        return StoreAction.CatalogAdd({ item: response.data, key: keySplit });
                        break;
                    default:
                        return StoreAction.Failure({ error: response.message });
                        break;
                }
            }), catchError((error: Response) => {
                this.gs.trrigerAction(`Error-${action.key?.substring(action.key.indexOf('-') + 1)}`);
                return of(StoreAction.Failure({ error }));
            }))
        )));

    catalogLoadMOre$ = createEffect(() => this.actions$.pipe(
        ofType(StoreAction.CatalogMoreParams),
        exhaustMap((action) =>
            this.itemService.catalog(action.method, action.params, action.params2).pipe(map(response => {
                let key: any = action?.key;
                return StoreAction.CatalogMore({ item: response.data, key: key });
            }), catchError((error: Response) => {
                this.gs.trrigerAction(`Error-${action.key?.substring(action.key.indexOf('-') + 1)}`);
                return of(StoreAction.Failure({ error }));
            }))
        )));

    tagTypes$ = createEffect(() => this.actions$.pipe(
        ofType(StoreAction.TagTypesParams),
        mergeMap((action) =>
            this.itemService.tagTypes(action.method, action.params, action.params2).pipe(map(response => {
                let key: any = action?.key;
                let catalogRxKey: any = EnumRxKey.Catalog;
                let keySplit = key.substring(key.indexOf('-') + 1);
                switch (key) {
                    case catalogRxKey[key]:
                        action.url && this.router.navigate([action.url]);
                        return StoreAction.CatalogList({ data: response.data ?? { items: [], pagination: null }, key: key });
                        break;
                    default:
                        return StoreAction.Failure({ error: response.message });
                        break;
                }
            }), catchError((error: Response) => {
                this.gs.trrigerAction(`Error-${action.key?.substring(action.key.indexOf('-') + 1)}`);
                return of(StoreAction.Failure({ error }));
            }))
        )));

    categories$ = createEffect(() => this.actions$.pipe(
        ofType(StoreAction.CategoriesParams),
        mergeMap((action) =>
            this.itemService.categories(action.method, action.params, action.params2).pipe(map(response => {
                let key: any = action?.key;
                let catalogRxKey: any = EnumRxKey.Catalog;
                let keySplit = key.substring(key.indexOf('-') + 1);
                switch (key) {
                    case catalogRxKey[key]:
                        action.url && this.router.navigate([action.url]);
                        return StoreAction.CatalogList({ data: response.data ?? { items: [], pagination: null }, key: key });
                        break;
                    default:
                        return StoreAction.Failure({ error: response.message });
                        break;
                }
            }), catchError((error: Response) => {
                this.gs.trrigerAction(`Error-${action.key?.substring(action.key.indexOf('-') + 1)}`);
                return of(StoreAction.Failure({ error }));
            }))
        )));
    // Order Effects 

    orderParams$ = createEffect(() => this.actions$.pipe(
        ofType(StoreAction.OrderParams),
        mergeMap((action) => this.itemService.orders(action.method, action.params, action.params2).pipe(map(response => {
            let key: any = action?.key;
            let orderRxKey: any = EnumRxKey.Order;
            let keySplit = key.substring(key.indexOf('-') + 1);
            let msgKey = (keySplit === EnumRxKey.Order.meeting) ? 'meeting' : keySplit;
            if (key === `send-${EnumRxKey.Order.reviews}`) {
                this.gs.alert(`You have successfully submit reviews`);
                action.url && this.router.navigate([action.url]);
            }
            //console.log('response.data', response.data);
            switch (key) {
                case orderRxKey[key]:
                    action.url && this.router.navigate([action.url]);
                    return StoreAction.OrderList({ data: response.data, key: key });
                    break;
                case `delete-${keySplit}`:
                    this.gs.alert(`You have successfully delete ${msgKey}`, 'danger');
                    action.url && this.router.navigate([action.url]);
                    this.gs.trrigerAction(key);
                    return StoreAction.OrderDelete({ item: { id: action.params2.item_id }, key: keySplit });
                    break;
                case `update-${keySplit}`:
                    this.gs.alert(`You have successfully update ${msgKey}`);
                    action.url && this.router.navigate([action.url]);
                    this.gs.trrigerAction(key);
                    return StoreAction.OrderUpdate({ item: response.data, key: keySplit });
                    break;
                case `add-${keySplit}`:
                    this.gs.alert(`You have successfully add ${msgKey}`);
                    action.url && this.router.navigate([action.url]);
                    this.gs.trrigerAction(key);
                    return StoreAction.OrderAdd({ item: response.data, key: keySplit });
                    break;
                case `${EnumRxKey.Order.reviews}-added`:
                    this.gs.alert(`You have successfully added review`);
                    action.url && this.router.navigate([action.url]);
                    this.gs.trrigerAction(`${EnumRxKey.Order.reviews}-added`);
                    return StoreAction.OrderAdd({ item: response.data, key: keySplit });
                    break;
                default:
                    return StoreAction.Failure({ error: response.message });
                    break;
            }
        }), catchError((error: Response) => {
            this.gs.trrigerAction(`Error-${action.key?.substring(action.key.indexOf('-') + 1)}`);
            return of(StoreAction.Failure({ error: error }))
        })))
    ));

    orderParamsMore$ = createEffect(() => this.actions$.pipe(
        ofType(StoreAction.OrderMoreParams),
        exhaustMap((action) => this.itemService.orders("GET", action.params, action.params2).pipe(map(response => {
            let key: any = action?.key;
            return StoreAction.OrderMore({ item: response.data, key: key });
        }), catchError((error: Response) => {
            this.gs.trrigerAction(`Error-${action.key?.substring(action.key.indexOf('-') + 1)}`);
            return of(StoreAction.Failure({ error: error }));
        })))
    ));

    // Course

    courseParams$ = createEffect(() => this.actions$.pipe(
        ofType(StoreAction.CourseParams),
        mergeMap((action) => this.itemService.video(action.method, action.params, action.params2).pipe(map(response => {
            let key: any = action?.key;
            let courseRxKey: any = EnumRxKey.Course;
            let keySplit = key.substring(key.indexOf('-') + 1);
            let msgKey = keySplit;
            switch (key) {
                case courseRxKey[key]:
                    action.url && this.router.navigate([action.url]);
                    return StoreAction.CourseList({ data: response.data, key: key });
                    break;
                case `delete-${keySplit}`:
                    this.gs.alert(`You have successfully delete ${msgKey}`, 'danger');
                    action.url && this.router.navigate([action.url]);
                    this.gs.trrigerAction(key);
                    return StoreAction.CourseDelete({ item: { id: action.params2.item_id }, key: keySplit });
                    break;
                case `update-${keySplit}`:
                    this.gs.alert(`You have successfully update ${msgKey}`);
                    action.url && this.router.navigate([action.url]);
                    this.gs.trrigerAction(key);
                    return StoreAction.CourseUpdate({ item: response.data, key: keySplit });
                    break;
                case `add-${keySplit}`:
                    this.gs.alert(`You have successfully add ${msgKey}`);
                    action.url && this.router.navigate([action.url]);
                    this.gs.trrigerAction(key);
                    return StoreAction.CourseAdd({ item: response.data, key: keySplit });
                    break;
                default:
                    return StoreAction.Failure({ error: response.message });
                    break;
            }
        }), catchError((error: Response) => {
            this.gs.trrigerAction(`Error-${action.key?.substring(action.key.indexOf('-') + 1)}`);
            return of(StoreAction.Failure({ error: error }))
        })))
    ));

    courseParamsMore$ = createEffect(() => this.actions$.pipe(
        ofType(StoreAction.OrderMoreParams),
        exhaustMap((action) => this.itemService.orders("GET", action.params, action.params2).pipe(map(response => {
            let key: any = action?.key;
            return StoreAction.OrderMore({ item: response.data, key: key });
        }), catchError((error: Response) => {
            this.gs.trrigerAction(`Error-${action.key?.substring(action.key.indexOf('-') + 1)}`);
            return of(StoreAction.Failure({ error: error }));
        })))
    ));


    // Search

    searchParams$ = createEffect(() => this.actions$.pipe(
        ofType(StoreAction.SearchParams),
        mergeMap((action) => this.itemService.search(action.method, action.params, action.params2).pipe(map(response => {
            let key: any = action?.key;
            let SearchRxKey: any = EnumRxKey.Search;
            let keySplit = key?.substring(key.indexOf('-') + 1);
            let msgKey = keySplit;
            let sort = action.sort ?? EnumRxKey.ArrayOrder.desc;
            let custom_msg = action.msg ?? null;
            switch (key) {
                case SearchRxKey[key]:
                    action.url && this.router.navigate([action.url]);
                    return StoreAction.SearchList({ data: response.data, key: key });
                    break;
                case `delete-${keySplit}`:
                    this.gs.alert(custom_msg ? custom_msg : `You have successfully deleted ${msgKey}`, 'danger');
                    action.url && this.router.navigate([action.url]);
                    this.gs.trrigerAction(key);
                    return StoreAction.SearchDelete({ item: { id: action.params2.item_id }, key: keySplit });
                    break;
                case `update-${keySplit}`:
                    this.gs.alert(custom_msg ? custom_msg : `You have successfully updated ${msgKey}`);
                    action.url && this.router.navigate([action.url]);
                    this.gs.trrigerAction(key);
                    return StoreAction.SearchUpdate({ item: response.data, key: keySplit });
                    break;
                case `add-${keySplit}`:
                    this.gs.alert(custom_msg ? custom_msg : `You have successfully added ${msgKey}`);
                    action.url && this.router.navigate([action.url]);
                    this.gs.trrigerAction(key);
                    return StoreAction.SearchAdd({ item: response.data, key: keySplit });
                    break;
                default:
                    return StoreAction.Failure({ error: response.message });
                    break;
            }
        }), catchError((error: Response) => {
            this.gs.trrigerAction(`Error-${action.key?.substring(action.key.indexOf('-') + 1)}`);
            return of(StoreAction.Failure({ error: error }))
        })))
    ));


    // Contact
    contactParams$ = createEffect(() => this.actions$.pipe(
        ofType(StoreAction.ContactParams),
        mergeMap((action) => this.itemService.contact(action.method, action.params, action.params2).pipe(map(response => {
            let key: any = action?.key;
            let ContactRxKey: any = EnumRxKey.Contact;
            let keySplit = key.substring(key.indexOf('-') + 1);
            let msgKey = keySplit;
            //console.log('response.data', response.data);
            switch (key) {
                case ContactRxKey[key]:
                    action.url && this.router.navigate([action.url]);
                    return StoreAction.ContactList({ data: response.data, key: key });
                    break;
                case `delete-${keySplit}`:
                    this.gs.alert(`You have successfully delete ${msgKey}`, 'danger');
                    action.url && this.router.navigate([action.url]);
                    this.gs.trrigerAction(key);
                    return StoreAction.ContactDelete({ item: { id: action.params2.item_id }, key: keySplit });
                    break;
                case `update-${keySplit}`:
                    this.gs.alert(`You have successfully update ${msgKey}`);
                    action.url && this.router.navigate([action.url]);
                    this.gs.trrigerAction(key);
                    return StoreAction.ContactUpdate({ item: response.data, key: keySplit });
                    break;
                case `add-${keySplit}`:
                    this.gs.alert(`You have successfully add ${msgKey}`);
                    action.url && this.router.navigate([action.url]);
                    this.gs.trrigerAction(key);
                    return StoreAction.ContactAdd({ item: response.data, key: keySplit });
                    break;
                default:
                    return StoreAction.Failure({ error: response.message });
                    break;
            }
        }), catchError((error: Response) => {
            this.gs.trrigerAction(`Error-${action.key?.substring(action.key.indexOf('-') + 1)}`);
            return of(StoreAction.Failure({ error: error }))
        })))
    ));


    // Reference
    referenceParams$ = createEffect(() => this.actions$.pipe(
        ofType(StoreAction.ReferenceParams),
        mergeMap((action) => this.itemService.reference(action.method, action.params, action.params2).pipe(map(response => {
            let key: any = action?.key;
            let ReferenceRxKey: any = EnumRxKey.Reference;
            let keySplit = key.substring(key.indexOf('-') + 1);
            let msgKey = keySplit;
            //console.log('response.data', response.data);
            switch (key) {
                case ReferenceRxKey[key]:
                    action.url && this.router.navigate([action.url]);
                    return StoreAction.ReferenceList({ data: response.data, key: key });
                    break;
                case `delete-${keySplit}`:
                    this.gs.alert(`You have successfully delete ${msgKey}`, 'danger');
                    action.url && this.router.navigate([action.url]);
                    this.gs.trrigerAction(key);
                    return StoreAction.ReferenceDelete({ item: { id: action.params2.item_id }, key: keySplit });
                    break;
                case `update-${keySplit}`:
                    this.gs.alert(`You have successfully update ${msgKey}`);
                    action.url && this.router.navigate([action.url]);
                    this.gs.trrigerAction(key);
                    return StoreAction.ReferenceUpdate({ item: response.data, key: keySplit });
                    break;
                case `add-${keySplit}`:
                    this.gs.alert(`You have successfully add ${msgKey}`);
                    action.url && this.router.navigate([action.url]);
                    this.gs.trrigerAction(key);
                    return StoreAction.ReferenceAdd({ item: response.data, key: keySplit });
                    break;
                default:
                    return StoreAction.Failure({ error: response.message });
                    break;
            }
        }), catchError((error: Response) => {
            this.gs.trrigerAction(`Error-${action.key?.substring(action.key.indexOf('-') + 1)}`);
            return of(StoreAction.Failure({ error: error }))
        })))
    ));


    // Request
    requestParams$ = createEffect(() => this.actions$.pipe(
        ofType(StoreAction.RequestParams),
        mergeMap((action) => this.itemService.request(action.method, action.params, action.params2).pipe(map(response => {
            let key: any = action?.key;
            let RequestRxKey: any = EnumRxKey.Request;
            let keySplit = key.substring(key.indexOf('-') + 1);
            let msgKey = keySplit;
            //console.log('response.data', response.data);
            switch (key) {
                case RequestRxKey[key]:
                    action.url && this.router.navigate([action.url]);
                    return StoreAction.RequestList({ data: response.data, key: key });
                    break;
                case `delete-${keySplit}`:
                    this.gs.alert(`You have successfully delete ${msgKey}`, 'danger');
                    action.url && this.router.navigate([action.url]);
                    this.gs.trrigerAction(key);
                    return StoreAction.RequestDelete({ item: { id: action.params2.item_id }, key: keySplit });
                    break;
                case `update-${keySplit}`:
                    this.gs.alert(`You have successfully update ${msgKey}`);
                    action.url && this.router.navigate([action.url]);
                    this.gs.trrigerAction(key);
                    return StoreAction.RequestUpdate({ item: response.data, key: keySplit });
                    break;
                case `add-${keySplit}`:
                    this.gs.alert(`You have successfully add ${msgKey}`);
                    action.url && this.router.navigate([action.url]);
                    this.gs.trrigerAction(key);
                    return StoreAction.RequestAdd({ item: response.data, key: keySplit });
                    break;
                default:
                    return StoreAction.Failure({ error: response.message });
                    break;
            }
        }), catchError((error: Response) => {
            this.gs.trrigerAction(`Error-${action.key?.substring(action.key.indexOf('-') + 1)}`);
            return of(StoreAction.Failure({ error: error }))
        })))
    ));


    // Ads
    adsParams$ = createEffect(() => this.actions$.pipe(
        ofType(StoreAction.AdsParams),
        mergeMap((action) => this.itemService.ads(action.method, action.params, action.params2).pipe(map(response => {
            let key: any = action?.key;
            let AdsRxKey: any = EnumRxKey.Ads;
            let keySplit = key.substring(key.indexOf('-') + 1);
            let msgKey = keySplit;
            //console.log('response.data', response.data);
            switch (key) {
                case AdsRxKey[key]:
                    action.url && this.router.navigate([action.url]);
                    return StoreAction.AdsList({ data: response.data, key: key });
                    break;
                case `delete-${keySplit}`:
                    this.gs.alert(`You have successfully delete ${msgKey}`, 'danger');
                    action.url && this.router.navigate([action.url]);
                    this.gs.trrigerAction(key);
                    return StoreAction.AdsDelete({ item: { id: action.params2.item_id }, key: keySplit });
                    break;
                case `update-${keySplit}`:
                    this.gs.alert(`You have successfully update ${msgKey}`);
                    action.url && this.router.navigate([action.url]);
                    this.gs.trrigerAction(key);
                    return StoreAction.AdsUpdate({ item: response.data, key: keySplit });
                    break;
                case `add-${keySplit}`:
                    this.gs.alert(`You have successfully add ${msgKey}`);
                    action.url && this.router.navigate([action.url]);
                    this.gs.trrigerAction(key);
                    return StoreAction.AdsAdd({ item: response.data, key: keySplit });
                    break;
                default:
                    return StoreAction.Failure({ error: response.message });
                    break;
            }
        }), catchError((error: Response) => {
            this.gs.trrigerAction(`Error-${action.key?.substring(action.key.indexOf('-') + 1)}`);
            return of(StoreAction.Failure({ error: error }))
        })))
    ));


    // Staff

    staffParams$ = createEffect(() => this.actions$.pipe(
        ofType(StoreAction.StaffParams),
        mergeMap((action) => this.itemService.staff(action.method, action.params, action.params2).pipe(map(response => {
            let key: any = action?.key;
            let StaffRxKey: any = EnumRxKey.Staff;
            let keySplit = key.substring(key.indexOf('-') + 1);
            let msgKey = keySplit;
            //console.log('response.data', response.data);
            switch (key) {
                case StaffRxKey[key]:
                    action.url && this.router.navigate([action.url]);
                    return StoreAction.StaffList({ data: response.data, key: key });
                    break;
                case `delete-${keySplit}`:
                    this.gs.alert(`You have successfully delete ${msgKey}`, 'danger');
                    action.url && this.router.navigate([action.url]);
                    this.gs.trrigerAction(key);
                    return StoreAction.StaffDelete({ item: { id: action.params2.item_id }, key: keySplit });
                    break;
                case `update-${keySplit}`:
                    this.gs.alert(`You have successfully update ${msgKey}`);
                    action.url && this.router.navigate([action.url]);
                    this.gs.trrigerAction(key);
                    return StoreAction.StaffUpdate({ item: response.data, key: keySplit });
                    break;
                case `add-${keySplit}`:
                    this.gs.alert(`You have successfully add ${msgKey}`);
                    action.url && this.router.navigate([action.url]);
                    this.gs.trrigerAction(key);
                    return StoreAction.StaffAdd({ item: response.data, key: keySplit });
                    break;
                default:
                    return StoreAction.Failure({ error: response.message });
                    break;
            }
        }), catchError((error: Response) => {
            this.gs.trrigerAction(`Error-${action.key?.substring(action.key.indexOf('-') + 1)}`);
            return of(StoreAction.Failure({ error: error }))
        })))
    ));

}