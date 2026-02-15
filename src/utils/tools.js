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