import { useEffect } from "react";
import { useFetcher, useSearchParams } from "react-router-dom"

export function Thanks() {
    let [params, _] = useSearchParams();
    const fetcher = useFetcher();
    useEffect(() => {
        let intent = params.get("payment_intent");
        let secret = params.get("payment_intent_client_secret");
        if (secret) {
            fetcher.submit(JSON.stringify(
                {
                    intent,
                    secret
                }
            ),
                {
                    method: 'POST',
                    action: '/thanks',
                    encType: "application/json"
                }
            );
        }
    }, [params])

    useEffect(() => {
        if (fetcher.data) {
        }
    }, [fetcher.data])
    return (
        <>
            {fetcher.data && <h3>Thanks for your order!</h3>}
        </>
    )
}