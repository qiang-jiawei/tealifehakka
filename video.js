document.addEventListener('DOMContentLoaded', function() {
    // 获取URL参数确定播放哪个视频
    const urlParams = new URLSearchParams(window.location.search);
    const videoId = urlParams.get('id') || '1';
    
    // 视频资源列表（实际使用时请替换为您的视频URL）
    const videos = {
        '1': {
            src: 'https://assets.codepen.io/3364143/sample.mp4',
            title: '山水风光之旅',
            description: '探索中国最美的自然景观，从雄伟的山脉到宁静的湖泊，这段视频将带您领略中国最壮观的自然风光。',
            views: '1.2K',
            date: '3天前'
        },
        '2': {
            src: 'https://assets.codepen.io/3364143/sample.mp4',
            title: '文化遗产探索',
            description: '世界文化遗产保护与传承，记录人类文明的宝贵遗产，展示历史与文化的深厚底蕴。',
            views: '2.4K',
            date: '1周前'
        },
        '3': {
            src: 'https://assets.codepen.io/3364143/sample.mp4',
            title: '极限运动挑战',
            description: '户外运动竞赛精彩集锦，展示人类挑战自我、突破极限的勇气和技巧。',
            views: '3.1K',
            date: '5天前'
        },
        '4': {
            src: 'https://assets.codepen.io/3364143/sample.mp4',
            title: '民俗节庆盛典',
            description: '传统节日与文化庆典记录，展现丰富多彩的民间文化和欢乐的节日氛围。',
            views: '4.5K',
            date: '2周前'
        },
        '5': {
            src: 'https://assets.codepen.io/3364143/sample.mp4',
            title: '城市建筑之美',
            description: '现代与古典建筑的完美融合，展示城市发展中的建筑艺术与人文关怀。',
            views: '2.8K',
            date: '4天前'
        }
    };
    
    // 获取当前视频数据
    const videoData = videos[videoId] || videos['1'];
    
    // 设置页面标题和视频源
    document.getElementById('video-title').textContent = videoData.title;
    document.getElementById('detail-title').textContent = videoData.title;
    document.getElementById('video-description').textContent = videoData.description;
    
    const videoElement = document.getElementById('main-video');
    videoElement.src = videoData.src;
    
    // 自动播放（静音状态下）
    videoElement.muted = true;
    videoElement.play().catch(error => {
        console.log('自动播放失败:', error);
    });
    
    // 获取控制元素
    const playPauseBtn = document.getElementById('play-pause');
    const muteBtn = document.getElementById('mute');
    const volumeSlider = document.getElementById('volume');
    const progressBar = document.getElementById('progress');
    const currentTimeElement = document.getElementById('current-time');
    const totalTimeElement = document.getElementById('total-time');
    const fullscreenBtn = document.getElementById('fullscreen');
    const speedOptions = document.querySelectorAll('.speed-options button');
    
    // 播放/暂停功能
    playPauseBtn.addEventListener('click', function() {
        if (videoElement.paused) {
            videoElement.play();
            playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
        } else {
            videoElement.pause();
            playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
        }
    });
    
    // 静音功能
    muteBtn.addEventListener('click', function() {
        videoElement.muted = !videoElement.muted;
        muteBtn.innerHTML = videoElement.muted ? 
            '<i class="fas fa-volume-mute"></i>' : 
            '<i class="fas fa-volume-up"></i>';
        volumeSlider.value = videoElement.muted ? 0 : videoElement.volume;
    });
    
    // 音量控制
    volumeSlider.addEventListener('input', function() {
        videoElement.volume = volumeSlider.value;
        videoElement.muted = (volumeSlider.value == 0);
        muteBtn.innerHTML = videoElement.muted ? 
            '<i class="fas fa-volume-mute"></i>' : 
            '<i class="fas fa-volume-up"></i>';
    });
    
    // 进度条更新
    videoElement.addEventListener('timeupdate', function() {
        const value = (100 / videoElement.duration) * videoElement.currentTime;
        progressBar.value = value;
        
        // 更新时间显示
        currentTimeElement.textContent = formatTime(videoElement.currentTime);
        totalTimeElement.textContent = formatTime(videoElement.duration);
    });
    
    // 进度条跳转
    progressBar.addEventListener('input', function() {
        const time = videoElement.duration * (progressBar.value / 100);
        videoElement.currentTime = time;
    });
    
    // 播放速度控制
    speedOptions.forEach(option => {
        option.addEventListener('click', function() {
            const speed = parseFloat(this.getAttribute('data-speed'));
            videoElement.playbackRate = speed;
            
            // 更新活动状态
            speedOptions.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // 全屏功能
    fullscreenBtn.addEventListener('click', function() {
        const player = document.querySelector('.video-player');
        
        if (player.requestFullscreen) {
            player.requestFullscreen();
        } else if (player.webkitRequestFullscreen) {
            player.webkitRequestFullscreen();
        } else if (player.msRequestFullscreen) {
            player.msRequestFullscreen();
        }
    });
    
    // 格式化时间显示 (秒 -> 分:秒)
    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        seconds = Math.floor(seconds % 60);
        return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
    }
    
    // 视频加载完成后更新总时长
    videoElement.addEventListener('loadedmetadata', function() {
        totalTimeElement.textContent = formatTime(videoElement.duration);
    });
    
    // 视频结束时重置按钮
    videoElement.addEventListener('ended', function() {
        playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
    });
    
    // 点击视频本身也可以播放/暂停
    videoElement.addEventListener('click', function() {
        if (videoElement.paused) {
            videoElement.play();
            playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
        } else {
            videoElement.pause();
            playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
        }
    });
});