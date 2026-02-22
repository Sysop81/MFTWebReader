import { SEARCH_MODULE_CONFIG as config } from "../utils/tools.js";

export default {
    props: ['sourceData'],
    emits:['filtered','selected'],
    data() {
        return {
            query: '',
            filtered: [],
            isFiltering: false,
            showDropdown: false,
            worker: null,
            isADS: false,
            isTStomping : false,
            tsValue: 50
        }
    },
    computed: {
        quickResults() {
            return this.filtered.slice(config.FILTER_START, config.FILTER_END);
        }
    },
    mounted() {
        this.worker = new Worker(config.WORKER_URI);
        this.worker.onmessage = (e) => {
            this.filtered = Object.freeze(e.data);
            this.isFiltering = false;
            this.$emit('filtered', this.filtered);
        };

        if (this.sourceData && this.sourceData.length > 0) {
            this.syncWorker();
        }
    },
    watch: {
        sourceData: {
            immediate: true,
            handler(newData) {
                if (newData && newData.length > 0) {
                    console.log("Detecting new size for sourceData. Size:", newData.length);
                    this.syncWorker();
                }
            }
        }
    },
    methods: {
        syncWorker() {
            this.worker.postMessage({ type: 'SET_DATA', data: this.sourceData });
        },
        onInput() {
            if(!this.showDropdown) this.showDropdown = true
            this.isFiltering = true;
            this.sendRequestToWorker();
        },
        emitSelection(row) {
            this.query = row.file_name_large;
            this.showDropdown = false;
            this.$emit('selected', [row]);
        },
        emitFilteredRows(){
            this.showDropdown = false
            if(this.query) this.$emit('filtered', this.filtered);
        },
        sendRequestToWorker(){
            clearTimeout(this.timeout);
            this.timeout = setTimeout(() => {
                this.worker.postMessage({ 
                    type: 'FILTER',
                    query: this.query,
                    isADS: this.isADS, 
                    isTstomping : this.isTStomping, 
                    tsValue : this.tsValue 
                });
            }, config.INPUT_TIME_OUT);
        }
    },
    template: `
        <div v-if="sourceData.length > 0" class="mt-1 mb-1 relative w-full">
            <div class="relative flex items-center">
                <svg 
                    class="absolute left-3 w-5 h-5 text-slate-400 pointer-events-none" 
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    stroke-width="2" 
                    stroke-linecap="round" 
                    stroke-linejoin="round"
                    >
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
                <input 
                    v-model="query"
                    @input="onInput"
                    @focus="showDropdown = true"
                    @keyup.enter="emitFilteredRows"
                    type="text"
                    placeholder="Search file..."
                    class="pl-10 w-full bg-slate-900 border border-slate-700 text-slate-200 py-3 px-4 rounded-t-lg rounded-tr-lg font-mono text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                >
                <div v-if="isFiltering" class="absolute right-3 top-3">
                    <svg class="animate-spin h-5 w-5 text-blue-500" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                </div>
            </div>
            <!-- Metadata filter -->
            <div class="flex flex-wrap items-center gap-6 p-4 bg-slate-900 rounded-b-lg rounded-bl-lg border border-slate-700">
                <span class="text-xs font-bold text-slate-200 uppercase tracking-wider mr-2">Metadata filtering:</span>
                <label class="inline-flex items-center cursor-pointer group">
                    <div class="relative">
                    <input 
                        type="checkbox" 
                        class="sr-only peer" 
                        v-model="isADS" 
                        @change="sendRequestToWorker"
                    >
                    <div class="w-5 h-5 bg-slate-800 border-2 border-slate-600 rounded peer-checked:bg-red-600 peer-checked:border-red-600 transition-all"></div>
                    <svg class="absolute w-3 h-3 text-white top-1 left-1 opacity-0 peer-checked:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path>
                    </svg>
                    </div>
                    <span class="ml-2 text-sm font-medium text-slate-300 group-hover:text-white transition-colors">
                    ADS Streams
                    </span>
                </label>

                <label class="inline-flex items-center cursor-pointer group">
                    <div class="relative">
                    <input 
                        type="checkbox" 
                        class="sr-only peer" 
                        v-model="isTStomping" 
                        @change="sendRequestToWorker"
                    >
                    <div class="w-5 h-5 bg-slate-800 border-2 border-slate-600 rounded peer-checked:bg-red-600 peer-checked:border-red-600 transition-all"></div>
                    <svg class="absolute w-3 h-3 text-white top-1 left-1 opacity-0 peer-checked:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path>
                    </svg>
                    </div>
                    <span class="ml-2 text-sm font-medium text-slate-300 group-hover:text-white transition-colors">
                    Timestomping
                    </span>
                </label>
                <!-- TS Score -->
                <div :class="['flex flex-col w-48 gap-1.5 ml-2 transition-opacity duration-300', !isTStomping ? 'opacity-40 pointer-events-none' : 'opacity-100']">
                    <div class="flex items-center justify-between">
                        <input 
                            type="range" min="0" max="100" step="10" 
                            v-model="tsValue" 
                            :disabled="!isTStomping"
                            class="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-red-500 disabled:cursor-not-allowed"
                            @input="sendRequestToWorker"
                        >
                        <span class="ml-3 text-[10px] font-mono text-slate-400 w-6">{{ tsValue }}%</span>
                    </div>
                    
                    <div class="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden flex">
                        <div :class="[
                            'h-full transition-all duration-300',
                            !isTStomping ? 'bg-slate-600' : (
                                tsValue <= 50 ? 'bg-green-500' : 
                                tsValue <= 60 ? 'bg-yellow-400' : 
                                tsValue <= 80 ? 'bg-orange-500' : 'bg-red-600'
                            )
                        ]" :style="{ width: tsValue + '%' }"></div>
                    </div>
                </div>
            </div>

            <div v-if="showDropdown && query" 
                 class="absolute z-50 w-full bg-slate-800 border-x border-b border-slate-700 rounded-lg shadow-2xl max-h-64 overflow-y-auto">
                <ul class="divide-y divide-slate-700">
                    <li v-for="row in quickResults" 
                        :key="row.id"
                        @click="emitSelection(row)"
                        class="p-3 hover:bg-slate-700 cursor-pointer flex justify-between items-center transition-colors">
                        <div class="flex flex-col min-w-0">
                            <span class="text-sm font-bold text-slate-100 truncate">{{ row.file_name_large }}</span>
                            <span class="text-[10px] text-slate-500 truncate">{{ row.path }}</span>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    `
}