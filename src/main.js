import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import App from './App.vue'

import VueRouter from 'vue-router'
import Vuex from 'vuex'

import axios from 'axios'
import VueAxios from 'vue-axios'

import Login from './components/LoginComponents/Login'
import Logout from './components/LoginComponents/Logout'

import Filiales from './components/FilialeComponents/Filiales'
import EditFiliale from './components/FilialeComponents/EditFiliale'
import NewFiliale from './components/FilialeComponents/NewFiliale'
import DeleteFiliale from './components/FilialeComponents/DeleteFiliale'

import Postes from './components/PosteComponents/Postes'
import EditPoste from './components/PosteComponents/EditPoste'
import NewPoste from './components/PosteComponents/NewPoste'
import DeletePoste from './components/PosteComponents/DeletePoste'

import Reports from './components/ReportComponents/Reports'
import EditReport from './components/ReportComponents/EditReport'

import Questions from './components/QuestionComponents/Questions'
import EditQuestion from './components/QuestionComponents/EditQuestion'
import NewQuestion from './components/QuestionComponents/NewQuestion'
import DeleteQuestion from './components/QuestionComponents/DeleteQuestion'
import SubmitDateFrame from './components/QuestionComponents/SubmitDateFrame'

import Users from './components/UserComponents/Users'
import EditUser from './components/UserComponents/EditUser'
import NewUser from './components/UserComponents/NewUser'
import DeleteUser from './components/UserComponents/DeleteUser'

import Sce from './components/SceComponents/Sce'
import EditSce from './components/SceComponents/EditSce'
import NewSce from './components/SceComponents/NewSce'
import DeleteSce from './components/SceComponents/DeleteSce'

import Answers from './components/AnswerComponents/Answers'
import Password from './components/PasswordComponents/Password' 
import Profile from './components/PasswordComponents/Profile'
import Authentication from './components/PasswordComponents/Authentication'
import Home from './components/HomeComponents/Home'

Vue.use(Vuex)

Vue.use(VueRouter)

Vue.use(VueAxios, axios)

const routes =[
  {path:'/', component:Home},
  {path:'/accueil', component:Home,name:'accueilRoute'},
  {path:'/connexion', component:Login, name:'connectionRoute'},
  {path:'/deconnexion', component:Logout, name:'deconnexionRoute'},

  {path:'/filiales', component:Filiales, name:'filialesRoute'},
  {path:'/filiales/:id', component:EditFiliale, name:'editFilialeRoute'},
  {path:'/nouvelle-filiale', component:NewFiliale, name:'newFilialesRoute'},
  {path:'/filiales/supprimer/:id', component:DeleteFiliale, name:'deleteFilialeRoute'},

  {path:'/postes', component:Postes, name:'postesRoute'},
  {path:'/postes/:id', component:EditPoste, name:'editPostesRoute'},
  {path:'/nouveau-poste', component:NewPoste, name:'newPostesRoute'},
  {path:'/postes/supprimer/:id', component:DeletePoste, name:'deletePosteRoute'},

  {path:'/reponses', component:Reports, name:'reponsesRoute'},
  {path:'/rapports', component:Reports, name:'rapportRoute'},
  {path:'/tableau-de-bord', component:Reports, name:'dashboardRoute'},
  {path:'/rapport/:id', component:EditReport, name:'editRapportRoute'},

  {path:'/services', component:Sce, name:'sceRoute'},
  {path:'/services/:id', component:EditSce, name:'editSceRoute'},
  {path:'/nouveau-service', component:NewSce, name:'newSceRoute'},
  {path:'/services/supprimer/:id', component:DeleteSce, name:'deleteSceRoute'},

  {path:'/collaborateurs', component:Users, name:'usersRoute'},
  {path:'/collaborateurs/:id', component:EditUser, name:'editUserRoute'},
  {path:'/nouveau-collaborateur', component:NewUser, name:'newUserRoute'},
  {path:'/collaborateurs/supprimer/:id', component:DeleteUser, name:'deleteUserRoute'},

  {path:'/questions', component:Questions, name:'questionsRoute'},
  {path:'/questions/:id', component:EditQuestion, name:'editQuestionRoute'},
  {path:'/nouvelle-question', component:NewQuestion, name:'newQuestionRoute'},
  {path:'/questions/supprimer/:id', component:DeleteQuestion, name:'deleteQuestionRoute'},
  {path:'/reglage-date-limite', component:SubmitDateFrame,name:'dateRoute'},

  {path:'/repondre', component:Answers, name:'repondreRoute'},
  {path:'/profile-utilisateur', component:Profile, name:'profileRoute'},
  {path:'/modifier-mot-de-passe', component:Password, name:'passwordRoute'},
  {path:'/authentification', component:Authentication, name:'authenticationRoute'},

]
const router = new VueRouter({
  routes
})

