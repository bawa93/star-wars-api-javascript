
(function() {

    function StarWarsAPI() {
        this.charactor_images_available = [
        'Luke Skywalker', 
        'C-3PO', 
        'R2-D2', 
        'Darth Vader',
        'Leia Organa',
        'Owen Lars',
        'Beru Whitesun lars',
        'R5-D4',
        'Biggs Darklighter',
        'Obi-Wan Kenobi'
        ],
            this.getCharacters = function (search_term ='',container) {
                console.log('hi');
                const url = 'https://swapi.co/api/people/?search=' + search_term;

                var currentObj = this;
                fetch(url)
                    .then((resp) => resp.json())
                    .then(function (data) {
                        var charactors = data.results;
                        document.getElementById(container).innerHTML = '';


                        var charactors_html = '';
                         charactors.forEach(element => {
                        
                             if ((currentObj.charactor_images_available.indexOf(element.name) != -1)) { //we have image for this result


                                charactors_html += `
                                <div class="box">
                <article class="media">
                    <div class="media-left">
                        <figure class="image is-32x32" style="overflow: hidden;">
                            <img src="assets/charactors/${element.name.replace(' ', '_').toLowerCase()}.png" alt="Image" class="image">
                        </figure>
                    </div>
                    <div class="media-content">
                        <div class="content">
                            <p>
                            <a href = "#"
                                data-charactor = "${element.name}"
                                data-movie_link = "${element.films[0]}"
                                class = "charactor-movies">    
                            <strong>${element.name}</strong>
                            </a>
                            </p>
                        </div>
                        
                    </div>
                </article>
            </div>`;
                            }else { // we don't have image in our database for this charactor
                                console.log('No Results Found');
                            }
                            
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
            
            this.getMovie = function() {
                var url = this.getAttribute("data-movie_link");
                var charactor_name = this.getAttribute("data-charactor");


                fetch(url)
                    .then((resp) => resp.json())
                    .then(function (data) {
                        
                        document.getElementById("movie-container").innerHTML = `
                        <div style="background-color: red">

                        <img src = "assets/charactors/${charactor_name.replace(' ', '_').toLowerCase()}.png">
                       ${data.title}
                        </div>
                            `;

                            var movie_container = `
                            <div class="columns">
                <div class="column movie">
                    <div class="columns has-text-white">
                        <div class="column">
                            <img src="assets/charactors/${charactor_name.replace(' ', '_').toLowerCase()}.png" class="image">
                        </div>
                        <div class="column">
                            <h1 class="is-size-3 movie__title">${data.title}</h1>

                            <div>
                                <div class="is-size-5" class="movie__opening-crawl-title">Opening Crawl:</div>
                                <p class="is-size-7 movie__opening-crawl">
                                    ${data.opening_crawl}
                                </p>
                                <div class="is-size-5 movie__details">Details:</div>
                                <div class="movie__detail-item">
                                    <strong class="has-text-white">Producer</strong>:
                                    <span class="is-size-6">
                                        ${data.producer}
                                    </span>
                                </div>

                                <div class="detail-item">
                                    <strong class="has-text-white">Director</strong>:
                                    <span class="is-size-6">
                                        ${data.director}
                                    </span>
                                </div>
                                <div class="detail-item">
                                    <strong class="has-text-white">Release Date</strong>:
                                    <span class="is-size-6">
                                        ${data.release_date}
                                    </span>
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
    inputField.addEventListener("keyup", function() {
        StarWars.getCharacters(this.value, "search__results")
    },false);



})();