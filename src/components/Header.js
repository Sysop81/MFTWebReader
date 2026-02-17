export default {
    props: ['title'],
    emits:['open-help'],
    template: `
        <div class="p-2 bg-gradient-to-r from-slate-800 to-slate-900 rounded shadow mt-2">
            <h2 class="text-xl font-bold text-slate-50">{{ title }}</h2>
            <p class="pl-2 text-xs text-slate-400">
                <span class="font-bold">Author.</span> José Ramón López
            </p>
            <p class="pl-2 text-xs text-slate-400">
            
                <span class="font-bold">Github.</span>
                <a href="https://github.com/Sysop81" target="_blank" class="text-slate-200 underline-offset-4 hover:underline"> github.com/Sysop81</a>
            </p>
            <p class="pl-2 text-xs text-slate-400">
                <span class="font-bold">
                    Description.
                </span> 
                Web tool to display the content of some MFT attributes contained in the CSV output file created with MFTParser.
                <span class="text-slate-50 cursor-pointer underline-offset-4 hover:underline" @click="$emit('open-help')">
                Click here to show some help    
                </span>
            </p>
            <slot></slot>
        </div>
    `
}