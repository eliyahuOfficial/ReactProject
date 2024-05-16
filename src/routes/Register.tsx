import { useForm } from "react-hook-form";
import { RegisterUser } from "../@types/types";
import { AiOutlineLogin } from "react-icons/ai";
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import "./Register.scss"
import patterns from "../validation/patterns";
import { useState } from "react";
import { registerMock } from "../mocks/register";
import auth from "../services/auth";
import dialogs from "../ui/dialogs";
import { useNavigate } from "react-router-dom";



const Register = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterUser>();
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const [isBusiness, setIsBusiness] = useState(false);



    const onRegister = (data: RegisterUser) => {
        auth
            .register(data)
            .then((res) => {
                localStorage.setItem("user_id", res.data._id);
                localStorage.setItem("isBusiness", res.data.isBusiness);
                setIsBusiness(res.data.isBusiness);
                dialogs.success('success', "Register")
                console.log(res);

                dialogs.success("Success", "Registered successfully").then(() => {
                    navigate("/cards");
                });
            })
            .catch((e) => {
                dialogs.error("Error", e.response.data);
            });
    };

    const handleBusinessCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setIsBusiness(e.target.checked);
    };

    return (
        <div>
            <div className="main-container-reg shadow-md mb-5 dark:bg-slate-500 ">
                <div>
                    <h2 className="mt-8 text-center text-2xl  leading-9 tracking-tight text-gray-900 dark:text-white ">
                        Register your account
                    </h2>


                    <form noValidate onSubmit={handleSubmit(onRegister)} className=" flex  flex-col justify-end items-center  px-6 py-12 lg:px-8 gap-4 ">
                        <input
                            className="custom-input-reg"
                            placeholder="First Name"
                            type="text"
                            {...register("name.first", {
                                required: "This field is mandatory",
                                minLength: { value: 2, message: "Too short" },
                                maxLength: { value: 255, message: "Too long" },
                            })}
                        />
                        {errors.name?.first && (
                            <p className="text-red-500">{errors.name.first.message}</p>
                        )}
                        <input
                            className="custom-input-reg"
                            placeholder="Middle Name"
                            type="text"
                            {...register("name.middle", {
                                minLength: { value: 2, message: "Too short" },
                                maxLength: { value: 255, message: "Too long" },
                            })}
                        />
                        {errors.name?.middle && (
                            <p className="text-red-500">{errors.name.middle.message}</p>
                        )}

                        <input
                            className="custom-input-reg"
                            placeholder="Last Name"
                            type="text"
                            {...register("name.last", {
                                required: "This field is mandatory",
                                minLength: { value: 2, message: "Too short" },
                                maxLength: { value: 255, message: "Too long" },
                            })}
                        />
                        {errors.name?.last && (
                            <p className="text-red-500">{errors.name.last.message as string}</p>
                        )}

                        <input

                            className="custom-input-reg"
                            placeholder="Phone"
                            type="tel"
                            {...register("phone", {
                                required: "This field is mandatory",
                                minLength: { value: 9, message: "Too short" },
                                maxLength: { value: 10, message: "Too long" },
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

                        <div className="custom-input-container">
                            <input
                                className="custom-input-reg"
                                placeholder="Password"
                                type={showPassword ? `text` : `password`}
                                autoComplete="current-password"
                                {...register("password", {
                                    required: "This field is mandatory",
                                    pattern: {
                                        value: patterns.password,
                                        message:
                                            "Password must be at least 9 characters long and contain an uppercase letter, a lowercase letter, a number and one of the following characters !@#$%^&*-",
                                    },
                                })}
                            />
                            <button
                                type="button"
                                onClick={() => {
                                    setShowPassword((s) => !s);
                                }}
                                className="input-button"
                            >
                                {showPassword ? <VscEyeClosed /> : <VscEye />}
                            </button>

                        </div>
                        {errors.password && (
                            <p className="text-red-500 w-56">{errors.password?.message}</p>
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
                            placeholder="Image Description"
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
                                max: { value: 256, message: "Too big" },
                            })}
                        />
                        {errors.address?.zip && (
                            <p className="text-red-500">{errors.address?.zip?.message}</p>
                        )}


                        <section className="checkbox-container flex flex-row-reverse gap-2 dark:text-white">
                            <label htmlFor="isBusiness">Business</label>
                            <input
                                id="isBusiness"
                                type="checkbox"
                                defaultChecked={isBusiness}
                                {...register("isBusiness")}
                                onChange={handleBusinessCheckboxChange}

                            />

                            {errors.isBusiness && (
                                <p className="text-red-500">{errors.isBusiness?.message}</p>
                            )}

                        </section>
                        <button type="submit" className="custom-button">Register</button>
                    </form>
                </div>
                <div className="flex flex-col justify-center items-center mt-3">
                    <AiOutlineLogin
                        className="mx-auto w-auto size-72 slide-in-fwd-center mt-3" />
                    <p className="mt-6 text-center text-2xl  font-mono leading-9 tracking-tight text-gray-900  dark:text-white">Ready To Get Access</p>
                    <p className=" text-center text-sm text-gray-500  dark:text-white">
                        Not a member?{' '}
                        <a href="#" className="trial-free">
                            Start a 14 day free trial
                        </a>
                    </p>
                </div>
            </div >
            <p className="text-center text-sm text-gray-500 tracking-widest px-3 m-5">
                Please take a moment to register your account to unlock full access to our platform's features.
            </p>
        </div>
    );
};

export default Register;