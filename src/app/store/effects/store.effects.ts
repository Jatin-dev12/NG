import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, exhaustMap, map, mergeMap, tap } from "rxjs/operators";
import { EnumRxKey, Enums, Success } from "src/app/enums";
import { GlobalService, ItemService } from "src/app/services";
import { StoreAction } from "../actions";
import { isBrowser, removeItem, setItem } from "src/app/helpers";


@Injectable()

export class StoreEffects {
    constructor(
        private actions$: Actions,
        private gs: GlobalService,
        private itemService: ItemService,
        private router: Router,
    ) {

    }

    // key => 'login' 'verify-2-factor' 'register' 'resend-verification' 'email-verification' 'otp-verification' 'reset-password' 'forgot-password' 'check-trigger' 'check-email' 'check-sms' 'is-email-exists'
    authParams = createEffect(() => this.actions$.pipe(
        ofType(StoreAction.AuthParams),
        exhaustMap((action) => {
            return this.itemService.auth(action.params, action.params2).pipe(map(response => {
                let key = action.params2?.key ?? '';
                //console.log('response', response, action);
                switch (key) {
                    case EnumRxKey.Auth.login:
                        //case EnumRxKey.Auth.reactivation:
                        //console.log('response.token', response);
                        removeItem('cart');
                        removeItem('selectedIndex');
                        (response.token) && this.gs.alert(Success.AUTH_LOGIN_SUCCESS, 'success');
                        setTimeout(() => {
                            if (response.token) {
                                if (isBrowser) {
                                    setItem('token', JSON.stringify(response.token));
                                    setItem('user', JSON.stringify(response.data));
                                    if (response.data.role === Enums.Role.ROLE_USER) {
                                        window.location.href = action.url;
                                    } else {
                                        window.location.href = action.url;
                                    }
                                }
                                return StoreAction.LoginSuccess({ user: response.data });
                            } else {
                                let access_code = response.data?.base32;
                                //console.log('response', access_code)
                                this.router.navigate(['/login-otp'], { queryParams: { access_code: access_code } });
                                return StoreAction.Failure({ error: key });
                            }
                        }, 400);
                        return StoreAction.LoginSuccess({ user: response.data });
                        break;
                    case EnumRxKey.Auth.register:
                        this.gs.alert(Success.AUTH_REGISTER);
                        removeItem('cart');
                        removeItem('selectedIndex');
                        this.gs.trrigerAction('CloseAuthDialog');
                        if (response?.data?.role === Enums.Role.ROLE_USER) {
                            this.router.navigate([action.url]);
                        } else {
                            this.router.navigate([action.url]);
                        }
                        return StoreAction.Failure({ error: key });
                        break;
                    case EnumRxKey.Auth.resendVerification:
                        this.gs.alert(Success.AUTH_RESEND_VERIFICATION, 'success');
                        this.gs.trrigerAction('CloseAuthDialog');
                        return StoreAction.Failure({ error: key });
                        break;
                    case EnumRxKey.Auth.emailVerification:
                        this.gs.alert(Success.AUTH_EMAIL_VERIFICATION, 'success');
                        this.gs.trrigerAction('CloseAuthDialog');
                        this.router.navigate([action.url]);
                        return StoreAction.Failure({ error: response.data });
                        break;
                    case EnumRxKey.Auth.otpVerification:
                    case EnumRxKey.Auth.verify2factor:
                        console.log('response', response);
                        //return StoreAction.Failure({ error: key });
                        if (response.token) {
                            this.gs.alert(Success.AUTH_LOGIN_SUCCESS, 'success');
                            setItem('token', JSON.stringify(response.token));
                            setItem('user', JSON.stringify(response.data));
                            this.gs.trrigerAction('CloseAuthDialog');
                            if (isBrowser) {
                                if (response.data.role === Enums.Role.ROLE_USER) {
                                    window.location.href = '/';
                                } else {
                                    window.location.href = '/';
                                }
                            }
                            return StoreAction.LoginSuccess({ user: response.data });
                        } else {
                            this.gs.alert('User data not found', 'danger');
                            return StoreAction.Failure({ error: key });
                        }
                        break;
                    case EnumRxKey.Auth.resetPassword:
                        this.gs.alert(Success.AUTH_RESET_PASSWORD, 'success');
                        this.gs.trrigerAction('CloseAuthDialog');
                        this.gs.router('/login');
                        return StoreAction.Failure({ error: key });
                        break;
                    case EnumRxKey.Auth.forgotPassword:
                        this.gs.alert(Success.AUTH_FORGOT_PASSWORD, 'success');
                        this.gs.trrigerAction('CloseAuthDialog');
                        this.gs.router('/');
                        return StoreAction.Failure({ error: key });
                        break;
                    case EnumRxKey.Auth.isEmailExists:
                        this.gs.alert(Success.AUTH_IS_EMAIL_EXISTS, 'success');
                        this.gs.trrigerAction('CloseAuthDialog');
                        return StoreAction.Failure({ error: key });
                        break;
                    case EnumRxKey.Auth.reactivation:
                        this.gs.alert(Success.AUTH_REACTIVATION, 'success');
                        removeItem('cart');
                        removeItem('selectedIndex');
                        setTimeout(() => {
                            if (response.token) {
                                setItem('token', JSON.stringify(response.token));
                                setItem('user', JSON.stringify(response.data));
                                if (isBrowser) {
                                    if (response.data.role === Enums.Role.ROLE_USER) {
                                        window.location.href = '/';
                                    } else {
                                        window.location.href = '/';
                                    }
                                }
                                return StoreAction.LoginSuccess({ user: response.data });
                            } else {
                                let access_code = response.data?.access_code;
                                //console.log('response', access_code)
                                this.router.navigate(['/login-otp'], { queryParams: { access_code: access_code } });
                                return StoreAction.Failure({ error: key });
                            }
                        }, 400);
                        return StoreAction.LoginSuccess({ user: response.data });
                        break;
                    default:
                        //this.gs.alert('Key not define', 'warning');
                        return StoreAction.Failure({ error: 'Key not define' });
                        break;
                }
            }), (catchError((error: Response) => {
                let errors: any = error;
                let mainData = this.gs.apiResponce(errors.error);
                if (mainData.status === 422 && mainData.data?.user_id) {
                    //console.log('mainData', mainData, errors);
                    let user_id = mainData.data?.user_id;
                    let params2 = { key: EnumRxKey.Auth.resendVerification, user_id: user_id };
                    this.itemService.auth(null, params2).subscribe(response => {
                        //console.log('response', response)
                    })
                    //this.gs.store.dispatch(StoreAction.AuthParams({ params: null, params2: params2 }));
                }
                this.gs.trrigerAction(`Error-${action.params2?.key}`);
                return of(StoreAction.Failure({ error }));
            })))
        })
    ));

