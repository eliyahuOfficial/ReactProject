import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { CreateType } from "../@types/types";
import cards from "../services/cards";
import dialogs from "../ui/dialogs";
import patterns from "../validation/patterns";
import { AiOutlineLogin } from "react-icons/ai";
import "./Register.scss";

const CreateCard = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<CreateType>();

    const navigate = useNavigate();

    const onCreate = (data: CreateType) => {
        cards
            .createCard(data)
            .then((res) => {
                localStorage.setItem("card_id", res.data._id);
                dialogs.create("Success", "Created successfully").then(() => {
                    navigate("/cards");
                });
            })
            .catch((e) => {
                dialogs.error("Error", e.response.data);
            });
    };




    return (
        <div>
            <div className="main-container-reg shadow-md mb-5 dark:bg-slate-500 ">
                <div>
                    <h2 className="mt-8 text-center text-2xl  leading-9 tracking-tight text-gray-900 dark:text-white ">
                        Create your Card
                    </h2>

                    <form noValidate onSubmit={handleSubmit(onCreate)} className=" flex  flex-col justify-end items-center  px-6 py-12 lg:px-8 gap-4 ">
                        <input
                            className="custom-input-reg"
                            placeholder="Title"
                            type="text"
                            {...register("title", {
                                required: "This field is mandatory",
                                minLength: { value: 2, message: "Too short" },
                                maxLength: { value: 255, message: "Too long" },
                            })}
                        />
                        {errors.title && (
                            <p className="text-red-500">{errors.title.message as string}</p>
                        )}
                        <input
                            className="custom-input-reg"
                            placeholder="Subtitle"
                            type="text"
                            {...register("subtitle", {
                                required: "This field is mandatory",
                                minLength: { value: 2, message: "Too short" },
                                maxLength: { value: 255, message: "Too long" },
                            })}
                        />
                        {errors.title && (
                            <p className="text-red-500">{errors.subtitle?.message as string}</p>
                        )}

                        <input
                            className="custom-input-reg"
                            placeholder="Description"
                            type="text"
                            {...register("description", {
                                required: "This field is mandatory",
                                minLength: { value: 2, message: "Too short" },
                                maxLength: { value: 1024, message: "Too long" },
                            })}
                        />
                        {errors.title && (
                            <p className="text-red-500">{errors.description?.message as string}</p>
                        )}

                        <input
                            className="custom-input-reg"
                            placeholder="Phone"
                            type="tel"
                            {...register("phone", {
                                required: "This field is mandatory",
                                minLength: { value: 9, message: "Too short" },
                                maxLength: { value: 14, message: "Too long" },
                            })}
                        />
                        {errors.phone && (
                            <p className="text-red-500">{errors.phone?.message as string}</p>
                        )}

                        <input
                            className="custom-input-reg"
                            placeholder="Email"
                            type="email"
                            autoComplete="current-email"
                            {...register("email", {
                                required: "This field is mandatory",
                                pattern: {
                                    value: patterns.email,
                                    message: "Invalid email",
                                },
                            })}
                        />
                        {errors.email && (
                            <p className="text-red-500">{errors.email?.message as string}</p>
                        )}

                        <input
                            className="custom-input-reg"
                            placeholder="Website"
                            type="web"
                            autoComplete="current-web"
                            {...register("web", {
                                required: "This field is mandatory",
                                min: { value: 7, message: "Too small" },
                                max: { value: 21, message: "Too big" },

                            })}
                        />
                        {errors.web && (
                            <p className="text-red-500">{errors.web?.message as string}</p>
                        )}

                        <input
                            className="custom-input-reg"
                            placeholder="Image URL"
                            type="url"
                            {...register("image.url", {
                                pattern: {
                                    value: patterns.url,
                                    message: "Invalid image URL",
                                },
                            })}
                        />
                        {errors.image?.url && (
                            <p className="text-red-500">{errors.image?.url?.message}</p>
                        )}

                        <input
                            className="custom-input-reg"
                            placeholder="Image Alt Text"
                            type="text"
                            {...register("image.alt", {
                                minLength: { value: 2, message: "Too short" },
                                maxLength: { value: 255, message: "Too long" },
                            })}
                        />
                        {errors.image?.alt && (
                            <p className="text-red-500">{errors.image?.alt?.message}</p>
                        )}

                        <input
                            className="custom-input-reg"
                            placeholder="State"
                            type="text"
                            {...register("address.state", {
                                minLength: { value: 2, message: "Too short" },
                                maxLength: { value: 255, message: "Too long" },
                            })}
                        />
                        {errors.address?.state && (
                            <p className="text-red-500">{errors.address?.state?.message}</p>
                        )}

                        <input
                            className="custom-input-reg"
                            placeholder="Country"
                            type="text"
                            {...register("address.country", {
                                required: "This field is mandatory",
                                minLength: { value: 2, message: "Too short" },
                                maxLength: { value: 255, message: "Too long" },
                            })}
                        />
                        {errors.address?.country && (
                            <p className="text-red-500">{errors.address?.country?.message}</p>
                        )}

                        <input
                            className="custom-input-reg"
                            placeholder="City"
                            type="text"
                            {...register("address.city", {
                                required: "This field is mandatory",
                                minLength: { value: 2, message: "Too short" },
                                maxLength: { value: 255, message: "Too long" },
                            })}
                        />
                        {errors.address?.city && (
                            <p className="text-red-500">{errors.address?.city?.message}</p>
                        )}

                        <input
                            className="custom-input-reg"
                            placeholder="Street"
                            type="text"
                            {...register("address.street", {
                                required: "This field is mandatory",
                                minLength: { value: 2, message: "Too short" },
                                maxLength: { value: 255, message: "Too long" },
                            })}
                        />
                        {errors.address?.street && (
                            <p className="text-red-500">{errors.address?.street?.message}</p>
                        )}



                        <input

                            className="custom-input-reg"
                            placeholder="House Number"
                            type="number"
                            {...register("address.houseNumber", {
                                required: "This field is mandatory",
                                min: { value: 2, message: "Too small" },
                                max: { value: 256, message: "Too big" },
                            })}
                        />
                        {errors.address?.houseNumber && (
                            <p className="text-red-500">
                                {errors.address?.houseNumber?.message}
                            </p>
                        )}

                        <input
                            className="custom-input-reg"
                            placeholder="Zip"
                            type="number"
                            {...register("address.zip", {
                                required: "This field is mandatory",
                                min: { value: 2, message: "Too small" },

                            })}
                        />
                        {errors.address?.zip && (
                            <p className="text-red-500">{errors.address?.zip?.message}</p>
                        )}

                        <button type="submit" className="custom-button">Create</button>
                    </form>
                    <div className="flex flex-col justify-center items-center mt-3">
                        <AiOutlineLogin
                            className="mx-auto w-auto size-72 slide-in-fwd-center mt-3" />
                        <p className="mt-6 text-center text-2xl  font-mono leading-9 tracking-tight text-gray-900  dark:text-white">Ready To Get Access</p>
                        <p className=" text-center text-sm text-gray-500  dark:text-white">
                            Not a member?{' '}
                            <a href="/register" className="trial-free">
                                Start a 14 day free trial
                            </a>
                        </p>
                    </div>

                </div>

            </div>
        </div>

    );
};


export default CreateCard;

function setNewCard(checked: boolean) {
    throw new Error("Function not implemented.");
}
