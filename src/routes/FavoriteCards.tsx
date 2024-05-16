import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import defaultImage from "../assets/user-regular-new.png";
import { useCards } from "../hooks/useCards";
import "./FavoriteCards.scss";

const FavoriteCards = () => {
    const { cards } = useCards();
    const [favorites] = useState<string[]>(() => {
        const storedFavorites = localStorage.getItem("favorites");
        return storedFavorites ? JSON.parse(storedFavorites) : [];
    });

    useEffect(() => {
        localStorage.setItem("favorites", JSON.stringify(favorites));
    }, [favorites]);


    const favoriteCards = cards.filter(card => favorites.includes(card._id));

    return (
        <div className="flex flex-col">
            <h2 className="text-3xl text-center mb-4">Favorite Cards</h2>
            <div className="flex flex-wrap justify-center items-center gap-5 mt-2 dark:text-white">
                {favoriteCards.map((c) => (
                    <div key={c._id} className="flex flex-col justify-center items-center p-5 rounded-md text-center bg-stone-200 m-2 dark:bg-slate-500 relative drop-shadow-md favorite-cards-style">
                        <Link to={`/cards/${c._id}`} className="flex flex-col items-center ">
                            <img
                                src={c.image ? c.image.url : defaultImage}
                                alt={c.image ? c.image.alt : "No image available"}
                                className="w-72 h-48 object-cover mt-3 rounded-md shadow-md"
                                onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.src = defaultImage;
                                }}
                            />
                            <div className="mt-1">
                                <h2 style={{ color: "#ff7e66" }} className="text-l px-1 py-0.5 font-bold">{c.title}</h2>

                                <div className=" bg-stone-300 m-2 dark:bg-slate-400 p-5 rounded-md drop-shadow-md  dark:text-white w-80 text-left">
                                    <h3 style={{ color: "#ff7e66" }} className="text-l py-0.5 font-bold">Address :</h3>
                                    <p className="text-sm">City : {c.address.city}, Street : {c.address.street}</p>
                                    <p className="text-sm">State : {c.address.state}, Zip : {c.address.zip}</p>
                                    <p className="text-sm">Country : {c.address.country}</p>
                                </div>

                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FavoriteCards;