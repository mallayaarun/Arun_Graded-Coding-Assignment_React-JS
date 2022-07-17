import React, {useEffect, useState} from "react";
import NavigationBar from "../Components/NavigationBar";
import Card from "../Components/Card";

const Home = () => {
    const [selectedCategory, setSelectedCategory] = useState('movies-in-theaters');
    const isFavouriteTab = selectedCategory === 'favourit';
    const [searchString, setSearchString] = useState('');
    const [movies, setMovies] = useState([]);
    const [favouritMovieNames, setFavouritMovieNames] = useState([]);

    useEffect(() => {
        let fetchUrl = `http://localhost:4000/${selectedCategory}`;
        if (searchString) {
            fetchUrl = `http://localhost:4000/${selectedCategory}?title_like=${searchString}`
        }
        console.log('fetchUfrl', fetchUrl);
        fetch(`http://localhost:4000/favourit/?title_like=${searchString}`)
            .then(response => response.json())
            .then(data => {
                const movieNames = data.map(item => item.title);
                setFavouritMovieNames(movieNames)
                if (selectedCategory === 'favourit') setMovies(data);
            });
        if (selectedCategory !== 'favourit') {
            fetch(fetchUrl)
                .then(response => response.json())
                .then(data => {
                    setMovies(data);
                });
        }
    }, [selectedCategory, searchString]);

    return (
        <>
            <NavigationBar selectCategory={setSelectedCategory} searchStr={setSearchString}/>
            <br/>
            <div style={{margin: "0 70px"}}>
                {searchString ? <span><b>Search results for string : </b> {searchString}</span> : null}
                {movies.length !== 0 ?
                    <div style={{
                        display: "flex",
                        flexDirection: "row",
                        flexWrap: "wrap",
                        justifyContent: "flex-start"
                            
                    }}>
                        {movies.map((data, id) => {
                            const isAlreadyAdded = favouritMovieNames.includes(data.title);
                            return <Card key={`${id} ${data.title}`} movieData={data} movieCategory={selectedCategory}
                                         isFavouriteTab={isFavouriteTab} setMovies={setMovies}
                                         isDisabledBtn={isAlreadyAdded}/>
                        })}
                    </div> : <div>
                        <p><b><i>YET TO BE ADDED</i></b></p>
                        <img src="https://2.bp.blogspot.com/-SXNnmaKWILg/XoNVoMTrxgI/AAAAAAAAxnM/7TFptA1OMC8uk67JsG5PcwO_8fAuQTzkQCLcBGAsYHQ/s1600/giphy.gif"></img>
                    </div>
                }
            </div>


        </>
    );

}

export default Home;