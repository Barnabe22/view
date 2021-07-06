<template>
    <div>
        <h2 class="rapportTitleStyle">Réglage de la date limite</h2>
        <div class="dateContentStyle">
            <b-card title="Derniers réglages" class="lastSetCardStyle">  
                <div class="inline-block">
                    <label for="preview-set-date" >Date</label>
                    <b-form-input id="preview-set-date" v-model="previewSetDate" readonly></b-form-input>
                    <label for="preview-set-hour">Heure</label>
                    <b-form-input id="preview-set-hour" v-model="previewSetHour" readonly></b-form-input>
                </div>
            </b-card>
            <b-card title="Régler la date limite">  
                <div class="inline-block">
                    <label for="datepicker0">Nouvelle date</label>
                    <b-form-datepicker id="datepicker0" v-model="currentDate" class="mb-2"></b-form-datepicker>
                    <label for="timepicker0">Nouvelle heure</label>
                    <b-form-timepicker id="timepicker0" v-model="currentHour" locale="fr"></b-form-timepicker>
                </div>
                <div class="inline-block btnStyle">
                    <b-button v-on:click="redirect" variant="danger" class="returnBtnStyle">Retour</b-button>
                    <b-button v-on:click="concatenateDateAndHourAndSave" variant="success">Appliquer</b-button>
                </div>
            </b-card>
        </div>
    </div>
</template>

<script>
import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
Vue.use(VueAxios, axios);
export default {
    name:'SubmitDateFrame',
    data(){
        return{
            currentDate:'',
            currentHour:'',
            previewSetDate:'',
            previewSetHour:'',
            completeSetDate:undefined,
        }
    },
    methods:{
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
        },
        saveCompleteSetDate(){
            const headers = this.getAccessHeader();
            if(this.completeSetDate.id == null){
                Vue.axios
                .post(this.$store.state.baseUrl + "/limite_date", this.completeSetDate,{headers})
                .then(() => {
                    this.showMsgBox("Confirmation", "Date limite modifiée avec succès", "success");
                }).catch(()=>{
                    this.globalRefreshShowMsgBox('Info','C\'est possible qu\'il y ait une erreur\n Actualisation de la session','secondary')
                });
            }else{
                Vue.axios
                .patch(this.$store.state.baseUrl + "/limite_date/"+this.completeSetDate.id, this.completeSetDate,{headers})
                .then(() => {
                    this.showMsgBox("Confirmation", "Date limite modifiée avec succès", "success");
                }).catch(()=>{
                    this.globalRefreshShowMsgBox('Info','C\'est possible qu\'il y ait une erreur\n Actualisation de la session','secondary')
                });
            }
            
        },
        retreiveCompleteSetDate(){
            const headers = this.getAccessHeader();
            Vue.axios.get(this.$store.state.baseUrl+"/limite_date/",{headers})
            .then((response) => {
                this.completeSetDate = response.data[0];
                var tab = this.completeSetDate.date.split(" ")
                this.previewSetDate = tab[0]
                this.previewSetHour = tab[1]
            }).catch(()=>{
                this.globalRefreshShowMsgBox('Info','C\'est possible qu\'il y ait une erreur\n Actualisation de la session','secondary')
            });
        },
        concatenateDateAndHourAndSave(){
            this.previewSetDate = this.currentDate
            this.previewSetHour = this.currentHour
            this.completeSetDate.date = this.currentDate+" "+this.currentHour
            this.saveCompleteSetDate()
        },
        redirect() {
            this.$router.push({ name: "questionsRoute" });
        },
    },
    mounted(){
        this.retreiveCompleteSetDate()
    },
}
</script>

<style scoped>
    .btnStyle{
        margin-top: 1.0em;
        float: right;
    }
    .returnBtnStyle{
        margin-right: 0.5em;
    }
    .dateContentStyle{
        margin-top: 60px;
    }
    .lastSetCardStyle{
        margin-bottom: 1.0em;
    }
</style>