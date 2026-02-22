import { vDraggable } from "../../utils/tools.js";
export default {
    props: ['mftrow','isshow'],
    emits:['close-modal'],
    directives: {
        'drag': vDraggable
    },
    template: `
        <div v-if="isshow" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm">
            <div v-drag class="select-none w-full max-w-2xl p-0 bg-slate-50 rounded-xl shadow-2xl overflow-hidden border border-slate-200">
                
                <div class="px-6 py-4 bg-gradient-to-r from-slate-800 to-slate-900 flex items-center justify-between cursor-grab active:cursor-grabbing">
                    <div>
                        <p class="text-xs font-semibold text-blue-400 uppercase tracking-wider">File Details</p>
                        <h3 class="text-xl font-bold text-white leading-tight">{{ mftrow.file_name_large }}</h3>
                    </div>
                    <button @click="$emit('close-modal')" class="text-slate-400 hover:text-white transition-colors">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                </div>

                <div class="p-5 max-h-[70vh] overflow-y-auto">
                    <h4 class="text-xs font-bold text-slate-600 uppercase mb-3 flex items-center">
                        <span class="mr-2">System References</span>
                        <hr class="flex-grow border-slate-200">
                    </h4>
                    <div class="grid grid-cols-2 gap-1 mb-2">
                        <div class="p-3 bg-white rounded-lg border border-slate-200 shadow-sm">
                            <span class="block text-xs font-medium text-slate-500 uppercase">MFT Reference</span>
                            <span class="text-sm font-mono font-bold text-slate-800">{{ mftrow.mft_reference }}</span>
                        </div>
                        <div class="p-3 bg-white rounded-lg border border-slate-200 shadow-sm">
                            <span class="block text-xs font-medium text-slate-500 uppercase">Parent Reference</span>
                            <span class="text-sm font-mono font-bold text-slate-800">{{ mftrow.parent_mft_reference }}</span>
                        </div>
                    </div>    
                    
                    <h4 class="text-xs font-bold text-slate-600 uppercase mb-3 flex items-center">
                        <span class="mr-2">File Identity</span>
                        <hr class="flex-grow border-slate-200">
                    </h4>
                    <div class="grid grid-cols-2 gap-1 mb-2">
                        <div class="p-3 bg-white rounded-lg border border-slate-200 shadow-sm">
                            <span class="block text-xs font-medium text-slate-500 uppercase">Entry Number</span>
                            <span class="text-sm font-mono font-bold text-slate-800">{{ mftrow.entry_number }}</span>
                        </div>
                        <div class="p-3 bg-white rounded-lg border border-slate-200 shadow-sm">
                            <span class="block text-xs font-medium text-slate-500 uppercase">Name Type</span>
                            <span class="text-sm font-semibold text-slate-800">{{ mftrow.name_type }}</span>
                        </div>
                        <div class="p-3 bg-white rounded-lg border border-slate-200 shadow-sm">
                            <span class="block text-xs font-medium text-slate-500 uppercase">File Name</span>
                            <span class="text-sm font-semibold font-bold text-slate-800">{{ mftrow.file_name_large }}</span>
                        </div>
                        <div class="p-3 bg-white rounded-lg border border-slate-200 shadow-sm">
                            <span class="block text-xs font-medium text-slate-500 uppercase">Short File Name</span>
                            <span class="text-sm font-semibold text-slate-800">{{ mftrow.file_name_short }}</span>
                        </div>
                        
                    </div>
                    <div class="grid grid-cols-1 gap-1 mb-2">
                        <div class="p-3 bg-white rounded-lg border border-slate-200 shadow-sm">
                            <span class="block text-xs font-medium text-slate-500 uppercase">Path</span>
                            <span class="text-sm font-semibold text-slate-800 break-all">{{ mftrow.path }}</span>
                        </div>
                    </div>
                    <h4 class="text-xs font-bold text-slate-600 uppercase mb-3 flex items-center">
                        <span class="mr-2">Attributes & Flags</span>
                        <hr class="flex-grow border-slate-200">
                    </h4>
                    <div class="mb-2">
                        <div class="flex flex-wrap gap-2">
                            <span :class="mftrow.IsDirectory === 'True' ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-600'" class="px-3 py-1 rounded-full text-xs font-bold border">
                                Directory: {{ mftrow.IsDirectory }}
                            </span>
                            <span :class="mftrow.IsHidden === 'True' ? 'bg-yellow-100 text-yellow-700' : 'bg-slate-100 text-slate-600'" class="px-3 py-1 rounded-full text-xs font-bold border">
                                Hidden: {{ mftrow.IsHidden }}
                            </span>
                            <span :class="mftrow.IsReadOnly === 'True' ? 'bg-purple-100 text-purple-700' : 'bg-slate-100 text-slate-600'" class="px-3 py-1 rounded-full text-xs font-bold border">
                                Read Only: {{ mftrow.IsReadOnly }}
                            </span>
                            <span :class="mftrow.IsSystem === 'True' ? 'bg-red-100 text-red-700' : 'bg-slate-100 text-slate-600'" class="px-3 py-1 rounded-full text-xs font-bold border">
                                System: {{ mftrow.IsSystem }}
                            </span>
                            <span :class="mftrow.ContainsADS === 'True' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-600'" class="px-3 py-1 rounded-full text-xs font-bold border">
                                Contains ADS: {{ mftrow.ContainsADS }}
                            </span>
                        </div>
                    </div>
                    <div v-if="mftrow.ContainsADS === 'True'" class="grid grid-cols-1 gap-1 mb-2">
                        <div class="p-3 bg-white rounded-lg border border-slate-200 shadow-sm">
                            <span class="block text-xs font-medium text-slate-500 uppercase">ADS List</span>
                            <span class="text-sm font-semibold text-slate-800">{{ mftrow.ADSFiles }}</span>
                        </div>
                    </div>

                    <div class="overflow-hidden border border-slate-200 rounded-lg">
                        <table class="min-w-full divide-y divide-slate-200">
                            <thead class="bg-slate-100">
                                <tr>
                                    <th class="px-4 py-2 text-left text-xs font-bold text-slate-600 uppercase">Event</th>
                                    <th class="px-4 py-2 text-left text-xs font-bold text-slate-600 uppercase">Standard (0x10)</th>
                                    <th class="px-4 py-2 text-left text-xs font-bold text-slate-600 uppercase">File Info (0x30)</th>
                                </tr>
                            </thead>
                            <tbody class="bg-white divide-y divide-slate-100 text-sm font-mono">
                                <tr>
                                    <td class="px-4 py-2 font-sans font-medium text-slate-500">Creation</td>
                                    <td class="px-4 py-2">{{ mftrow['0x10Creation'] }}</td>
                                    <td class="px-4 py-2">{{ mftrow['0x30Creation'] }}</td>
                                </tr>
                                <tr>
                                    <td class="px-4 py-2 font-sans font-medium text-slate-500">Modification</td>
                                    <td class="px-4 py-2">{{ mftrow['0x10Modification'] }}</td>
                                    <td class="px-4 py-2">{{ mftrow['0x30Modification'] }}</td>
                                </tr>
                                <tr>
                                    <td class="px-4 py-2 font-sans font-medium text-slate-500">MFT Mod</td>
                                    <td class="px-4 py-2">{{ mftrow['0x10MFTModification'] }}</td>
                                    <td class="px-4 py-2">{{ mftrow['0x30MFTModification'] }}</td>
                                </tr>
                                <tr>
                                    <td class="px-4 py-2 font-sans font-medium text-slate-500">Access</td>
                                    <td class="px-4 py-2">{{ mftrow['0x10Access'] }}</td>
                                    <td class="px-4 py-2">{{ mftrow['0x30Access'] }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    
                    <!-- TStomping -->
                    <h4 class="text-xs font-bold text-slate-600 uppercase mt-2 mb-3 flex items-center">
                        <span class="mr-2">TIMESTOMPING REPORT</span>
                        <hr class="flex-grow border-slate-200">
                    </h4>
                    <div class="overflow-hidden rounded-lg border border-gray-200 shadow-sm max-w-2xl">
                        <table class="min-w-full divide-y divide-gray-200 bg-white text-sm">
                            <tbody class="divide-y divide-gray-100">
                            <tr>
                                <th class="whitespace-nowrap px-4 py-3 font-semibold text-gray-900 bg-gray-50 w-1/3 text-left">
                                Timestomping Score
                                </th>
                                <td class="px-4 py-3 text-gray-700">
                                {{ mftrow.timestomping_analysis.score }} %
                                </td>
                            </tr>
                            <tr>
                                <th class="whitespace-nowrap px-4 py-3 font-semibold text-gray-900 bg-gray-50 text-left">
                                UTC Zero
                                </th>
                                <td :class="[
                                    'px-4','py-3', 
                                    !mftrow.timestomping_analysis.rounded_timestamp ? 'text-green-600' : 'text-red-600'
                                ]">
                                {{ !mftrow.timestomping_analysis.rounded_timestamp ? 'No detected' : 'Detected' }}
                                </td>
                            </tr>
                            <tr>
                                <th class="whitespace-nowrap px-4 py-3 font-semibold text-gray-900 bg-gray-50 text-left">
                                Future Timestamp
                                </th>
                                <td :class="[
                                    'px-4','py-3', 
                                    !mftrow.timestomping_analysis.future_timestamp ? 'text-green-600' : 'text-red-600'
                                ]">
                                {{ !mftrow.timestomping_analysis.future_timestamp ? 'No detected' : 'Detected' }}
                                </td>
                            </tr>
                            <tr>
                                <th class="whitespace-nowrap px-4 py-3 font-semibold text-gray-900 bg-gray-50 text-left">
                                Internal Inconsistency
                                </th>
                                <td :class="[
                                    'px-4','py-3', 
                                    !mftrow.timestomping_analysis.internal_inconsistency ? 'text-green-600' : 'text-red-600'
                                ]">
                                {{ !mftrow.timestomping_analysis.internal_inconsistency ? 'No detected' : 'Detected' }}
                                </td>
                            </tr>
                            <tr>
                                <th class="whitespace-nowrap px-4 py-3 font-semibold text-gray-900 bg-gray-50 text-left">
                                Mismatch Fields
                                </th>
                                <td class="px-4 py-3 text-gray-700">
                                    <span 
                                        v-for="(ts, index) in mftrow.timestomping_analysis.mismatch_fields" 
                                        :key="index"
                                        class="inline-block bg-slate-100 text-slate-800 text-xs px-2 py-1 rounded-full mr-2">
                                        {{ ts }}
                                    </span>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <!-- -->
                </div>

                <div class="px-6 py-4 bg-slate-50 border-t border-slate-200 flex justify-end">
                    <button @click="$emit('close-modal')" class="px-6 py-2 text-sm font-bold text-slate-600 hover:text-slate-800 hover:bg-slate-200 rounded-lg transition-all">
                        Close Inspector
                    </button>
                </div>
            </div>
        </div>
    `
}