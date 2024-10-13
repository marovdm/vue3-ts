import { StoreInstance } from "@/store";
import { Router } from "vue-router";

export function initPagesAuthGuard(store: StoreInstance, router: Router){
	router.beforeEach((to, _from, next) => {
		const onlyAuth = to.matched.some(r => r.meta.auth);
		const onlyGuest = to.matched.some(r => r.meta.guest);

		if(onlyAuth || onlyGuest){
			const authStore = store.auth();
			// async load user, later

			if(onlyAuth && !authStore.isAuth){
				next({ name: 'auth.login' });
			}
			else if(onlyGuest && authStore.isAuth){
				next({ name: 'office.dashboard' });
			}
			else{
				next();
			}
		}
		else{
			next();
		}
	});	
}