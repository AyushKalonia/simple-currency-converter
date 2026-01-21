import { useEffect, useState } from "react";

function useCurrencyInfo(currencyCode) {
    const date = 'latest'
    const apiVersion = 'v1'
    const endpoint = `currencies/${currencyCode}.json`
    const [data, setData] = useState({})
    useEffect(() => {
        fetch(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@${date}/${apiVersion}/${endpoint}`)
        .then((res) => res.json())
        .then((jsonData) => setData(jsonData[currencyCode]))

        console.log(data)

    }, [currencyCode])

    console.log(data)
    return data
}

export default useCurrencyInfo;