import { Navigate, useSearchParams } from "react-router-dom";

export function EditVariant() {
    let [searchParams] = useSearchParams();

    return (
        <Navigate to={`${searchParams.get("prevUrl")}`} />
    )


}