import { createEntityAdapter, EntityAdapter, EntityState } from "@ngrx/entity";
import { createReducer, on } from "@ngrx/store";
import { Notifications, Pagination } from "src/app/models";
import { StoreAction } from "src/app/store/actions";

export interface State extends EntityState<Notifications> {
    loaded: boolean,
    loading: boolean,
    moreLoading: boolean,
    pagination: any,
    error: any
}

export const notificationAdapter: EntityAdapter<Notifications> = createEntityAdapter<Notifications>({
    sortComparer: false,
    selectId: (model: Notifications) => model.message_id,
});

export const initialState: State = notificationAdapter.getInitialState({
    loaded: true,
    loading: false,
    moreLoading: false,
    pagination: null,
    error: '',
});

export function sortByName(a: Notifications, b: Notifications): number {
    const compare = a.notification.localeCompare(b.notification);
    if (compare > 0) return -1;
    if (compare < 0) return 1;
    return compare;
}


export const STATE_NAME = 'notification';

const _notificationReducer = createReducer(
    initialState,
    on(StoreAction.NotificationParams, (state, action) => {
        return { ...state, loading: true, moreLoading: false };
    }),
    on(StoreAction.NotificationList, (state, action) => {
        //console.log('action action', action)
        switch (action.key) {
            case 'setAll':
                return notificationAdapter.setAll(action.data ? action.data.items : [], {
                    ...state, pagination: action.data ? action.data.pagination : null, loading: false, loaded: false,
                });
                break;
            case 'removeOne':
                return notificationAdapter.removeOne(action.data.id, {
                    ...state, loading: false, loaded: false,
                });
                break;
            case 'updateOne':
                console.log('action.update', action.update)
                return notificationAdapter.updateOne(action.update, {
                    ...state, loading: false, loaded: false,
                });
                break;
            case 'addOne':
                console.log('action.update', action.update)
                return notificationAdapter.addOne(action.data, {
                    ...state, loading: false, loaded: false,
                });
                break;
            default:
                return notificationAdapter.setAll(action.data ? action.data.items : [], {
                    ...state, pagination: action.data ? action.data.pagination : null, loading: false, loaded: false,
                });
                break;
        }
    }),
    on(StoreAction.Failure, (state, action) => {
        return { ...state, error: action.error, loading: false, moreLoading: false, loaded: false, };
    })
);

export function Reducer(state: any, action: any) {
    return _notificationReducer(state, action);
}