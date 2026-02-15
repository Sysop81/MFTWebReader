export default {
    props: ['title'],
    emits: ['mft-data','is-loading'],
    setup(props, { emit }) {
        const handleFile = (event) => {
            const archivo = event.target.files[0];
            if (!archivo) return;
            
            emit('is-loading', true);
            Papa.parse(archivo, {
                header: true,
                worker: true,
                skipEmptyLines: true,
                complete: (results) => {
                    // Send data to parent
                    emit('mft-data', results.data);
                },
                error: (e) =>{
                    console.error("Error: ", e)
                    // [TODO] Adding info to show the user
                }
            });
        };

        return { handleFile };
    },
    template: `
        <div class="p-2 mt-2 bg-gradient-to-r from-slate-700 to-slate-800 border-gray-300 rounded-lg">
            <h3 class="text-lg font-bold text-slate-50 mb-4">{{ title }}</h3>
            <input type="file" @change="handleFile" accept=".csv" 
                   class="block w-full text-sm text-slate-50 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-slate-900 hover:file:bg-blue-100 cursor-pointer"/>
        </div>
    `
}