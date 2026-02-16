import { vDraggable } from "../../utils/tools.js";
export default {
    props: ['isshow','msg'],
    emits:['close-modal'],
    directives: {
        'drag': vDraggable
    },
    template: `
        <div v-if="isshow" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm">
            <div v-drag class="select-none w-full max-w-2xl p-0 bg-slate-50 rounded-xl shadow-2xl overflow-hidden border border-slate-200">
                
                <div class="px-6 py-4 bg-gradient-to-r from-red-800 to-red-900 flex items-center justify-between cursor-grab active:cursor-grabbing">
                    <div>
                        <h3 class="text-xl font-bold text-white flex items-center gap-x-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <circle cx="12" cy="12" r="10"></circle>
                            <line x1="15" y1="9" x2="9" y2="15"></line>
                            <line x1="9" y1="9" x2="15" y2="15"></line>
                        </svg>
                        <span>Application Error</span></h3>
                    </div>
                    <button @click="$emit('close-modal')" class="text-white hover:text-white transition-colors">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                </div>

                <div class="p-6 max-h-[70vh] overflow-y-auto">
                    <h4 class="text-xs font-bold text-slate-600 uppercase mb-3 flex items-center">
                        <span class="mr-2">Error information</span>
                        <hr class="flex-grow border-slate-200">
                    </h4>    
                    <div class="mb-6 p-4 bg-white border border-slate-100 rounded-xl shadow-sm">
                        <p class="mb-2 text-slate-700">{{ msg }}</p>
                    </div>
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