const store = new Vuex.Store({
  state: {
    count: 0,
    baseUrl:'https://neodfs.com:8080/questionnaire',
    user:undefined,
    pseudo:'',
    accessToken:'',
    refreshToken:'',
    connected:false,
  },
  mutations: {
    setConnectionState(state,connectionState) {
      state.connected = connectionState
    },
    setBaseUrl(state,url) {
      state.baseUrl = url
    },
    setUser(state,user) {
      state.user = user 
    },
    setAccessToken(state,accessToken) {
      state.accessToken = accessToken 
    },
    setRefreshToken(state,refreshToken) {
      state.refreshToken = refreshToken 
    },
    setPseudo(state,pseudo) {
      state.pseudo = pseudo 
    }
  }
})

Vue.mixin({
  methods:{
    storeUser(user){
      this.$store.commit('setUser',user)
    },
    storeConnectionState(connState){
      this.$store.commit('setConnectionState',connState)
    },
    storePseudo(pseudo){
      this.$store.commit('setPseudo',pseudo)
    },
    storeAccessToken(accessToken) {
      this.$store.commit('setAccessToken',accessToken)
    },
    storeRefreshToken(refreshToken) {
      this.$store.commit('setRefreshToken',refreshToken)
    },
    refreshAccessToken:function(){
      const headers= {'Authorization':'Bearer '+this.$store.state.refreshToken}
      Vue.axios.get(this.$store.state.baseUrl +'/refreshToken',{headers})
      .then((response)=>{
        if( response.status == 200){
          this.$store.commit("setAccessToken",response.data.access_token)
          this.$store.commit("setRefreshToken",response.data.refresh_token)
        }
      }).catch(()=>{
          this.globalSimpleShowMsgBox("Reconnexion", "Veuillez vous reconnecter", "secondary")
      });
    },
    globalSimpleShowMsgBox:function(title, msg, btnVariant) {
      this.$bvModal
        .msgBoxOk(msg, {
          title: title,
          size: "sm",
          buttonSize: "sm",
          okVariant: btnVariant,
          headerClass: "p-2 border-bottom-0",
          footerClass: "p-2 border-top-0",
          centered: true,
        }).then(()=>{
          this.$router.push({name:"connectionRoute"})
        })
    },
    globalSimple2ShowMsgBox:function(title, msg, btnVariant) {
      this.$bvModal
        .msgBoxOk(msg, {
          title: title,
          size: "sm",
          buttonSize: "sm",
          okVariant: btnVariant,
          headerClass: "p-2 border-bottom-0",
          footerClass: "p-2 border-top-0",
          centered: true,
        })
    },
    globalRefreshShowMsgBox:function(title, msg, btnVariant) {
      this.$bvModal
        .msgBoxOk(msg, {
          title: title,
          size: "sm",
          buttonSize: "sm",
          okVariant: btnVariant,
          headerClass: "p-2 border-bottom-0",
          footerClass: "p-2 border-top-0",
          centered: true,
        })
        .then(() => {
          this.refreshAccessToken()
          //this.$router.push(route)
        });
    },
    getAccessHeader:function(){
      return {
        'Authorization':'Bearer '+this.$store.state.accessToken
      }
    },
    getRefreshHeader:function(){
      return {
        'Authorization':'Bearer '+this.$store.state.refreshToken
      }
    },
  },
  
})

Vue.config.productionTip = false
new Vue({
  router:router,
  store:store,
  render: h => h(App),
}).$mount('#app')
