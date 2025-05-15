
 $(document).ready(function () {
    // print first movie data
    if(favorites == "True"){
        var requestUrl = "/api/v1/top-movies";
    }else{
        var requestUrl = "/api/v1/movies";
    }
    loadMovies(0,'');

    $(".fa-search").on("click", function(event) {
        var user_text = $(".search-input").val();
        $(".item-container").html('');
        $.ajax({
            url: "/api/v1/ai/texttofilter",  // Your backend login endpoint
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify({ user_text: user_text }),
            success: function(response) {
                loadMovies(0,response.assistantResponse)
            },
            error: function() {
                alert("error")
            }
        });
    });




    $(".prev").on("click", function(event) {
        event.preventDefault(); // Prevent default link behavior
        let url = new URL(window.location.href);
        let pageParam = url.searchParams.get("page");
        let newPage = pageParam === null ? 0 : parseInt(pageParam) - 1;
        if(newPage <= 0){
            newPage=0;
        }
        url.searchParams.set("page", newPage);
        window.history.replaceState({}, '', url);
        loadMovies(newPage,'');
    });

    $(".next").on("click", function(event) {
        event.preventDefault(); // Prevent default link behavior
        let url = new URL(window.location.href);
        let pageParam = url.searchParams.get("page");
        let newPage = pageParam === null ? 0 : parseInt(pageParam) + 1;
        url.searchParams.set("page", newPage);
        window.history.replaceState({}, '', url);
        loadMovies(newPage,'');
    });



    function loadMovies(page,filter)
    {
        filterText = '';
        if(filter != ''){
            filterText = "&"+filter;
        }
        $(".item-container").html('');
        $.ajax({
            url: "/api/v1/movies?p="+page+""+filterText,  // Replace with your actual API endpoint
            type: "GET",
            dataType: "json",
            success: function (data) {
                let contentDiv = $("#item-container");


                data.forEach(item => {
                    if (!item.title || !item.poster || !item.genres) {
                        return; // Skip this iteration and continue to the next item
                    }
                    let genreLinks = item.genres.map(genre => `<a href="#!"><span class="tag">${genre}</span></a>`).join("");
                    var stars = '';
                    for(var i=0; i<(item.imdb.rating / 2)-1; i++)
                    {
                        stars+='<i class="fas fa-star"></i>';
                    }
                    let html = `
                        <div class="item">
                              <div class="item-flip">
                                <div class="item-inner">
                                  <img class="w-100 img-fluid" src="${item.poster}" alt="Archive">
                                </div>
                                <div class="movie-details">
                                  <h1><a href="#">${item.title}</a></h1>
                                  <h2>${item.year} | ${Math.floor(item.runtime/60)}h ${item.runtime%60}m </h2>
                                  <div class="rating">
                                    ${stars}
                                    <span>${item.imdb.rating / 2}/5</span>
                                  </div>
                                  <div class="tags">
                                    ${genreLinks}
                                  </div>
                                  <p class="desc">
                                    ${item.plot}
                                  </p>
                                  <a href="movie-single.html" class="watch-now">
                                    <span class="circle" aria-hidden="true">
                                      <span class="icon arrow"></span>
                                    </span>
                                    <span class="button-text add-to-favorites" data-movie-id="${item._id}">Save To Favorites</span>
                                  </a>
                                </div>
                              </div>
                            </div>
                    `;
                    contentDiv.append(html);
                });
            },
            error: function (xhr, status, error) {
                console.error("Error:", error);
            }
        });
    }



    $(".dropdown-menu a").on("click", function (event) {
            let activeFilters = {};
            event.preventDefault();

            let filterType = $(this).data("type");
            let filterValue = $(this).text().trim();


            if (!filterType || !filterValue) return;


            if (!activeFilters[filterType]) {
                activeFilters[filterType] = [filterValue];
            } else {
                let index = activeFilters[filterType].indexOf(filterValue);
                if (index === -1) {
                    activeFilters[filterType].push(filterValue);
                } else {
                    activeFilters[filterType].splice(index, 1);
                    if (activeFilters[filterType].length === 0) {
                        delete activeFilters[filterType];
                    }
                }
            }

            let query = Object.entries(activeFilters)
                .flatMap(([key, values]) => values.map(value => `${key}=${encodeURIComponent(value)}`))
                .join("&");

            console.log("Query:", query);

            $.ajax({
                url: `/api/v1/movies?${query}`,
                type: "GET",
                dataType: "json",
                success: function (data) {
                    let contentDiv = $("#item-container");
                    contentDiv.empty();

                    data.forEach(item => {
                        if (!item.title || !item.poster || !item.genres) return;

                        let genreLinks = item.genres.map(genre => `<a href="#!"><span class="tag">${genre}</span></a>`).join("");
                        let stars = '';
                        for (let i = 0; i < (item.imdb.rating / 2) - 1; i++) {
                            stars += '<i class="fas fa-star"></i>';
                        }

                        let html = `
                            <div class="item">
                                <div class="item-flip">
                                    <div class="item-inner">
                                        <img class="w-100 img-fluid" src="${item.poster}" alt="Archive">
                                    </div>
                                    <div class="movie-details">
                                        <h1><a href="#">${item.title}</a></h1>
                                        <h2>${item.year} | ${Math.floor(item.runtime / 60)}h ${item.runtime % 60}m </h2>
                                        <div class="rating">
                                            ${stars}
                                            <span>${item.imdb.rating / 2}/5</span>
                                        </div>
                                        <div class="tags">
                                            ${genreLinks}
                                        </div>
                                        <p class="desc">${item.plot}</p>
                                        <a href="movie-single.html" class="watch-now">
                                            <span class="circle" aria-hidden="true">
                                                <span class="icon arrow"></span>
                                            </span>
                                            <span class="button-text add-to-favorites" data-movie-id="${item._id}">Save To Favorites</span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        `;
                        contentDiv.append(html);
                    });
                },
                error: function (xhr, status, error) {
                    console.error("Filter Error:", error);
                }
            });
        });

    $("#loginForm").submit(function(event) {
        event.preventDefault(); // Prevent form from submitting the traditional way

        var email = $("#email").val();
        var password = $("#password").val();

        $.ajax({
            url: "/api/v1/users/login",  // Your backend login endpoint
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify({ email: email, password: password }),
            success: function(response) {
                $("#loginMessage").html('<span class="text-success">Login successful!</span>');
                $("#logoutBtn").show();
                $("#loginBtn").hide();
                setTimeout(() => {
                    $("#loginModal").modal('hide'); // Close modal
                    $("#loginForm")[0].reset(); // Reset form
                }, 1500);
            },
            error: function() {
                $("#loginMessage").html('<span class="text-danger">Invalid email or password.</span>');
            }
        });
    });

    $("#logoutBtn").click(function() {
        document.cookie = "userIsLogged=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        location.reload(); // Refresh page to apply changes
    });

    // add to favorites, send to function userId and movieID
    $("#item-container").on("click", ".add-to-favorites", function(event) {
        event.preventDefault();
        let movieId = $(this).data('movie-id');
        let userId = getUserIdFromCookie();
        console.log("User ID:", userId);
        console.log("Movie ID:", movieId);

        $.ajax({
            url: "/api/v1/users/favorites/add",
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify({ userId: userId, movieId: movieId }),
            success: function(response) {
                console.log("Movie added successfully!"); // More generic success message
                alert("Movie added to favorites!");
            },
            error: function() {
                console.log("Error adding movie to favorites."); // More generic error message
                alert("Error adding movie to favorites.");
            }
        });
    });


    // function to get userId from cookie returns userId(int)
    function getUserIdFromCookie() {
        let name = "userIsLogged=";
        let decodedCookie = decodeURIComponent(document.cookie);
        let cookieArray = decodedCookie.split(';');
        for(let i = 0; i < cookieArray.length; i++) {
            let cookie = cookieArray[i].trim();
            if (cookie.indexOf(name) == 0) {
                return parseInt(cookie.substring(name.length, cookie.length)); // Assuming userId is an integer
            }
        }
        return null; // Return null if not found
    }
});



