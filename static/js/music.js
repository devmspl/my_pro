// Simple Music Controls
class SimpleMusicPlayer {
    constructor() {
        this.audio = null;
        this.isPlaying = false;
        this.isMuted = false;
        this.init();
    }

    init() {
        this.createVolumeControls();
        this.setupEventListeners();
    }

    createVolumeControls() {
        const volumeControls = document.createElement('div');
        volumeControls.className = 'volume-controls';
        volumeControls.innerHTML = `
            <button class="volume-btn" id="volumeOnBtn" title="Turn Music On">
                <i class="fas fa-volume-up"></i>
            </button>
            <button class="volume-btn" id="volumeOffBtn" title="Turn Music Off" style="display: none;">
                <i class="fas fa-volume-mute"></i>
            </button>
        `;
        
        document.body.appendChild(volumeControls);
    }

    setupEventListeners() {
        const volumeOnBtn = document.getElementById('volumeOnBtn');
        const volumeOffBtn = document.getElementById('volumeOffBtn');

        volumeOnBtn.addEventListener('click', () => this.turnMusicOn());
        volumeOffBtn.addEventListener('click', () => this.turnMusicOff());

        // Auto-initialize audio on first user interaction
        document.addEventListener('click', () => this.initAudio(), { once: true });
    }

    initAudio() {
        if (!this.audio) {
            // Replace this URL with your own music file
            // For demo purposes, using a placeholder
            // this.audio = new Audio('/static/music/background-music.mp3');
            
            // Using a web-based audio source for demo
            this.audio = new Audio('/static/js/mymusic.mp3');

            this.audio.loop = true;
            this.audio.volume = 0.3;
        }
    }

    turnMusicOn() {
        if (!this.audio) this.initAudio();

        const volumeOnBtn = document.getElementById('volumeOnBtn');
        const volumeOffBtn = document.getElementById('volumeOffBtn');

        this.audio.play().catch(e => console.log('Audio play failed:', e));
        this.isPlaying = true;
        this.isMuted = false;

        volumeOnBtn.style.display = 'none';
        volumeOffBtn.style.display = 'flex';

        // Start floating notes animation
        this.startMusicNotes();
    }

    turnMusicOff() {
        if (!this.audio) return;

        const volumeOnBtn = document.getElementById('volumeOnBtn');
        const volumeOffBtn = document.getElementById('volumeOffBtn');

        this.audio.pause();
        this.isPlaying = false;
        this.isMuted = true;

        volumeOnBtn.style.display = 'flex';
        volumeOffBtn.style.display = 'none';

        // Stop floating notes animation
        this.stopMusicNotes();
    }

    startMusicNotes() {
        this.musicNotesInterval = setInterval(() => {
            this.createFloatingNote();
        }, 2000);
    }

    stopMusicNotes() {
        if (this.musicNotesInterval) {
            clearInterval(this.musicNotesInterval);
        }
    }

    createFloatingNote() {
        const notes = ['♪', '♫', '♬', '♩'];
        const note = document.createElement('div');
        note.className = 'floating-music-note';
        note.innerHTML = notes[Math.floor(Math.random() * notes.length)];
        note.style.left = Math.random() * 100 + 'vw';
        note.style.color = `hsl(${320 + Math.random() * 40}, 70%, 60%)`;
        note.style.fontSize = (Math.random() * 1 + 1) + 'rem';
        
        document.body.appendChild(note);
        
        const animation = note.animate([
            { transform: 'translateY(100vh) rotate(0deg)', opacity: 0.8 },
            { transform: 'translateY(-20vh) rotate(360deg)', opacity: 0 }
        ], {
            duration: 4000 + Math.random() * 2000,
            easing: 'ease-out'
        });
        
        animation.onfinish = () => note.remove();
    }
}

// Initialize simple music player when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new SimpleMusicPlayer();
});