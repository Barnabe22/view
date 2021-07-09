<template>
    <div>
        <h2 class="rapportTitleStyle">Repondre aux questions</h2>
        <div class="questionContentStyle">
            <div v-if="inTime == true" v-show="inTime == true && questions_length==0" class="noQuestionMsgStyle">
                <span style="color:red">Pas de question(s) pour votre catégorie </span>
            </div>
            <div v-show="inTime == false " class="noQuestionMsgStyle">
                <span style="color:red">Désolé on n'est pas dans la periode de soumissions des rapports</span>
            </div>
            <div v-if="questions_length>0" v-show="inTime == true && questions_length>0" >
                <!--<h3> Reponses: {{rapports.reponses}}</h3>-->
                <div class="inline-block btnDivStyle">
                    <b-button v-on:click="saveReport" v-show="count_clown > questions_length-1" 
                    class="btnInDivStyle" variant="success">
                        Soumettre
                    </b-button>
                    <!--<b-button v-on:click="decreaseCount" class="btnInDivStyle">Retour</b-button>-->
                    <b-button v-on:click="increaseCount" v-show="count != questions_length">
                            <span v-show="count_clown >= questions_length">
                                Terminer
                            </span> 
                            <span v-show="count_clown < questions_length">
                                Suivant
                            </span> 
                             
                    </b-button>
                </div><br/>
                <div class="noQuestionMsgStyle">
                <b-card v-if="count_clown > questions_length-1">
                    <p>Vous êtes à la fin du questionnaire. Soumettez votre resultat en cliquant sur le bouton soumettre</p>
                </b-card>
                <b-card v-if="count<questions_length">
                    <div> 
                        <b-form-textarea id="textarea-plaintext" plaintext 
                            :value="questions[count].description">
                        </b-form-textarea>
                    </div>
                    <div v-if="questions[count].is_qcm=='true'">
                       <div v-if="questions[count].qcm_mode=='RADIO'">
                            
                            <b-form-group label="Choisissez une reponse" v-slot="{ ariaDescribedby }">
                                <b-form-radio-group
                                    id='radio-group-1'
                                    v-model="radioAnswer"
                                    :aria-describedby="ariaDescribedby"
                                    name='radio-sub-component'
                                >
                                    <b-form-radio v-for="(suggestion,index) in questions[count].suggestions" :key="index" 
                                        :value="suggestion"> {{suggestion}} </b-form-radio>
                                </b-form-radio-group>
                            </b-form-group>
                        </div>

                   
                       <div v-else-if="questions[count].qcm_mode=='CHECK'">
                            <b-form-group label="Vous pouvez choisir une ou plusieurs reponses" v-slot="{ ariaDescribedby }">
                                <b-form-checkbox-group
                                    id='checkbox-group-1'
                                    v-model="checkAnswer"
                                    :aria-describedby="ariaDescribedby"
                                    name='flavour-1'
                                >
                                    <b-form-checkbox v-for="(suggestion,index) in questions[count].suggestions" :key="index" 
                                        :value="suggestion">{{suggestion}}</b-form-checkbox>
                                </b-form-checkbox-group>
                            </b-form-group>
                        </div>
                    </div>
                    <div v-else-if="questions[count].is_qcm=='false'" class="inputDivStyle"> 
                        <b-form-input v-model="inputAnswer" placeholder="Saisissez votre reponse"></b-form-input>
                    </div>
                    
                    <div v-else-if="count >= questions.length"> 
                        <span>Fin</span>
                    </div>
                    <div > 
                        <b-form-input v-model="comment" placeholder="Un eventuel commentaire"></b-form-input>
                    </div>
                </b-card>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";

