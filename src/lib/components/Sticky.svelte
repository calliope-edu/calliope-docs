<script>
    // Based on https://github.com/Krzysztof-Antosik/Two-Direction-Sticky-Sidebar
    import { onMount } from 'svelte';
    
    export let top = 0;
    export let bottom = 0;
        
    let stickyElement;
    let lastPos = 0;
    
    
    let posTop = top;
    
        onMount(async () => {
            lastPos = window.scrollY;
            //Check heights of the viewport and the sticky element on window resize and reapply positioning
            window.addEventListener(`resize`, ()=>{
                lastPos = window.scrollY;
                updateSticky();
            });
            //Follow the main function when scrolling
            document.addEventListener(`scroll`, updateSticky, {
                capture: true,
                passive: true
            }); 
        });
    
        //Main function
        function updateSticky() {
            const screenHeight = window.innerHeight;
            const stickyElementHeight = stickyElement.offsetHeight;
            const currPos = window.scrollY;
            const endScroll = window.innerHeight - stickyElementHeight - bottom;
            if (stickyElementHeight+top+bottom>screenHeight) {
                if (currPos < lastPos) {
                    //Scroll up
                    if (posTop < top) {
                        posTop = (posTop + lastPos - currPos);
                    } else if (posTop > top) {
                        posTop = top;
                    }
                } else {
                    //Scroll down
                    if (posTop > endScroll) {
                        posTop = (posTop + lastPos - currPos);
                    } else if (posTop < (endScroll) && posTop != endScroll) {
                        posTop = endScroll;
                    }
                }
            } else {
                posTop = top;
            }
            lastPos = currPos;
        }
    
    </script>
    
    <div bind:this={stickyElement} class="sticky" style="top: {posTop}px;">
        <slot />
    </div>
    <style>
    .sticky {
        position: sticky;
        height: fit-content;
    }
    </style>