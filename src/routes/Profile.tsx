import { useEffect, useState } from "react";
import auth from "../services/auth";
import { RegisterUser } from "../@types/types";
import defaultImage from "../assets/user-regular-new.png";


const Profile = () => {
    const userId = localStorage.getItem("user_id") ?? "no user id";
    const [user, setUser] = useState<RegisterUser>();



    useEffect(() => {
        auth
            .userDetails(userId)
            .then((res) => {
                setUser(res.data);

            })
            .catch((e) => {
                console.log(e);
            });
    }, []);








    return (
        <div className="flex flex-col justify-center items-center gap-5 mt-2 ">
            <h2 className="text-2xl">
                {user?.name.first} {user?.name.middle} {user?.name.last}
            </h2>
            {user && (
                <div className="flex flex-col justify-center items-center p-5 rounded-md text-center bg-stone-200 m-2  dark:bg-slate-500 dark:text-white drop-shadow-md card-style">
                    <img
                        src={user.image ? user.image.url : defaultImage}
                        alt={user.image ? user.image.alt : "No image available"}
                        className="w-72 h-48 object-cover mt-3 rounded-md drop-shadow-md"
                        onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = defaultImage;
                        }}
                    />
                    <div className="mt-1">
                        <p className="text-sm">{user.phone}</p>
                        <p className="text-sm">{user.email}</p>

                    </div>
                </div>
            )}
            <p className="text-sm text-center">{user?.description}</p>
            {user && user.address && (
                <div className=" bg-stone-200 m-2 dark:bg-slate-500 p-5 rounded-md drop-shadow-md  dark:text-white w-80 ">
                    <h3 style={{ color: "#ff7e66" }} className="text-l  py-0.5 font-bold">Address :</h3>
                    <p className="text-sm">City : {user.address.city}, Street : {user.address.street}, House Number : {user.address.houseNumber}</p>
                    <p className="text-sm">State : {user.address.state}, Zip : {user.address.zip}</p>
                    <p className="text-sm">Country : {user.address.country}</p>
                </div>

            )}




        </div>
    );
};

export default Profile;









