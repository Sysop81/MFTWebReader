export const vDraggable = {
    mounted(el){
        if(!el) return
                
        let shiftX,shiftY,maxX,maxY;

        const onMouseMove = (e) => {
            let currentXpos = e.clientX - shiftX
            let currentYpos = e.clientY - shiftY
                
            el.style.left = `${Math.max(0, Math.min(currentXpos, maxX))}px`; 
            el.style.top = `${Math.max(0, Math.min(currentYpos, maxY))}px`;
        };

        const onMouseUp = () => {
            // Remove listeners
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
        };

        el.onmousedown = (e) => {
                    
            if(!e.target.classList.contains('cursor-grab')) return
                    
            // Remove Tailwind automatic center
            el.style.position = 'fixed';
            el.style.margin = '0';
            el.style.transform = 'none';

            const rect = el.getBoundingClientRect();
            maxX = document.documentElement.clientWidth - rect.width;
            maxY = document.documentElement.clientHeight - rect.height;
            shiftX = e.clientX - rect.left;
            shiftY = e.clientY - rect.top;
                    
            // Adding listeners
            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseup', onMouseUp);
        };
    }    
};

const CSV_REQUIRED_COLUMNS = [
  "entry_number",
  "sequence_number",
  "mft_reference",
  "parent_mft_reference",
  "name_type",
  "file_name_short",
  "file_name_large",
  "path",
  "IsDirectory",
  "IsHidden",
  "IsSystem",
  "IsReadOnly",
  "ContainsADS",
  "ADSFiles",
  "0x10Creation",
  "0x10Modification",
  "0x10MFTModification",
  "0x10Access",
  "0x30Creation",
  "0x30Modification",
  "0x30MFTModification",
  "0x30Access"
]

export function validateCSVCols(currentCols){
    if(currentCols.length !== CSV_REQUIRED_COLUMNS.length) return false;
    return CSV_REQUIRED_COLUMNS.every(col => currentCols.includes(col));
}