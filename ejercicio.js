
if(window.File && window.FileReader && window.FileList && window.Blob) {
    function handleFileSelect(evt) {
        let file = evt.target.files[0];

        if (!file.type.match('video.*')) {
            alert('Por favor, seleccione un archivo de video');
            return;
        }

        let reader = new FileReader();

        reader.onload = (function (theFile) {
            return function (e) {
                let videoDiv = document.getElementsByClassName('video-container');

                if(videoDiv[0] != null) {
                    videoDiv[0].parentNode.removeChild(videoDiv[0]);
                }
                    
                let div = document.createElement('div');
                div.id = "video-div";
                div.className = "video-container";
                div.innerHTML = '<video controls id="video" class="thumb" src="' + e.target.result + '" title="'+ escape(theFile.name) + '"/>';

                document.getElementById('video-output').insertBefore(div, null); 

                let loadingMessage = document.createElement('p');

                loadingMessage.id = "loading";

                document.getElementById('video-output').insertBefore(loadingMessage, null);

                alert ('El video puede tardar unos segundos en cargar')

                let playButton = document.getElementById('play');
                let pauseButton = document.getElementById('pause');
                let volumensubir = document.getElementById('up');
                let volumenbajar = document.getElementById('down');
                
                playButton.addEventListener('click', () => {
                    document.getElementById('video').play();
                });
                
                pauseButton.addEventListener('click', () => {
                    document.getElementById('video').pause();
                })

                volumensubir.addEventListener('click', () => {
                    document.getElementById('video').volume += 0.1;
                })

                volumenbajar.addEventListener('click', () => {
                    document.getElementById('video').volume -= 0.1;
                })

                document.getElementById('video').addEventListener('canplay', () => {
                    let loadingMessage = document.getElementById('loading');

                    document.getElementById('video-output').removeChild(loadingMessage);

                    document.getElementById('video').style.visibility = "visible";

                    playButton.style.visibility = "visible";
                    pauseButton.style.visibility = "visible";
                    volumensubir.style.visibility = "visible";
                    volumenbajar.style.visibility = "visible"; 
                });
            }
        }) (file);

        reader.readAsDataURL(file);
    } 

    document.getElementById('file').addEventListener('change', handleFileSelect, false);
} else {

    alert('File APIs no está soportada por este navegador.')
}
