
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import defaultImage from "../assets/user-regular-new.png";
import { myCardById } from "../services/cards";
import { CardType } from "../@types/types";


const MyCards = () => {
    const { id } = useParams();
    const [cards, setCards] = useState<CardType[]>([]);
    const [error, setError] = useState<any>();


    useEffect(() => {
        userCards();
    }, []);

    const userCards = async () => {
        try {
            const response = await myCardById();
            setCards(response.data);
            setError(null);
        } catch (error) {
            if (error.response && error.response.status === 401) {
                setError("Error: Please Login");
            } else {
                setError("An error occurred.");
            }
            console.error("Error Cards:", error);
        }
    };

    return (
        <div className="flex flex-col">
            <h2 className="text-3xl text-center mb-4">My Cards</h2>
            <div className="flex flex-wrap justify-center items-center gap-5 mt-2 dark:text-white">
                {cards.map((card: CardType, index: number) => (
                    <div className="flex flex-col justify-center items-center p-5 rounded-md text-center bg-stone-200 m-2 dark:bg-slate-500 relative drop-shadow-md favorite-cards-style mt-1" key={index}>
                        <Link to={`/cards/${card._id}`} className="flex flex-col items-center ">
                            <img
                                src={card.image ? card.image.url : defaultImage}
                                alt={card.image ? card.image.alt : "No image available"}
                                className="w-72 h-48 object-cover mt-3 rounded-md shadow-md"
                                onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.src = defaultImage;
                                }}
                            />
                            <h2 style={{ color: "#ff7e66" }} className="text-l px-1 py-0.5 font-bold">{card.title}</h2>
                            <div className=" bg-stone-300 m-2 dark:bg-slate-400 p-5 rounded-md drop-shadow-md  dark:text-white w-80 text-left">
                                <h3 style={{ color: "#ff7e66" }} className="text-l  py-0.5 font-bold">Address :</h3>
                                <p className="text-sm">City : {card.address.city}, Street : {card.address.street}</p>
                                <p className="text-sm">State : {card.address.state}, Zip :  {card.address.zip}</p>
                                <p className="text-sm">Country : {card.address.country}</p>
                            </div>
                        </Link>


                    </div>

                ))}
            </div>

        </div>
    );
};

export default MyCards;