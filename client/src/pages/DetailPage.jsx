import React, { useEffect, useState, useContext, useCallback } from "react";
import { useParams } from "react-router-dom";
import Loader from "../components/common/Loader";
import LinkCard from "../components/LinkCard";
import { AuthContext } from "../context/AuthContext";
import { useHttp } from "../hooks/http.hook";

const DetailPage = (props) => {
    const { token } = useContext(AuthContext);
    const { loading, request } = useHttp();
    const [link, setLink] = useState("");
    const linkId = useParams().id;

    const getLink = useCallback(async () => {
        try {
            const fetchedLink = await request(`/api/link/${linkId}`, "GET", null, {
                Authorization: `Bearer ${token}`,
            });
            setLink(fetchedLink);
        } catch (error) {}
    }, [linkId, token, request]);

    useEffect(() => {
        getLink();
    }, [getLink]);

    if (loading) {
        return <Loader />;
    }
    return <> {link && <LinkCard link={link} />} </>;
};

export default DetailPage;
