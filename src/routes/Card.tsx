import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { CardType, ErrorType } from "../@types/types";
import { getCardById } from "../services/cards";
import defaultImage from "../assets/user-regular-new.png";
import "./Card.scss";

const Card = () => {
    const { id } = useParams();
    const [card, setCard] = useState<CardType>();
    const [error, setError] = useState<ErrorType>();


    useEffect(() => {
        getCardById(id ?? "")
            .then((res) => {
                setCard(res.data);


            })
            .catch((e) => {
                const status = e.response ? e.response.status : null;
                const message = e.message;
                const details = e.response ? e.response.data : null;
                setError({ status, message, details });
            });
    }, [id]);












    return (
        <div className="flex flex-col justify-center items-center gap-5 mt-2 ">
            {card && (
                <div className="flex flex-col justify-center items-center p-5 rounded-md text-center bg-stone-200 m-2  dark:bg-slate-500 dark:text-white drop-shadow-md card-style">
                    <img
                        src={card.image ? card.image.url : defaultImage}
                        alt={card.image ? card.image.alt : "No image available"}
                        className="w-72 h-48 object-cover mt-3 rounded-md shadow-md"
                        onError={(e: any) => {
                            e.target.onError = null;
                            e.target.src = defaultImage;
                        }}
                    />
                    <div className="mt-1">
                        <h2 style={{ color: "#ff7e66" }} className="text-l px-1 py-0.5 font-bold">{card.title}</h2>
                        <p >{card.subtitle}</p>
                        <p >{card.phone}</p>
                        <p >{card.email}</p>
                        <p>
                            {card.web && (
                                <a href={card.web.startsWith('http') ? card.web : `https://${card.web}`} target="_blank" rel="noopener noreferrer" style={{ color: "blue", textDecoration: "underline" }}>
                                    WebLink
                                </a>
                            )}
                        </p>
                        <div className="flex justify-center mt-2">
                            <Link
                                to={`/cardEdit/${id}`} className="btn"

                            >Update Card</Link>
                        </div>
                    </div>
                </div>
            )}
            <div className=" flex flex-wrap justify-center ">

                {card && card.address && (

                    <div className=" bg-stone-200 m-2 dark:bg-slate-500 p-5 rounded-md drop-shadow-md  dark:text-white w-80 ">
                        <h3 style={{ color: "#ff7e66" }} className="text-l  py-0.5 font-bold">Address :</h3>
                        <p className="text-sm">City : {card.address.city}, Street : {card.address.street}, House Number : {card.address.houseNumber}</p>
                        <p className="text-sm">State : {card.address.state}, Zip : {card.address.zip}</p>
                        <p className="text-sm">Country : {card.address.country}</p>
                    </div>
                )}
                <div className="text-sm text-center w-80 bg-stone-200 m-2 dark:bg-slate-500 p-5 rounded-md drop-shadow-md  dark:text-white "><h3 style={{ color: "#ff7e66" }} className="text-l px-1 py-0.5 font-bold">Description : </h3> {card?.description}</div>
            </div>
        </div>
    );
};

export default Card;