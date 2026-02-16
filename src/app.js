const { createApp } = Vue;
import Header from "./components/Header.js";
import Error from "./components/modals/Error.js"
import Help from "./components/modals/Help.js";
import CSVLoader from "./components/CSVLoader.js";

createApp({
    components:{
        'header-component' : Header,
        'help-modal' : Help,
        'error-modal': Error,
        'csv-loader' : CSVLoader,
    },
    data(){
        return{
            title : 'MFT Web Viewer',
            isShowTable: false,
            mftData: [],
            filteredMftData: [],
            showHelpModal : false,
            showErrorModal: false,
            errorMSG: ''
        }
    },
    methods: {
        handleErrorModal(data){
            this.showErrorModal = data;
            this.errorMSG = '';
        },
        getMFTData(data){
            if(data.error){
                //this.showErrorModal(data.msg);
                this.showErrorModal = true;
                this.errorMSG = data.msg;
                return;
            } 
            console.log("ROWS:", data.length);
            this.mftData = Object.freeze(data);
            this.filteredMftData = this.mftData;
        }
    },
    computed:{
        // TODO
    }
}).mount('#app');