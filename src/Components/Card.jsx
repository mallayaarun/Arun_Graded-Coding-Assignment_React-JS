import React, {useState} from "react";
import {Link} from "react-router-dom";

const createFavourite = (obj) => {
    return fetch('http://localhost:4000/favourit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(obj),
    }).then(response => response.json())
}

const deleteFavourite = (id) => {
    return fetch(`http://localhost:4000/favourit/${id}`, {
        method: 'DELETE',
    }).then(response => response.json())
}

const Card = ({movieCategory, movieData, isFavouriteTab, setMovies, isDisabledBtn}) => {
    const [isDisabled, setDisabled] = useState(isDisabledBtn);
    const movieName = movieData.title;
    const imageUrl = movieData.posterurl;

    const onClickFavBtn = () => {
        if (isFavouriteTab) {
            deleteFavourite(movieData.id)
                .then(res => {
                    fetch('http://localhost:4000/favourit')
                        .then(response => response.json())
                        .then(data => {
                            setMovies(data)
                        });
                })
                .catch(err => console.log(err));
                alert("Removed from Favourites");
        } else {
            createFavourite(movieData)
                .then(data => {
                    setDisabled(true);
                    console.log(data)
                })
                .catch(err => console.log(err));
            alert("Successfully added to Favourites");
        }
    }

    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            margin: "10px",
            border: "3px solid grey",
            borderRadius: "5px",
            maxWidth: "204px"
        }}>
            <Link to={`/${movieCategory}/${movieName}`}>
                <div style={{margin: "0px 0px", height: "250px", width: "200px"}}>
                    <img src={imageUrl} alt={`${movieName} poster`} height="250px" width="200px"/>
                </div>
            </Link>
            <p>{movieName}</p>
            <button style={{
                border: "none",
                backgroundColor: "transparent",
                fontWeight: "bold",
                marginBottom: "2px"
            }}
                    onClick={onClickFavBtn}
                    disabled={isDisabled && !isFavouriteTab}
            >
                {isFavouriteTab ? 'Remove from Favourites' : (isDisabled ? 'Added to Favourites' : 'Add To Favourites')}
            </button>
        </div>
    )
}

export default Card;