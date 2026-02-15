const { createApp } = Vue;
import Header from "./components/Header.js";
import Help from "./components/modals/Help.js";
import CSVLoader from "./components/CSVLoader.js";

createApp({
    components:{
        'header-component' : Header,
        'help-modal' : Help,
        'csv-loader' : CSVLoader,
    },
    data(){
        return{
            title : 'MFT Web Viewer',
            isShowTable: false,
            mftData: [],
            filteredMftData: [],
            showHelpModal : false
        }
    },
    methods: {
        getMFTData(data){
            console.log("ROWS:", data.length);
            this.mftData = Object.freeze(data);
            this.filteredMftData = this.mftData;
        }
    },
    computed:{
        // TODO
    }
}).mount('#app');