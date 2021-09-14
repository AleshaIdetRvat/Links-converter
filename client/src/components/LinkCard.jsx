import React from "react"

const LinkCard = ({ link }) => {
    return (
        <div>
            <h3>
                Link: <strong style={{ color: link.color }}> {link.name}</strong>
            </h3>
            <p>
                Short Link:{" "}
                <a href={link.to} target="_blank" rel="noopener noreferrer">
                    {link.to}
                </a>
            </p>
            <p>
                From:{" "}
                <a href={link.from} target="_blank" rel="noopener noreferrer">
                    {link.from}
                </a>
            </p>
            <p>
                Clicks: <strong>{link.clicks}</strong>
            </p>
            <p>
                Date of creation:
                <i>
                    {" "}
                    {new Date(link.date).toLocaleDateString() +
                        ", at " +
                        new Date(link.date).toLocaleTimeString()}
                </i>
            </p>
        </div>
    )
}

export default LinkCard
