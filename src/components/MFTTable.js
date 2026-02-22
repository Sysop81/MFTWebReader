const SCORE_MAP = [
  { limit: 90, class: 'bg-red-600 text-white ' },
  { limit: 70, class: 'bg-orange-500 text-white' },
  { limit: 60, class: 'bg-yellow-400 text-black' },
  { limit: 0,  class: 'bg-emerald-100 text-emerald-800' }
];

export default {
    props: {
        rows: {
            type: Array,
            default: () => []
        }
    },
    methods: {
        getStompingScoreClass(score){
            const classes = SCORE_MAP.find(item => score >= item.limit) 
            return classes.class;
        }
    },
    emits:['show-details'],
    template: `
        <div class="mt-4 h-[50vh] overflow-x-auto overflow-y-auto shadow-sm border border-gray-200 rounded-lg">
            <table class="min-w-full divide-y divide-gray-200 table-fixed">
                <thead class="bg-gray-50 sticky top-0 z-10 shadow-sm">
                    <tr>
                        <th class="w-[30%] px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800">FileName</th>
                        <th class="hidden md:table-cell w-[40%] px-6 py-3 text-left font-bold text-xs text-white uppercase tracking-wider bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800">Path</th>
                        <th class="hidden md:table-cell w-[25%] px-6 py-3 text-left font-bold text-xs text-white uppercase tracking-wider bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800">Flags</th>
                        <th class="w-[5%] px-4 py-3 text-center text-xs font-bold text-white uppercase tracking-wider bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800">Show</th>
                    </tr>
                </thead>
                <tbody v-if="rows.length == 0" class="bg-white divide-y divide-gray-200 font-mono text-sm">
                    <tr>
                        <td colspan="4" class="text-gray-500 align-middle text-center py-2">No data</td>
                    </tr>
                </tbody>
                <tbody v-else class="bg-white divide-y divide-gray-200 font-mono text-sm">
                    <tr v-for="(row, index) in rows" :key="index" class="hover:bg-gray-50">
                        <!-- File name -->
                        <td class="px-4 py-2 max-w-0">
                            <span class="inline-block w-full truncate text-gray-500 align-middle" :title="row.file_name_large">
                                {{ row.file_name_large }}
                            </span>
                        </td>
                        <!-- File Path -->
                        <td class="hidden md:table-cell px-4 py-2 max-w-0">
                            <span class="inline-block w-full truncate text-gray-900 align-middle" :title="row.path">
                                {{ row.path }}
                            </span>
                        </td>
                        
                        <!-- Flags -->
                        <td class="hidden md:table-cell px-4 py-2 max-w-0">
                            <span class="mr-1 bg-slate-100 text-slate-700 text-[10px] px-2 py-1 rounded-full uppercase tracking-tighter font-mono font-bold">
                                {{ row.IsDirectory == 'True' ? 'Dir' : 'File' }}
                            </span>
                            <span v-if="row.IsHidden == 'True'" class="mr-1 bg-blue-100 text-blue-700 font-bold text-[10px] px-2 py-1 rounded-full uppercase tracking-tighter font-mono">Hidden</span>
                            <span v-if="row.ContainsADS == 'True'" class="bg-green-100 text-green-700 font-bold text-[10px] px-2 py-1 rounded-full uppercase tracking-tighter font-mono">ADS</span>
                            <span class="font-bold text-[10px] px-2 py-1 rounded-full uppercase tracking-tighter font-mono"
                                 :class="getStompingScoreClass(row.timestomping_analysis.score)"
                            >TSTOMPING {{ Number(row.timestomping_analysis.score).toFixed(0) }}%</span>
                        </td>

                        <td class="px-4 py-2 text-center">
                            <button @click="$emit('show-details', row)" 
                                    class="text-slate-600 hover:text-slate-900 bg-slate-50 hover:bg-slate-100 p-2 rounded-lg transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    `
}