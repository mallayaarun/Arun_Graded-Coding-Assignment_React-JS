import React, {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";

const MovieDetail = () => {
    const {movieCategory, movieName} = useParams();
    const [movieDetail, setMovieDetail] = useState({});

    useEffect(() => {
        fetch(`http://localhost:4000/${movieCategory}?title=${movieName}`)
            .then(response => response.json())
            .then(data => setMovieDetail(data[0]));
    }, []);

    console.log('Movie', movieDetail);

    return (
        <>
            <br/>
            <Link to={`/`} style={{margin: "30px", background: "goldenrod", color: "black", padding: "10px", borderRadius: "5px", textDecoration: "none"}}>
                Home
            </Link>
            <hr/>
            <br/>
            <div style={{
                display: "flex",
                margin: "5px"
            }}>
                <img src={movieDetail.posterurl} alt={`${movieDetail.title} poster`} width="300px" height="450px"/>
                <div style={{marginLeft: "20px"}}>
                    <h2>{movieDetail.title} ({movieDetail.year})</h2>
                    <table>
                        <tr>
                            <td width="20%">Imdb Rating</td>
                            <td align={"left"}>{movieDetail.imdbRating} </td>
                        </tr>
                        <tr>
                            <td width="20%">Content Rating</td>
                            <td align={"left"}>{movieDetail.contentRating} </td>
                        </tr>
                        <tr>
                            <td width="20%">Average Rating</td>
                            <td align={"left"}>{movieDetail.averageRating} </td>
                        </tr>
                        <tr>
                            <td width="20%">Duration</td>
                            <td align={"left"}>{movieDetail.duration} </td>
                        </tr>
                        <tr>
                            <td width="20%">Genres</td>
                            <td align={"left"}>{movieDetail?.genres?.join(', ')}</td>
                        </tr>
                        <tr>
                            <td width="20%">Actors</td>
                            <td align={"left"}>{movieDetail?.actors?.join(', ')}</td>
                        </tr>
                        <tr>
                            <td width="20%">Release Date</td>
                            <td align={"left"}>{movieDetail.releaseDate} </td>
                        </tr>
                        <tr>
                            <td width="20%">Story Line</td>
                            <td align={"left"}>{movieDetail.storyline} </td>
                        </tr>
                    </table>
                </div>

            </div>
            <hr/>
        </>
    );

}

export default MovieDetail;