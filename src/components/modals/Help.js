import { vDraggable } from "../../utils/tools.js";
export default {
    props: ['isshow'],
    emits:['close-modal'],
    directives: {
        'drag': vDraggable
    },
    template: `
        <div v-if="isshow" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm">
            <div v-drag class="select-none w-full max-w-2xl p-0 bg-slate-50 rounded-xl shadow-2xl overflow-hidden border border-slate-200">
                
                <div class="px-6 py-4 bg-gradient-to-r from-slate-800 to-slate-900 flex items-center justify-between cursor-grab active:cursor-grabbing">
                    <div>
                        <p class="text-xs font-semibold text-blue-400 uppercase tracking-wider">help</p>
                        <h3 class="text-xl font-bold text-white leading-tight">User Guide</h3>
                    </div>
                    <button @click="$emit('close-modal')" class="text-slate-400 hover:text-white transition-colors">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                </div>

                <div class="p-6 max-h-[70vh] overflow-y-auto">
                    <h4 class="text-xs font-bold text-slate-600 uppercase mb-3 flex items-center">
                        <span class="mr-2">Step 1. Generate CSV file</span>
                        <hr class="flex-grow border-slate-200">
                    </h4>    
                    <div class="mb-6 p-4 bg-white border border-slate-100 rounded-xl shadow-sm">
                        <p class="mb-2 text-slate-700">To obtain the CSV file, you will need the <strong>MFTExtract</strong> and <strong>MFTParser</strong> tools. Follow these steps:</p>
                        <ol class="list-decimal ml-5 mb-4 text-slate-700">
                            <li>Run <strong>MFTExtractor</strong> to extract the <code>MFT.bin</code> file.</li>
                            <li>Run <strong>MFTParser</strong> using the <code>MFT.bin</code> obtained in the previous step as the input parameter.</li>
                            <li>Set a custom filename and ensure the output format is set to <strong>CSV</strong>.</li>
                        </ol>
                    </div>

                    <h4 class="text-xs font-bold text-slate-600 uppercase mb-3 flex items-center">
                        <span class="mr-2">Step 2. Upload and Process</span>
                        <hr class="flex-grow border-slate-200">
                    </h4>
                    <div class="mb-6 p-4 bg-white border border-slate-100 rounded-xl shadow-sm">
                        <p class="mb-2 text-slate-700">Click the <strong>"Examinar"</strong> button on this website to upload your <code>mft_parser.csv</code> file.</p>
                        <p class="text-slate-700">Once the process is complete, a paginated table displaying the MFT records will appear below.</p>
                        <img src="src/img/help/table_loaded.jpg" alt="Loaded table example">
                    </div>

                    <h4 class="text-xs font-bold text-slate-600 uppercase mb-3 flex items-center">
                        <span class="mr-2">Step 3. Filtering data</span>
                        <hr class="flex-grow border-slate-200">
                    </h4>
                    <div class="mb-6 p-4 bg-white border border-slate-100 rounded-xl shadow-sm">
                        <p>
                            This tool features a search bar to filter MFT records. To find a specific record, 
                            start typing the filename; the filter will provide suggestions as you type. 
                            You can then press <strong>Enter</strong> or select a file from the <strong>dropdown list</strong>.
                        </p>
                        <img src="src/img/help/search_bar.jpg" alt="Search bar example">
                        <div class="bg-red-50 border-l-4 border-red-400 p-3 my-4">
                            <p class="text-xs text-red-700 italic">
                                <strong>Note:</strong> Clearing the search input will reset the table to its original state.
                            </p>
                        </div>
                    </div>

                    <h4 class="text-xs font-bold text-slate-600 uppercase mb-3 flex items-center">
                        <span class="mr-2">Step 4. Show MFT record details</span>
                        <hr class="flex-grow border-slate-200">
                    </h4>

                </div>    

                <div class="px-6 py-4 bg-slate-50 border-t border-slate-200 flex justify-end">
                    <button @click="$emit('close-modal')" class="px-6 py-2 text-sm font-bold text-slate-600 hover:text-slate-800 hover:bg-slate-200 rounded-lg transition-all">
                        Close
                    </button>
                </div>
            </div>
        </div>
    `
}