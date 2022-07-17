const fetchMovies = (movieType) => {
    return fetch(`http://localhost:4000/${movieType}`)
        .then(response => response.json())
        .then(data => data);
}
export default fetchMovies;