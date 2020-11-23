(function(){
    if(
        !"mediaDevices" in navigator || !"getUserMedia" in navigator.mediaDevices) {
            alert("Camera API is not available in your browser");
            return;
        }

    const video = document.querySelector("#video");
    const btnPlay = document.querySelector("#btnPlay");
    const btnPause = document.querySelector("#btnPause");
    const btnCapture = document.querySelector("#btnCapture");
    const switchCamera = document.querySelector("#switchCamera");
    const captureContainer = document.querySelector("#captures");
    const canvas = document.querySelector("#canvas");
    const devicesSelect = document.querySelector("#devicesSelect");

    const constraints = {
        video: {
            width: {
                min: 1280,
                ideal: 1920,
                max: 2560,
            },
            height: {
                min: 720,
                ideal: 1080,
                max: 1440,
            },
        },
    };
    let useFrontCamera = true;
    let videoStream;

    btnPlay.addEventListener("click", function(){
        video.play();
        btnPlay.classList.add("is-hidden");
        btnPause.classList.remove("is-hidden");
    });
    btnPause.addEventListener("click", function(){
        video.pause();
        btnPause.classList.add("is-hidden");
        btnPlay.classList.remove("is-hidden");
    });
	
	btnCapture.addEventListener("click", function(){
		const img = document.createElement("img");
		canvas.width = video.videoWidth;
		canvas.height = video.videoHeight;
		canvas.getContext("2d").drawImage(video, 0, 0);
		img.src = canvas.toDataURL("image/png");
		captureContainer.prepend(img);
	}); 

    switchCamera.addEventListener("click", function(){
        useFrontCamera = !useFrontCamera;
        initializeCamera();
    });

    function stopVideoStream(){
        if(videoStream){
            videoStream.getTracks().forEach((track) => {
                track.stop();
            });
        }
    }

    async function initializeCamera(){
        stopVideoStream();
        constraints.video.facingMode = useFrontCamera ? "user": "environment";

        try{
            videoStream = await navigator.mediaDevices.getUserMedia(constraints);
            video.srcObject = videoStream;

        }
        catch(err){
            alert("Could not access the camera");
        }
    }
    initializeCamera();
}
)();