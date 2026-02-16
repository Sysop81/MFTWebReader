import { validateCSVCols } from "../utils/tools.JS";

export default {
    props: ['title'],
    emits: ['mft-data','is-loading'],
    methods:{
        handleFile(event){
            const archivo = event.target.files[0];
            if (!archivo) return;
            
            this.$emit('is-loading', true);
            Papa.parse(archivo, {
                header: true,
                worker: true,
                skipEmptyLines: true,
                complete: (results) => {
                    try{
                        const isValid = validateCSVCols(Object.keys(results.data[0]))
                        if(!isValid){
                            throw new Error("INVALID_CSV");
                        }    

                        // Send data to parent
                        this.$emit('mft-data',{
                            data: results.data,
                            error : null
                        });

                    }catch(e){
                        this.$emit('is-loading', false);
                        this.$emit('mft-data',{
                            data : [],
                            error : true,
                            msg : 'Invalid CSV. Please verify that your CSV file was created with the appropriate tool.'
                        });
                    }
                },
                error: (e) =>{
                    console.error("Error: ", e)
                    this.$emit('mft-data',{
                        data : [],
                        error : true,
                        msg : 'Parsing error. Please verify that your CSV file was created with the appropriate tool.'
                    })
                }
            });
        }
    },
    template: `
        <div class="p-2 mt-2 bg-gradient-to-r from-slate-700 to-slate-800 border-gray-300 rounded-lg">
            <h3 class="text-lg font-bold text-slate-50 mb-4">{{ title }}</h3>
            <input type="file" @change="handleFile" accept=".csv" 
                   class="block w-full text-sm text-slate-50 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-slate-900 hover:file:bg-blue-100 cursor-pointer"/>
        </div>
    `
}