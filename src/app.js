const { createApp } = Vue;
import Header from "./components/Header.js";
import Error from "./components/modals/Error.js"
import Help from "./components/modals/Help.js";
import Loader from "./components/Loader.js";
import CSVLoader from "./components/CSVLoader.js";
import MFTTable from "./components/MFTTable.js";
import Pager from "./components/Pager.js"

createApp({
    components:{
        'header-component' : Header,
        'help-modal' : Help,
        'error-modal': Error,
        'data-loader': Loader,
        'csv-loader' : CSVLoader,
        'mft-table'  : MFTTable,
        'pager-component': Pager
    },
    data(){
        return{
            title : 'MFT Web Viewer',
            isLoading: false,
            isShowTable: false,
            mftData: [],
            filteredMftData: [],
            selectedRow : null,
            currentPage : 1,
            rowsPerPage : 30,
            pagerObj: { text: '30', value: 30 },
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
                this.isShowTable = false;
                return;
            } 
            this.mftData = Object.freeze(data.data);
            this.filteredMftData = this.mftData;
            this.isShowTable = true;
        },
        handlePagination(data){
            this.rowsPerPage = data.rowsPerPage;
            this.currentPage = data.actualPage;
            this.pagerObj = { text: String(data.rowsPerPage), value: data.rowsPerPage };

            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    },
    computed:{
        totalPages() {
            return Math.ceil(this.filteredMftData.length / this.rowsPerPage) || 1;
        },
        limitedData(){
            const start = (this.currentPage - 1) * this.rowsPerPage;
            const end = start + this.rowsPerPage;
            return this.filteredMftData.slice(start, end);
        }
    }
}).mount('#app');