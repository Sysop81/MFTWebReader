const { createApp } = Vue;
import Header from "./components/Header.js";
import Help from "./components/modals/Help.js";

createApp({
    components:{
        'header-component' : Header,
        'help-modal' : Help
    },
    data(){
        return{
            title : 'MFT Web Viewer',
            showHelpModal : false
        }
    },
    methods: {
        // TODO
    },
    computed:{
        // TODO
    }
}).mount('#app');