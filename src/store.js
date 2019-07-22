import Vue from"vue"
import Vuex from "vuex"
import axios from "axios"
import {router} from "./router"
Vue.use(Vuex)

const store = new Vuex.Store({
	state : {
		token : "",
		fbApiKey : "AIzaSyCMbeYNM-1Dr3lyl_jjan0WCT7TNE0LUbU"
	},
	mutations : {
		setToken(state,token){
			state.token = token
		},
		clearToken (state){
			state.token = ""
		}
	},
	actions : {
		initAuth({commit, dispatch}){
			let token = localStorage.getItem("token")
			//eğer token varsa
			if(token){
				commit("setToken" ,token)
				router.push("/")
			}
			//eğer token yoksa
			else{
				router.push("/auth")
				return false
			}
		},
		login ({commit, dispatch , state},authData){
			  let authLink = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key="
			  //this.isUser
                if(authData.isUser){
                    authLink = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key="
                }
                return axios.post(
                    authLink + "AIzaSyCMbeYNM-1Dr3lyl_jjan0WCT7TNE0LUbU",
                    {email : authData.email , password : authData.password , retrunSecureToken : true}
                    )
                .then(response =>{
                	//localStorage JavaScript desteklidir.Sayfa yenilendiğnde client de tokenı tutar kaybetmez
                	commit("setToken" ,response.data.idToken)
                	localStorage.setItem("token",response.data.idToken)
                   
                })
                .catch(e =>{
                    alert("Böyle Bir Kullanıcı Bulunamadı")
                })
		},
		logout ({commit, dispatch , state}){
			commit("clearToken")
			localStorage.removeItem("token")

		}
	},
	getters : {
		isAuthenticated(state){
			return state.token !=="" 
		}
	}

})

export default store