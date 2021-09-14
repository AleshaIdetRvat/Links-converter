import React from "react"
import { Link } from "react-router-dom"

const LinksListItem = ({ color, name, linkNumber, from, to, _id }) => {
    return (
        <tr>
            <td>{linkNumber}</td>
            <td style={{ color: color }}>
                <strong>{name}</strong>
            </td>
            <td>{from}</td>
            <td>{to}</td>
            <td>
                <Link to={`/detail/${_id}`}>Show detail</Link>
            </td>
        </tr>
    )
}

const LinksList = ({ links }) => {
    if (!links.length) {
        return <h2>Empty</h2>
    }
    return (
        <div className="links">
            <table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Short name</th>
                        <th>Origin</th>
                        <th>Short</th>
                        <th>Open</th>
                    </tr>
                </thead>

                <tbody>
                    {links.map((link, i) => (
                        <LinksListItem {...link} linkNumber={i + 1} key={i} />
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default LinksList
