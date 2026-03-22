let rawData = [];

self.onmessage = function(e) {
    const { type, data, query, isADS, isTstomping, tsValue } = e.data;

    if (type === 'SET_DATA') {
        rawData = data; // Save all records
    }

    if (type === 'FILTER') {
        const q = query.toLowerCase().trim();
        
        if (!q && !isADS && !isTstomping) {
            self.postMessage(rawData);
            return;
        }

        // Cascade filter
        let filtered = rawData;

        if (isADS){
            filtered = filtered.filter(row =>{
                return row.ContainsADS.toLowerCase() == 'true';
            });
        }

        if(isTstomping){
            filtered = filtered.filter(row => { 
                return row.timestomping_analysis.score > tsValue;
            });    
        }

        filtered = filtered.filter(row => {
            return (row.file_name_large && row.file_name_large.toLowerCase().includes(q));
        });

        self.postMessage(filtered);
    }
};