import { useRouteError } from "react-router-dom";
import { DotLoader } from "react-spinners";
import "./Error.scss"

type ErrorType = {
    status: number;
    statusText: string;
    data: string;
};

const Error = () => {
    const { data, status, statusText } = useRouteError() as ErrorType;

    return (
        <div id="error-page">
            <h1>Oops!</h1>
            <p>Sorry, an unexpected error has occurred.</p>

            <p>
                <i>{statusText}</i>
            </p>
            <p>
                <i>{status}</i>
            </p>
            <p>
                <i>{data}</i>
            </p>

            <DotLoader color="#ff7e66" />
        </div>
    );
};

export default Error;