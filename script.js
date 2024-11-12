var map = L.map('map').setView([53.430127, 14.564802], 13);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        function fill_PuzzleBox(rows = 4, cols = 4) {
        var puzzleBox = document.getElementById('puzzle_box');
        var pieceWidth = 100;  
        var pieceHeight = 100; 
        
        for (var row = 0; row < rows; row++) {
            for (var col = 0; col < cols; col++) {
            
                var pieceCanvas = document.createElement('canvas');
                pieceCanvas.classList.add('piece');
                pieceCanvas.setAttribute('draggable', 'true');
                var pieceCtx = pieceCanvas.getContext('2d');
            
                pieceCanvas.width = pieceWidth;
                pieceCanvas.height = pieceHeight;
            
                pieceCtx.fillStyle = 'white';
                pieceCtx.fillRect(0, 0, pieceWidth, pieceHeight);
            
                pieceCanvas.addEventListener('dragstart', dragStart);
                pieceCanvas.addEventListener('dragover', dragOver);
                pieceCanvas.addEventListener('drop', drop);
            
                puzzleBox.appendChild(pieceCanvas);
            }
        }
    }

        let idCounter = 0;
        let pieces_before_mix =[];
        let pieces_after_mix =[];

        function splitImage(canvas, rows = 4, cols = 4) {
            var mapWidth = canvas.width;
            var mapHeight = canvas.height;

            var pieceWidth = mapWidth / cols;
            var pieceHeight = mapHeight / rows;
            var piecesContainer = document.getElementById('pieces_box');

            for (var row = 0; row < rows; row++) {
                for (var col = 0; col < cols; col++) {
                    
                    var pieceCanvas = document.createElement('canvas');
                    pieceCanvas.classList.add('piece');
                    pieceCanvas.setAttribute('draggable', 'true');
                    pieceCanvas.setAttribute('id',idCounter);
                    var pieceCtx = pieceCanvas.getContext('2d');

                   
                    pieceCanvas.width = pieceWidth;
                    pieceCanvas.height = pieceHeight;

                    pieceCtx.drawImage(canvas,col * pieceWidth, row * pieceHeight, pieceWidth, pieceHeight, 0, 0, pieceWidth, pieceHeight);

                    
                    pieceCanvas.addEventListener('dragstart', dragStart);
                    pieceCanvas.addEventListener('dragover', dragOver);
                    pieceCanvas.addEventListener('drop', drop);

                    
                    pieces_before_mix.push(pieceCanvas);
                    
                    idCounter++;
                }
            }
            pieces_after_mix = pieces_before_mix.slice();
            // mix(pieces_after_mix);
            pieces_after_mix.forEach(function(piece) {
                piecesContainer.appendChild(piece);
            }             
            )
            
        }
        
        function mix(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        }
        var draggedElement;
        function dragStart(event) {
            draggedElement = event.target;
        }

        function dragOver(event) {
            event.preventDefault();
        }

        function drop(event) {
            event.preventDefault();
            var target = event.target;

            if (target !== draggedElement) {
                var draggedCanvas = draggedElement;
                var targetCanvas = target;

                var temp = document.createElement('div');
                targetCanvas.parentNode.insertBefore(temp, targetCanvas);
                draggedCanvas.parentNode.insertBefore(targetCanvas, draggedCanvas);
                temp.parentNode.insertBefore(draggedCanvas, temp);
                temp.remove();
                checkPuzzleSorted();
            }
        }

        document.getElementById('saveButton').addEventListener('click', function() {
            var mapWidth = document.getElementById('map').offsetWidth;
            var mapHeight = document.getElementById('map').offsetHeight;

            var canvas = document.getElementById('rasterMap');
            var ctx = canvas.getContext('2d');
            canvas.width = mapWidth;
            canvas.height = mapHeight;

            leafletImage(map, function(err, imgCanvas) {
                ctx.drawImage(imgCanvas, 0, 0, mapWidth, mapHeight);
                splitImage(canvas);
                fill_PuzzleBox();
            });
        });
        
        
        function checkPuzzleSorted() {
        var puzzleBox = document.getElementById('puzzle_box');
        var currentOrder = Array.from(puzzleBox.children);
        var isSorted = true;
        for (let i = 0; i < currentOrder.length; i++) {
            if (currentOrder[i] !== pieces_before_mix[i]) {
                isSorted = false;
                console.log('Puzl not sorted...');
                break;
            }
        }
    
        if (isSorted) {
            console.log('Puzl sorted!');
            let res = document.getElementById("solution");
            res.style.display = "flex";  
            res.style.visibility = "visible"; 
            alarm();
        }
        }

        document.getElementById('getLocation').addEventListener('click', function() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function(position) {
                    var lat = position.coords.latitude;
                    var lon = position.coords.longitude;
                    map.setView([lat, lon], 13);
                }, function(error) {
                    alert("Niema prawa na geo api: " + error.message);
                });
            } 
        });
        if (Notification.permission === "default") {
            Notification.requestPermission().then(function(permission) {
            });
        }

        function alarm() {
            if (Notification.permission === "granted") {
                new Notification("COMPLETE!", {
                    body: "Puzzle solved successfully"
                });
            }
        }
