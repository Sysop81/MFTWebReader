export default {
    props: {
        pmpager: { type: Object, default: () => ({ text: '30', value: 30 }) },
        papage: { type: Number, default: 1 },
        ptpages: { type: Number, default: 1 },
        ptelements: { type: Number, default: 0 }
    },
    emits: ['paginated'],
    data() {
        return {
            mpager: this.pmpager,
            actualPage: this.papage,
            pages: [
                { text: '15', value: 15 },
                { text: '30', value: 30 },
                { text: '50', value: 50 },
                { text: '100', value: 100 }
            ]
        }
    },
    methods: {
        back() {
            if (this.actualPage > 1) {
                this.actualPage--;
                this.emitChange();
            }
        },
        next() {
            if (this.actualPage < this.ptpages) {
                this.actualPage++;
                this.emitChange();
            }
        },
        calculateRange() {
            let start = (this.actualPage - 1) * this.mpager.value + 1;
            let end = Math.min(this.actualPage * this.mpager.value, this.ptelements);
            return `${start} - ${end}`;
        },
        emitChange() {
            this.$emit("paginated", {
                rowsPerPage: this.mpager.value,
                actualPage: this.actualPage
            });
        }
    },
    watch: {
        papage(val) { this.actualPage = val; },
        pmpager(val) { this.mpager = val; }
    },
    template: `
        <div v-show="ptelements > 0" class="grid grid-cols-12 gap-4 items-center bg-white p-4 rounded-lg border border-gray-200 shadow-sm mt-4">
            <div class="order-1 col-span-6 md:col-span-2 flex items-center space-x-2">
                <label class="text-xs font-bold text-gray-500 uppercase">Rows:</label>
                <select v-model="mpager" @change="actualPage = 1; emitChange()" 
                        class="border rounded px-2 py-1 text-sm focus:ring-2 focus:ring-blue-400 outline-none">
                    <option v-for="opt in pages" :key="opt.value" :value="opt">{{ opt.text }}</option>
                </select>
            </div>

            <div class="order-3 md:order-2 col-span-12 md:col-span-7 flex justify-center items-center space-x-4">
                <button @click="back" :disabled="actualPage === 1" 
                        class="p-2 rounded-full hover:bg-gray-100 disabled:opacity-30 transition-opacity">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                </button>
                
                <div class="flex items-center space-x-1">
                    <span class="text-sm text-gray-600">Page</span>
                    <select v-model="actualPage" @change="emitChange()"
                            class="border rounded px-2 py-1 text-sm font-bold focus:ring-2 focus:ring-blue-400">
                        <option v-for="i in ptpages" :key="i" :value="i">{{ i }}</option>
                    </select>
                    <span class="text-sm text-gray-600">/ {{ ptpages }}</span>
                </div>

                <button @click="next" :disabled="actualPage >= ptpages" 
                        class="p-2 rounded-full hover:bg-gray-100 disabled:opacity-30 transition-opacity">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                </button>
            </div>

            <div class="order-2 md:order-3 col-span-6 md:col-span-3 text-center md:text-right" v-if="ptelements > 0">
                <span class="bg-slate-200 text-slate-700 text-[12px] lg:text-[1rem] px-2 py-1 rounded-full uppercase tracking-tighter font-mono font-bold">
                    Showing {{ calculateRange() }} / {{ ptelements }}
                </span>
            </div>
        </div>
    `
};