$(document).ready(function () {
    // Voice recording functionality
    let mediaRecorder;
    let audioChunks = [];
    let isRecording = false;
    let currentAudioBlob = null;

    // Open modal when clicking the microphone icon
    $('.record i').on('click', function() {
        $('#voiceRecordingModal').modal('show');
        currentAudioBlob = null;
    });

    // Start recording button
    $('#startRecording').on('click', async function() {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            mediaRecorder = new MediaRecorder(stream);
            audioChunks = [];

            mediaRecorder.ondataavailable = (event) => {
                audioChunks.push(event.data);
            };

            mediaRecorder.onstop = () => {
                currentAudioBlob = new Blob(audioChunks, { type: 'audio/wav' });
                console.log('Audio blob created, size:', currentAudioBlob.size);
            };

            mediaRecorder.start();
            isRecording = true;

            // Update UI
            $('#startRecording').hide();
            $('#stopRecording').show();
            $('#recordingStatus').text('Recording...');
            $('.recording-status i').addClass('pulse');
        } catch (err) {
            console.error('Error accessing microphone:', err);
            $('#recordingStatus').text('Error accessing microphone');
        }
    });

    // Stop recording button
    $('#stopRecording').on('click', function() {
        if (mediaRecorder && isRecording) {
            mediaRecorder.stop();
            isRecording = false;

            // Update UI
            $('#stopRecording').hide();
            $('#sendRecording').show();
            $('#recordingStatus').text('Recording stopped');
            $('.recording-status i').removeClass('pulse');
        }
    });

    // Send recording button
    $('#sendRecording').on('click', async function() {
        if (currentAudioBlob) {
            try {
                console.log('Audio blob size:', currentAudioBlob.size);

                const formData = new FormData();
                formData.append('audio', currentAudioBlob, 'recording.wav');

                console.log('Sending request to /api/v1/voice-search');

                    const response = await fetch('/api/v1/voice-search', {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    const result = await response.json();
                    $('#recordingStatus').text('Recording sent successfully');
                    setTimeout(() => {
                        $('#voiceRecordingModal').modal('hide');
                    }, 1500);
                    $(".search-input").val(result.text);
                    $(".fa-search").trigger("click");
                } else {
                    const errorText = await response.text();
                    console.error('Server error:', errorText);
                    throw new Error(`Server error: ${response.status} ${errorText}`);
                }
            } catch (err) {
                console.error('Error sending recording:', err);
                $('#recordingStatus').text(`Error: ${err.message}`);
            }
        } else {
            console.error('No audio blob available');
            $('#recordingStatus').text('Error: No recording available');
        }
    });
});