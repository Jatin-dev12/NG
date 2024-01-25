import { Routes } from "@angular/router";
import { Enums } from "src/app/enums";
import { NotAuthGuard } from "src/app/guards";
import { SearchLayoutComponent } from "src/app/layouts";
import { BecomeRegisterComponent } from "./components/become-register/become-register.component";
import { EmailVerifyComponent } from "./components/email-verify/email-verify.component";
import { ExportSuccessMessageComponent } from "./components/export-success-message/export-success-message.component";
import { ForgotPasswordComponent } from "./components/forgot-password/forgot-password.component";
import { LoginWithOtpComponent } from "./components/login-with-otp/login-with-otp.component";
import { LoginComponent } from "./components/login/login.component";
import { ReactivationComponent } from "./components/reactivation/reactivation.component";
import { RegisterComponent } from "./components/register/register.component";
import { ResetPasswordComponent } from "./components/reset-password/reset-password.component";


export default [
    {
		path: '', component: SearchLayoutComponent, children: [
			{ path: 'become-register', component: BecomeRegisterComponent, canActivate: [NotAuthGuard], title: "Become Register" },
		]
	},
	{
		path: '', component: SearchLayoutComponent, children: [
			{ path: 'login', component: LoginComponent, canActivate: [NotAuthGuard], data: { Role: Enums.Role.ROLE_USER }, title: "Login" },
			{ path: 'login-customer', component: LoginComponent, canActivate: [NotAuthGuard], title: "Customer Login" },
			{ path: 'register', component: RegisterComponent, canActivate: [NotAuthGuard], data: { Role: Enums.Role.ROLE_USER }, title: "Register" },
			{ path: 'forgot-password', component: ForgotPasswordComponent, canActivate: [NotAuthGuard], title: "Forgot Password" },
			{ path: 'reset-password', component: ResetPasswordComponent, canActivate: [NotAuthGuard], title: "Reset PAssword" },
			{ path: 'email-verification', component: EmailVerifyComponent, canActivate: [NotAuthGuard], title: "Email Verification" },
			{ path: 'login-otp', component: LoginWithOtpComponent, canActivate: [NotAuthGuard], title: "Login With Login" },
			{ path: 'user-reactivation', component: ReactivationComponent, canActivate: [NotAuthGuard], title: "User Reactivation" },
		],
	},
	{ path: 'success-message', component: ExportSuccessMessageComponent, title: "Success Message" },
] as Routes;