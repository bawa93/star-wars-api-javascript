function StarWarsAPI(){
    this.ITEMS_PER_PAGE = 10,
    this.Charactors = [],
    this.getCharacters = function() {
        const url = 'https://swapi.co/api/people';
        fetch(url)
            .then((resp) => resp.json())
            .then(function (data) {
                let charactors = data.results;
                
                return charactors;
                // this.Charactors = data.results;
            })
            .catch(function (error) {
                console.log(error);
            });
    }
}