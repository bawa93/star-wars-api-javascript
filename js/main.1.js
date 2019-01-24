(function () {

    function StarWarsAPI() {

        this.getRandomInt = function (max) {
                return Math.floor(Math.random() * Math.floor(max));
            },
            this.getCharacters = function (search_term = '', container) {
                const url = 'https://swapi.co/api/people/';

                var currentObj = this;
                fetch(url)
                    .then((resp) => resp.json())
                    .then(function (data) {
                        var charactors = data.results;

                        var filtered_chars = charactors.filter(function (element) { // searching the characters if they match a searched term
                            if (search_term != '') {
                                return element.name.toLowerCase().indexOf(search_term) == -1 ? false : true;
                            } else {
                                return true;
                            }

                        });

                        document.getElementById(container).innerHTML = '';

                        var charactors_html = '';
                        filtered_chars.forEach(element => {

                            var total_movies_count = element.films.length;
                            var random_movie_key = currentObj.getRandomInt(total_movies_count - 1);

                            var random_movie = element.films[random_movie_key];

                            console.log("Random array key" + random_movie_key);
                            charactors_html += `
                                <div class="box2">
                <article class="media">
                    <div class="media-left">
                        <figure class="image is-64x64" style="overflow: hidden;">
                            <img src="assets/charactors/${element.name.replace(' ', '_').toLowerCase()}.png" alt="Image" class="image">
                        </figure>
                    </div>
                    <div class="media-content">
                        <div class="content">
                            <p>
                            <a href="#search_section"
                                data-charactor = "${element.name}"
                                data-movie_link = "${random_movie}"
                                class = "charactor-movies">    
                            <strong>${element.name}</strong>
                            </a>
                            <br>Info: Mass: ${element.mass}, Height: ${element.height} CM
                            </p>
                        </div>
                        
                    </div>
                </article>
            </div>`;


                        });
                        document.getElementById(container).innerHTML = charactors_html

                        var allCharactorLinks = document.querySelectorAll('.charactor-movies');

                        allCharactorLinks.forEach((value, key) => {
                            allCharactorLinks[key].addEventListener('click', currentObj.getMovie, false);
                        });
                        // return charactors;
                        // this.Charactors = data.results;
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },

            this.getMovie = function (e) {
                // e.preventDefault();

                var url = this.getAttribute("data-movie_link");
                var charactor_name = this.getAttribute("data-charactor");
                var url_parts_array = url.split('/');

                var movie_id = url_parts_array[5];

                var currentObj = this;
                fetch(url)
                    .then((resp) => resp.json())
                    .then(function (data) {
                        document.getElementById("search__results").classList.remove("is-half");
                        if (document.contains(document.getElementById("first_col"))) {
                            document.getElementById("first_col").remove();
                        }


                        document.getElementById("movie-container").classList.add("is-three-quarters");
                        // document.getElementById("movie-container").classList.remove("is-half");




                        var movie_container = `
                            <div class="card"  style="opacity:.9">
                            
                            <div class="card-content">
                            
                            <div class="columns">
                <div class="column movie">
                    <div class="columns">
                        <div class="column">
                            <img src="assets/movies/${ movie_id }.jpg" class="image">
                        </div>
                        <div class="column is-two-thirds">
                            <h1 class="is-size-3 movie__title">${data.title}</h1>

                            <div>
                                <div class="is-size-5" class="movie__opening-crawl-title">Opening Crawl:</div>
                                <p class="is-size-7 movie__opening-crawl">
                                    ${data.opening_crawl}
                                </p>
                                <div class="is-size-5 movie__details">Details:</div>
                                <div class="movie__detail-item">
                                    <strong class="">Producer</strong>:
                                    <span class="is-size-6">
                                        ${data.producer}
                                    </span>
                                </div>

                                <div class="detail-item">
                                    <strong class="">Director</strong>:
                                    <span class="is-size-6">
                                        ${data.director}
                                    </span>
                                </div>
                                <div class="detail-item">
                                    <strong class="">Release Date</strong>:
                                    <span class="is-size-6">
                                        ${data.release_date}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            </div>
                            </div>
                            `;

                        document.getElementById("movie-container").innerHTML = movie_container;
                        // return charactors;
                        // this.Charactors = data.results;
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }
    }


    const StarWars = new StarWarsAPI();
    StarWars.getCharacters('', "search__results")

    let inputField = document.getElementById("searchChar");
    inputField.addEventListener("keyup", function () {
        StarWars.getCharacters(this.value, "search__results")
    }, false);




    // navbar

    document.addEventListener('DOMContentLoaded', () => {

        // Get all "navbar-burger" elements
        const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

        // Check if there are any navbar burgers
        if ($navbarBurgers.length > 0) {

            // Add a click event on each of them
            $navbarBurgers.forEach(el => {
                el.addEventListener('click', () => {

                    // Get the target from the "data-target" attribute
                    const target = el.dataset.target;
                    const $target = document.getElementById(target);

                    // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
                    el.classList.toggle('is-active');
                    $target.classList.toggle('is-active');

                });
            });
        }

    });
})();