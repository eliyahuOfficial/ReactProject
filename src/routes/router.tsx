
import "../index.css";
import { createBrowserRouter } from "react-router-dom";
import Register from "./Register.tsx";
import Login from "./Login.tsx";
import Cards from "./Cards.tsx";
import Error from "./Error.tsx";
import Root from "../layouts/Root.tsx";
import Card from "./Card.tsx";
import Spotify from "./Spotify.tsx";
import Home from "./Home.tsx";
import ProtectedRoute from "../components/ProtecetdRoute.tsx";
import Profile from "./Profile.tsx";
import FavoriteCards from "./FavoriteCards.tsx";
import CreateCard from "./CreateCard.tsx";
import MyCards from "./MyCards.tsx";
import CardEdit from "./CardEdit.tsx";






export const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        errorElement: <Error />,
        children: [
            { index: true, element: <Home /> },
            { path: "/register", element: <Register /> },
            {
                path: "/spotify", element: (
                    <ProtectedRoute>
                        <Spotify />
                    </ProtectedRoute>
                )
            },

            { path: "/login", element: <Login /> },
            {
                path: "/cards", element:
                    <ProtectedRoute>
                        <Cards />
                    </ProtectedRoute>
            },

            {
                path: "/createcard", element:
                    <ProtectedRoute>
                        <CreateCard />
                    </ProtectedRoute>
            },
            {
                path: "/cardEdit/:id", element: (
                    <ProtectedRoute>
                        <CardEdit />
                    </ProtectedRoute>
                )
            },

            {
                path: "/cards/:id", element: (
                    <ProtectedRoute>
                        <Card />
                    </ProtectedRoute>
                )
            },
            {
                path: "/favoritecards", element: (
                    <ProtectedRoute>
                        <FavoriteCards />
                    </ProtectedRoute>
                )
            },

            {
                path: "/mycards", element: (
                    <ProtectedRoute>
                        <MyCards />
                    </ProtectedRoute>
                )
            },

            {
                path: "/profile", element: (
                    <ProtectedRoute>
                        <Profile />
                    </ProtectedRoute>
                )
            }
        ],
    },
]); 