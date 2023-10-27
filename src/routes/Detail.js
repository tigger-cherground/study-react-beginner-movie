import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Movie from "../components/Movie"

function Detail() {
    const { id } = useParams();
    const [ movie, setMovie ] = useState(null);
    const getMovice = async () => {
        const json = await (
            await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
        ).json();
        setMovie(json.data.movie);
    };
    useEffect(() => {
        getMovice();
    }, []);
    return (
        <div>
            <h1>Detail</h1>
            { movie != null 
                ? <Movie 
                    id={movie.id} 
                    coverImg={movie.medium_cover_image}
                    title={movie.title}
                    year={movie.year}
                    summary={movie.summary}
                    genres={movie.genres}
                /> 
                : null 
            }
        </div>
    );
}

export default Detail;