Vue.use(VueAxios, axios);
export default {
    name:'Answers',
    data(){
        return{
            questions:[],
            rapports:{  
                id: null,
                user:this.$store.state.user/*{
                    id:this.$store.state.user.id,
                    name: this.$store.state.user.name,
                    surname: this.$store.state.user.surname
                }*/,
                questions_desc:[],
                reponses:[],
                comments:[]
                
            },
            inputAnswer:'',
            radioAnswer:'',
            checkAnswer:[],
            comment:'',
            count:0,
            count_clown:0,
            questions_length:0,
            route:{name:'repondreRoute'},
            completeSetDate:'',
            inTime:false,
        }
    },
    methods:{
        addAnswer(i){
                if(this.questions[i].is_qcm == 'true' && this.questions[i].qcm_mode == 'CHECK' ){
                    this.rapports.reponses.push(this.checkAnswer.toString())
                }else if(this.questions[i].is_qcm == 'true' && this.questions[i].qcm_mode == 'RADIO' ){
                    this.rapports.reponses.push(this.radioAnswer)
                }else if(this.questions[i].is_qcm == 'false'){
                    this.rapports.reponses.push(this.inputAnswer)
                }
                this.rapports.comments.push(this.comment)
        },
        updateAnswer(i){
                if(this.questions[i].is_qcm == 'true' && this.questions[i].qcm_mode == 'CHECK' ){
                    this.rapports.reponses[i] = this.checkAnswer.toString()
                }else if(this.questions[i].is_qcm == 'true' && this.questions[i].qcm_mode == 'RADIO' ){
                    this.rapports.reponses[i]=this.radioAnswer
                }else if(this.questions[i].is_qcm == 'false'){
                    this.rapports.reponses[i]=this.inputAnswer
                }
                this.rapports.comments[i]=this.comment
        },
        retrieveAnswer(i){
            if(this.questions[i].is_qcm == 'true' && this.questions[i].qcm_mode == 'CHECK' ){
                this.checkAnswer = this.rapports.reponses[i].split(',')
            }else if(this.questions[i].is_qcm == 'true' && this.questions[i].qcm_mode == 'RADIO' ){
                this.radioAnswer=this.rapports.reponses[i]
            }else if(this.questions[i].is_qcm == 'false'){
                this.inputAnswer=this.rapports.reponses[i]
            }
            this.comment = this.rapports.comments[i]
        },
        increaseCount(){
            this.count = this.count + 1
            if(this.count <= this.questions_length && this.count > this.count_clown){
                this.addAnswer(this.count-1)
                this.inputAnswer = ''
                this.radioAnswer = ''
                this.checkAnswer = []
                this.comment = ''
                this.count_clown = this.count
            }else if(this.count <= this.questions_length && this.count <= this.count_clown){
                this.updateAnswer(this.count-1)
                this.inputAnswer = ''
                this.radioAnswer = ''
                this.checkAnswer = []
                this.comment = ''
                this.count_clown = this.count
            }
        },
        decreaseCount(){
            if(this.count > 0){
                this.count = this.count - 1
            }
            this.retrieveAnswer(this.count)
        },
        showMsgBox(title, msg, btnVariant) {
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
                if (title == "Confirmation") {
                    this.redirect();
                }
            });
        },
        saveReport(){
            //this.decreaseCount()
            const headers = this.getAccessHeader()
            Vue.axios
            .post(this.$store.state.baseUrl +'/rapports', this.rapports,{headers})
            .then(() => {
                this.showMsgBox("Confirmation", "Rapport soumis avec succès", "success");
            }).catch(()=>{
                this.globalRefreshShowMsgBox('Info','Il se peut qu\'il y ait une erreur \nActualisation de la session','secondary')
            });
        },
        redirect() {
            this.$router.push({ name: "accueilRoute" });
        },

    },
    beforeMount(){
        if(this.$store.state.user.role != 'USER'){
            this.$router.push({ name: "connectionRoute" });
            this.$store.commit('setUser',null)
        }
    },
    mounted(){
        const headers = this.getAccessHeader()//{'Authorization':'Bearer '+this.$store.state.accessToken}
        
        Vue.axios
          .get(this.$store.state.baseUrl + "/limite_date",{headers})
          .then((response) => {
                this.completeSetDate = response.data[0].date;
                let endDate = Date.parse(this.completeSetDate)
                let now = new Date()
                if(endDate>now){
                    this.inTime = true
                    //this.globalSimple2ShowMsgBox('Info','Vous êtes dans la periode\n definie', 'success')
                }else{
                    this.inTime = false
                    //this.globalSimple2ShowMsgBox('Désolé','Vous n\'êtes pas dans la\n periode definie', 'danger')
                }
          }).catch(()=>{
                this.globalRefreshShowMsgBox('Info','Actualisation de la session','success')
          });

          Vue.axios
          .get(this.$store.state.baseUrl + "/questions/filter?sce="+this.$store.state.user.sce_name
            +"&poste_name="+this.$store.state.user.poste_name,{headers})
          .then((response) => {
                this.questions=response.data;
                this.questions_length = this.questions.length
                if(this.questions_length>0){
                    this.questions.forEach((question)=>{
                        this.rapports.questions_desc.push(question.description)
                    })
                }
          }).catch(()=>{
                this.globalRefreshShowMsgBox('Info','Actualisation de la session','success')
          });
    },

}

</script>

<style scoped>
    .questionContentStyle{
        margin-left: 10%;
        margin-right: 10%;
    }
    .noQuestionMsgStyle{
        margin-top: 150px;
        text-align: center;
    }
    .btnDivStyle {
        float: right;
        margin-top: 1em;
    }
    .btnInDivStyle {
        margin-right: 0.5em;
    }
    .inputDivStyle{
        margin-bottom: 0.5em;
    }
</style>