import { Routes } from "@angular/router";
import { AuthGuard } from "src/app/guards";
import { DashboardLayoutComponent } from "src/app/layouts";
import { NotificationsComponent } from "./components/notifications/notifications.component";
import { ChangePasswordComponent } from "./components/profile/change-password/change-password.component";
import { ProfileNotificationComponent } from "./components/profile/profile-notification/profile-notification.component";
import { ProfileSettingsComponent } from "./components/profile/profile-settings/profile-settings.component";
import { ProfileViewComponent } from "./components/profile/profile-view/profile-view.component";
import { ProfileComponent } from "./components/profile/profile.component";
import { UpdateProfileComponent } from "./components/profile/update-profile/update-profile.component";
import { TransactionsComponent } from "./components/transactions/transactions.component";


export default [
    {
		path: '', component: DashboardLayoutComponent, canActivate: [AuthGuard], children: [
			{ path: 'transactions', component: TransactionsComponent, title: "Transactions" },
			{ path: 'notifications', component: NotificationsComponent, title: "Notifications" },
		]
	},
	// User Pages Routers 
	{
		path: '', component: DashboardLayoutComponent, canActivate: [AuthGuard], children: [
			{ path: 'change-password', component: ChangePasswordComponent, title: "Change Password" },
			{ path: 'profile', redirectTo: 'profile/settings' },
			{
				path: 'profile', component: ProfileComponent, children: [
					{ path: 'settings', component: ProfileSettingsComponent, title: "Settings" },
					{ path: 'update', component: UpdateProfileComponent, title: "Update Profile" },
					{ path: 'notification', component: ProfileNotificationComponent, title: "Notification" },
					{ path: 'change-password', component: ChangePasswordComponent, title: "Change Password" },
					{ path: 'view/:username', component: ProfileViewComponent, title: "Profile View" },
				]
			},
		]
	},
] as Routes;