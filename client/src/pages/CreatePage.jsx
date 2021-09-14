import React, { useContext, useEffect } from "react"
import { AuthContext } from "../context/AuthContext"
import { useHttp } from "../hooks/http.hook"
import { useNotification } from "../hooks/notification.hook"
import { useHistory } from "react-router-dom"

const CreatePage = () => {
    const history = useHistory()
    const authContext = useContext(AuthContext)
    const { request, error, clearError } = useHttp()
    const showNotif = useNotification()

    const [link, setLink] = React.useState("")
    const [name, setName] = React.useState("")

    const getRandomInt = (max) => Math.floor(Math.random() * max)

    const randomRgbColor = () =>
        `rgb(${getRandomInt(255)}, ${getRandomInt(255)}, ${getRandomInt(255)})`

    const pressHandler = async (e) => {
        if (e.key === "Enter" && link) {
            try {
                const data = await request(
                    "/api/link/generate",
                    "POST",
                    { from: link, name, color: randomRgbColor() },
                    { Authorization: "Bearer " + authContext.token }
                )
                history.push(`/detail/${data.link._id}`)
            } catch (error) {}
        } else if (e.key === "Enter" && !link) {
            showNotif("Put the link, please")
        }
    }
    useEffect(() => {
        showNotif(error)
        clearError()
    }, [error, showNotif, clearError])
    return (
        <div className="row" style={{ paddingTop: "2rem" }}>
            <div className="col s8 offset-s2">
                <div className="input-field ">
                    <input
                        id="link"
                        type="text"
                        className="validate white-text"
                        name="link"
                        value={link}
                        onChange={(e) => setLink(e.target.value)}
                        onKeyPress={pressHandler}
                    />
                    <label className="active" htmlFor="link">
                        Put link (is required)
                    </label>
                </div>
                <div className="input-field ">
                    <input
                        id="name"
                        type="text"
                        className="validate white-text"
                        name="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        onKeyPress={pressHandler}
                    />
                    <label
                        //style={{ marginTop: "1rem" }}
                        className="active"
                        htmlFor="link"
                    >
                        Short name for the link
                    </label>
                </div>
            </div>
        </div>
    )
}

export default CreatePage
