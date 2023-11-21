import { Navigate, useNavigate, useSearchParams } from "react-router-dom";

export function EditOption() {
    let [searchParams] = useSearchParams();

    return (
        <Navigate to={`${searchParams.get("prevUrl")}`} />
    )


}