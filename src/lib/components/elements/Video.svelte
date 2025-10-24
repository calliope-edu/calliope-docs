<script>
    export let src;
    export let type = 'video'; // youtube | video | ...
    export let title = '';
    export let play = "hover"; // hover | click | auto
    
    import { onMount } from 'svelte';
    
    let videoElement;
    let isPlaying = false;
    let youtubePlayer;
    let progress = 0;
    let scrubbing = false;
    
    function handleHover(enter) {
        if (play !== 'hover' || type === 'youtube') return;
        
        if (enter) {
            videoElement.play();
        } else {
            videoElement.pause();
        }
    }
    
    function handleClick() {
        if ((play !== 'click' && type !== 'youtube') || !videoElement) return;
        
        if (isPlaying) {
            videoElement.pause();
        } else {
            videoElement.play();
        }
        isPlaying = !isPlaying;
    }
    
    function handleScrub(e) {
        if (!videoElement) return;
        const rect = e.currentTarget.getBoundingClientRect();
        const pos = (e.clientX - rect.left) / rect.width;
        videoElement.currentTime = pos * videoElement.duration;
    }
    
    onMount(() => {
        if (type === 'video') {
            // Set up event listeners for video element
            videoElement.addEventListener('play', () => { isPlaying = true; });
            videoElement.addEventListener('pause', () => { isPlaying = false; });
            videoElement.addEventListener('timeupdate', () => { 
                if (videoElement.duration) {
                    progress = videoElement.currentTime / videoElement.duration;
                }
            });
            
            // Set initial state based on play mode
            if (play === 'auto') {
                videoElement.play();
                isPlaying = true;
            } else {
                videoElement.pause();
                isPlaying = false;
            }
        }
    });
</script>

<span class="video-container">
    {#if type === 'video'}
        <span 
            class="video"
            on:mouseenter={() => handleHover(true)}
            on:mouseleave={() => handleHover(false)}
            on:click={handleClick}
        >
            <video 
                bind:this={videoElement}
                src={src} 
                loop 
                muted 
                playsinline
                title={title}
            ></video>
            
            <div class="scrub-bar" on:click={handleScrub}>
                <div class="progress" style="width: {progress * 100}%"></div>
            </div>
            
            {#if !isPlaying}
                <div class="play-overlay">
                    <svg viewBox="0 0 24 24" width="48" height="48">
                        <path d="M8 5v14l11-7z" fill="currentColor"/>
                    </svg>
                </div>
            {/if}
        </span>
    {:else if type === 'youtube'}
        <!-- YouTube always uses click to play/pause -->
        <span 
            class="video youtube"
            on:click={() => window.open(`https://www.youtube.com/watch?v=${src}`, '_blank')}
        >
            <iframe 
                src="https://www.youtube-nocookie.com/embed/{src}?controls=0&autoplay={(play === 'auto') ? 1 : 0}&mute=1" 
                title={title || "YouTube video player"} 
                frameborder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                allowfullscreen
            ></iframe>
            {#if play !== 'auto'}
                <div class="play-overlay">
                    <svg viewBox="0 0 24 24" width="48" height="48">
                        <path d="M8 5v14l11-7z" fill="currentColor"/>
                    </svg>
                </div>
            {/if}
        </span>
    {/if}
</span>

<style lang="scss">
    .video-container {
        display: flex;
        background-color: #fafafa;
        padding: 1rem;
        border-radius: 5px;
        border: 1px solid #eee;
    }

    .video {
        display: inline-block;
        max-width: 100%;
        max-height: min(40vh, 500px, 100%);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        line-height: 0;
        margin: auto;
        position: relative;
        cursor: pointer;
        &.youtube {
            aspect-ratio: 16/9;
        }

        video, iframe {
            width: 100%;
            height: 100%;
            display: block;
        }
        
        .scrub-bar {
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 3px;
            background: rgba(0, 0, 0, 0.05);
            cursor: pointer;
            transition: height 0.15s ease;
            
            .progress {
                height: 100%;
                background: rgba(255, 255, 255, 0.8);
                width: 0%;
                transition: width 0.3s linear;
                will-change: width;
                transform: translateZ(0);
                pointer-events: none;
            }
            
            &:hover {
                height: 15px;
                opacity: 1;
            }
        }
        
        .play-overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            background: rgba(0, 0, 0, 0.3);
            border-radius: 4px;
            
            svg {
                color: white;
                filter: drop-shadow(0 1px 3px rgba(0, 0, 0, 0.5));
                opacity: 0.9;
                transition: transform 0.15s ease-in-out, opacity 0.15s ease-in-out;
            }
            
            &:hover svg {
                transform: scale(1.1);
                opacity: 1;
            }
        }
    }
</style>