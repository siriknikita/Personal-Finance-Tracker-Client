import { Link, useNavigate } from "react-router-dom";
import { React, useState, useContext } from "react";
import { UserContext } from "../../App";
import styles from "./styles.module.css";

async function fetchData(url) {
    const response = await fetch(`http://localhost:8080/api/${url}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        mode: "cors"
    });
    if (!response.ok) {
        console.log(response);
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
}

function Login() {
    const { setUser } = useContext(UserContext);
    const [email, setEmail] = useState("");
    const [passwordHash, setPasswordHash] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let user = await fetchData(`login/${email}/${passwordHash}`);
            setUser(user.user);
            navigate("/dashboard");
        } catch (error) {
            console.error("Error logging in:", error);
        }
    };
    
    return (
        <div className={styles.container}>
            <h1 className={styles.heading}>Log in Form</h1>
            <div className={styles.form_container}>
                <div className={styles.left}>
                    <img className={styles.img} src="./images/login.jpg" alt="login" />
                </div>
                <div className={styles.right}>
                    <h2 className={styles.from_heading}>Members Log in</h2>
                    <form onSubmit={handleSubmit}>
                        <input 
                            type="text"
                            className={styles.input}
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <input
                            type="password"
                            className={styles.input}
                            placeholder="Password"
                            value={passwordHash}
                            onChange={(e) => setPasswordHash(e.target.value)}
                            required
                        />
                        <br />
                        <button className={styles.btn}>Log In</button>
                    </form>
                    <p className={styles.text}>or</p>
                    <button className={styles.google_btn} onClick={console.log("Not implemented yet...")}>
                        <img src="./images/google.png" alt="google icon" />
                        <span>Sing in with Google</span>
                    </button>
                    <p className={styles.text}>
                        New Here ? <Link to="/signup">Sing Up</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Login;
