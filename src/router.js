import Vue from "vue"
import VueRouter from "vue-router"

import About from "./pages/About"
import HomePage from "./pages/HomePage"
import Auth from "./pages/auth/Auth"
import store from "./store"

Vue.use(VueRouter)
export const router = new VueRouter({
	routes : [
	{
		path : "/" , 
		component : HomePage , 
		beforeEnter(to, from, next){
			//giriş yapmışsa 
			if(store.getters.isAuthenticated){
				next()
			}
			//giriş yapmamışsa auth a yönlendir
			else{
				next("/auth")
			}
		}
	},
	{
		path : "/about" , 
		component : About , 
		beforeEnter(to, from, next){
			//giriş yapmışsa 
			if(store.getters.isAuthenticated){
				next()
			}
			//giriş yapmamışsa auth a yönlendir
			else{
				next("/auth")
			}
			
		}
	},
	{path : "/auth" , component : Auth}
	],
	mode : "history"
})