    oAuthParams = createEffect(() => this.actions$.pipe(
        ofType(StoreAction.OauthParams),
        exhaustMap((action) => {
            return this.itemService.oauth(action.params, action.params2).pipe(map(response => {
                setItem('token', JSON.stringify(response.token));
                setItem('user', JSON.stringify(response.data));
                this.gs.alert(Success.AUTH_LOGIN_SUCCESS, 'success');
                if (isBrowser) {
                    window.location.href = '/';
                }
                return StoreAction.LoginSuccess({ user: response.data });
            }), (catchError((error: Response) => {
                this.gs.trrigerAction(`Error-${action.params2?.key}`);
                return of(StoreAction.Failure({ error }));
            })))
        })
    ));

    localStorage$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(...[StoreAction.LoginSuccess]),
            tap((action) => {
                const response = action.user;
                setItem('user', JSON.stringify(response));
            }));
    }, { dispatch: false });

    // Default Effects

    itemDefault$ = createEffect(() => this.actions$.pipe(
        ofType(StoreAction.ItemParams),
        mergeMap((action) =>
            this.itemService.item(action.method, action.params, action.params2).pipe(map(response => {
                let key: any = action?.key;
                let itemRxKey: any = EnumRxKey.Item;
                let keySplit = key.substring(key.indexOf('-') + 1);
                switch (key) {
                    case itemRxKey[key]:
                        return StoreAction.ItemList({ data: response.data, key: key });
                        break;
                    case `delete-${keySplit}`:
                        this.gs.alert(`You have successfully delete ${key.toLowerCase()}`, 'danger');
                        action.url && this.router.navigate([action.url]);
                        return StoreAction.ItemDelete({ item: { id: action.params2.item_id }, key: keySplit });
                        break;
                    case `update-${keySplit}`:
                        this.gs.alert(`You have successfully update ${key.toLowerCase()}`);
                        action.url && this.router.navigate([action.url]);
                        return StoreAction.ItemUpdate({ item: response.data, key: keySplit });
                        break;
                    case `add-${keySplit}`:
                        this.gs.alert(`You have successfully add ${key.toLowerCase()}`);
                        action.url && this.router.navigate([action.url]);
                        return StoreAction.ItemAdd({ item: response.data, key: keySplit });
                        break;
                    default:
                        return StoreAction.Failure({ error: response.message });;
                        break;
                }
            }), catchError((error: Response) => { return of(StoreAction.Failure({ error })); }))
        )));

    defaultDefault$ = createEffect(() => this.actions$.pipe(
        ofType(StoreAction.DefaultParams),
        mergeMap((action) =>
            this.itemService.default(action.method, action.params, action.params2).pipe(map(response => {
                let key: any = action?.key;
                let defaultRxKey: any = EnumRxKey.Default;
                let keySplit = key.substring(key.indexOf('-') + 1);
                let msgKey = keySplit;
                let custom_msg = action.msg ?? null;
                switch (key) {
                    case defaultRxKey[key]:
                        action.url && this.router.navigate([action.url]);
                        return StoreAction.DefaultList({ data: response.data ?? { items: [], pagination: null }, key: key });
                        break;
                    case `delete-${keySplit}`:
                        this.gs.alert(custom_msg ? custom_msg : `You have successfully deleted the ${msgKey}`, 'danger');
                        action.url && this.router.navigate([action.url]);
                        this.gs.trrigerAction(key);
                        return StoreAction.DefaultDelete({ item: { id: action.params2.item_id }, key: keySplit });
                        break;
                    case `update-${keySplit}`:
                        this.gs.alert(custom_msg ? custom_msg : `You have successfully updated the ${msgKey}`);
                        action.url && this.router.navigate([action.url]);
                        this.gs.trrigerAction(key);
                        return StoreAction.DefaultUpdate({ item: response.data, key: keySplit });
                        break;
                    case `add-${keySplit}`:
                        this.gs.alert(custom_msg ? custom_msg : `You have successfully added the ${msgKey}`);
                        action.url && this.router.navigate([action.url]);
                        this.gs.trrigerAction(key);
                        return StoreAction.DefaultAdd({ item: response.data, key: keySplit });
                        break;
                    default:
                        return StoreAction.Failure({ error: response.message });
                        break;
                }
            }), catchError((error: Response) => {
                this.gs.trrigerAction(`Error-${action.key}`);
                return of(StoreAction.Failure({ error }));
            }))
        )));

    defaultLoadMOre$ = createEffect(() => this.actions$.pipe(
        ofType(StoreAction.DefaultMoreParams),
        exhaustMap((action) =>
            this.itemService.default(action.method, action.params, action.params2).pipe(map(response => {
                let key: any = action?.key;
                return StoreAction.DefaultMore({ item: response.data, key: key });
            }), catchError((error: Response) => {
                this.gs.trrigerAction(`Error-${action.key?.substring(action.key.indexOf('-') + 1)}`);
                return of(StoreAction.Failure({ error }));
            }))
        )));

    // Support
    /*supportDefault$ = createEffect(() => this.actions$.pipe(
        ofType(StoreAction.SupportParams),
        mergeMap((action) =>
            this.itemService.support(action.method, action.params, action.params2).pipe(map(response => {
                let key: any = action?.key ?? EnumRxKey.Item.support;
                let itemRxKey: any = EnumRxKey.Item;
                //console.log('response', response, key)
                let keySplit = key.substring(key.indexOf('-') + 1);
                switch (key) {
                    case itemRxKey[key]:
                        return StoreAction.ItemList({ data: response.data, key: key });
                        break;
                    case `add-${keySplit}`:
                        this.gs.alert(`You have successfully add ${key.toLowerCase()}`);
                        action.url && this.router.navigate([action.url]);
                        return StoreAction.ItemAdd({ item: response.data, key: keySplit });
                        break;
                    case `update-${keySplit}`:
                        this.gs.alert(`You have successfully update ${key.toLowerCase()}`);
                        action.url && this.router.navigate([action.url]);
                        return StoreAction.ItemAdd({ item: response.data, key: keySplit });
                        break;
                    default:
                        return StoreAction.Failure({ error: response.message });;
                        break;
                }
            }), catchError((error: Response) => {
                this.gs.trrigerAction(`Error-${action.key}`);
                return of(StoreAction.Failure({ error }));
            }))
        )));
    */

    uploads$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(StoreAction.UploadParams),
            exhaustMap((action) => {
                return this.itemService.basicUpload(action.params).pipe(map((data) => {
                    if (data.data.files) {
                        let uploadedFiles = action.upload;
                        let response = data.data.files;
                        let files = response &&
                        {
                            image: response.filter((file: any) => (file.mimetype === 'image')),
                            video: response.filter((file: any) => (file.mimetype === 'video')),
                            docs: response.filter((file: any) => (file.mimetype !== 'video' && file.mimetype !== 'image')),
                        };
                        const allFiles = {
                            image: (uploadedFiles && uploadedFiles?.image) ? files?.image.concat(uploadedFiles.image) : files?.image,
                            video: (uploadedFiles && uploadedFiles?.video) ? files?.video.concat(uploadedFiles.video) : files?.video,
                            docs: (uploadedFiles && uploadedFiles?.docs) ? files?.docs.concat(uploadedFiles.docs) : files?.docs,
                        };
                        this.gs.alert('File successfully uploaded.', 'success');
                        return StoreAction.UploadRespond({ files: allFiles });
                    } else {
                        this.gs.alert('Action not perform', 'danger');
                        return StoreAction.Failure({ error: 'Upload in progress' });
                    }
                }), catchError((error) => { return of(StoreAction.Failure({ error })); }));
            }));
    });

    /*notification$ = createEffect(() => this.actions$.pipe(
        ofType(StoreAction.NotificationParams),
        exhaustMap((action) => this.itemService.notification(action.method, action.params, action.params2).pipe(map(response => {
            let data = (action.method === 'DELETE') ? { id: action.params2.item_id } : response.data;
            let update: Update<Notifications> = (action.key === 'updateOne') ? { id: action.item.message_id, changes: { ...action.item } } : response.data;
            if ((action.method === 'DELETE') || (action.key === 'updateOne')) this.gs.alert(response.message);
            return StoreAction.NotificationList({ data: data, key: action.key, update: update });
        }), catchError((error) => {
            this.gs.trrigerAction(`Error-${action.key}`);
            return of(StoreAction.Failure({ error }));
        })))
    ));*/


    // Extra Effects

    // Guest Cart

    /*guestCart$ = createEffect(() => this.actions$.pipe(
        ofType(StoreAction.GuestCartParams),
        switchMap(action => {
            setItem('cart', JSON.stringify(action.params));
            return of(StoreAction.GuestCartList({ data: action.params }));

        })
    ));*/

}