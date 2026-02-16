const { createApp } = Vue;
import Header from "./components/Header.js";
import Error from "./components/modals/Error.js"
import Help from "./components/modals/Help.js";
import CSVLoader from "./components/CSVLoader.js";
import MFTTable from "./components/MFTTable.js";

createApp({
    components:{
        'header-component' : Header,
        'help-modal' : Help,
        'error-modal': Error,
        'csv-loader' : CSVLoader,
        'mft-table'  : MFTTable
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
                this.showErrorModal = true;
                this.errorMSG = data.msg;
                return;
            } 
            console.log("ROWS:", data.data.length);
            this.mftData = Object.freeze(data.data);
            this.filteredMftData = this.mftData;
        }
    },
    computed:{
        limitedData(){
            const start = 0; 
            const end = 30;
            return this.filteredMftData.slice(start, end);
        }
    }
}).mount('#app');