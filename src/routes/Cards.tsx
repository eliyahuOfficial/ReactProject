import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Spinners from "../components/Spinners";
import defaultImage from "../assets/user-regular-new.png";
import { useCards } from "../hooks/useCards";
import "./Cards.scss"
import { baseUrl, deleteCard, getCards } from "../services/cards";
import { useAuth } from "../hooks/useAuth";
import axios from "axios";
import { showErrorDialog } from "../ui/dialogs";


const Cards = () => {
    const { cards, loading, error, setCards } = useCards();

    const [likedCards, setLikedCards] = useState<string[]>([]);

    const { isAdmin } = useAuth();

    const [favorites, setFavorites] = useState<string[]>(() => {


        const storedFavorites = localStorage.getItem("favorites");
        try {
            return storedFavorites ? JSON.parse(storedFavorites) : [];
        } catch (error) {
            console.error("Error parsing favorites from localStorage:", error);
            return [];
        }

    });


    const [searchQuery, setSearchQuery] = useState<string>("");

    useEffect(() => {
        localStorage.setItem("favorites", JSON.stringify(favorites));
    }, [favorites]);



    const toggleFavorite = (id: string) => {
        setFavorites(prevFavorites => {
            if (prevFavorites.includes(id)) {
                return prevFavorites.filter((fav) => fav !== id);
            } else {
                return [...prevFavorites, id];
            }
        });
    };


    const filteredCards = cards.filter(card =>
        card.title.toLowerCase().includes(searchQuery.toLowerCase())
    );


    const handleLike = (cardId: string) => {

        const updatedCards = cards.map(card => {
            if (card._id === cardId) {
                const updatedCard = { ...card, likes: [...card.likes, 'user_id'] };
                return updatedCard;
            }

            return card;

        });

        setCards(updatedCards);

        axios.patch(`${baseUrl}/cards/${cardId}`, { like: 'user_id' }, {
            headers: {
                'x-auth-token': localStorage.getItem('token'),

            }
        })
            .then((res) => {
                const updatedCard = res.data;
                const updatedCards = cards.map(card => {
                    if (card._id === updatedCard._id) {
                        return updatedCard;
                    }

                    return card;
                });
                setCards(updatedCards);
                const updatedLikedCards = [...likedCards, cardId];
                setLikedCards(updatedLikedCards);


            })
            .catch((error) => {
                console.error("Error adding like:", error);
            });

    };

    const deleteCardHandler = (id: string) => {
        deleteCard(id)
            .then((res) => {
                console.log(res)
                showErrorDialog("Delete", "Card deleted");
                getCards()
                    .then((res) => setCards(res.data))
            })
            .catch((err) => console.log(err))
    }

    return (
        <div className="flex flex-col">
            <div className=" bg-stone-200 m-2 dark:bg-slate-500 border rounded-md search-place pl-6">
                <input
                    type="text"
                    placeholder="Search cards..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="px-4 py-2 my-2 md:ml-6 w-80 border rounded-md custom-input-cards"
                />
            </div>
            <div className="flex flex-wrap justify-center items-center gap-5 mt-2 dark:text-white">
                {loading && <Spinners />}
                {error && <div>{error}</div>}
                {filteredCards.map((c) => (
                    <div key={c._id} className="flex flex-col justify-center items-center p-5 rounded-md text-center bg-stone-200 m-2 dark:bg-slate-500 relative drop-shadow-md cards-style">
                        <Link to={`/cards/${c._id}`} className="flex flex-col items-center ">
                            <img
                                src={c.image ? c.image.url : defaultImage}
                                alt={c.image ? c.image.alt : "No image available"}
                                className="w-72 h-48 object-cover mt-3 rounded-md drop-shadow-md"
                                onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.src = defaultImage;
                                }}
                            />
                            <div className="m-1 ">
                                <h2 style={{ color: "#ff7e66" }} className="text-l px-1 py-0.5 font-bold">{c.title}</h2>
                                <p className="mb-6 text-sm">{c.subtitle}</p>
                            </div>
                        </Link>

                        {isAdmin &&
                            <button
                                className={`absolute bottom-10 right-2  mr-2 p-1 rounded-md text-sm bg-gray-300 dark:bg-gray-700 font-medium ${'text-red-400 dark:text-red-400'}`}
                                onClick={() => deleteCardHandler(c._id)}
                            >
                                Delete
                            </button>
                        }

                        <button
                            className={`absolute bottom-2 right-2  mr-2 p-1 rounded-md text-sm bg-gray-300 dark:bg-gray-700 font-medium ${favorites.includes(c._id) ? 'text-orange-400 dark:text-orange-200' : 'text-gray-500 dark:text-gray-300'}`}
                            onClick={() => toggleFavorite(c._id)}
                        >
                            Favorite

                            {Array.isArray(favorites) && favorites.includes(c._id) ? '🧡' : '🤍'}
                        </button>


                        <div className={`absolute bottom-2 left-2  mr-2 p-1 px-4  rounded-md text-sm bg-gray-300 dark:bg-gray-400 ${likedCards.includes(c._id) ? 'text-orange-400 dark:text-orange-200' : 'text-gray-500 dark:text-gray-300'}`}>
                            <div className=" flex justify-between gap-4">
                                <span>Likes: {c.likes.length}</span>
                                <button
                                    onClick={() => handleLike(c._id)}
                                    style={{
                                        color: likedCards.includes(c._id) ? 'red' : 'blue',
                                        fontSize: '1rem',
                                        fontWeight: 'bolder',
                                        pointerEvents: likedCards.includes(c._id) ? 'none' : 'auto',
                                        opacity: likedCards.includes(c._id) ? 0.5 : 1,

                                    }}
                                >
                                    {likedCards.includes(c._id) ? 'Liked' : 'Like'}
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Cards;






