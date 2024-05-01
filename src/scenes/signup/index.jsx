import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { React, useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { UserContext } from "../../App";
import { extractPasswordFromEmail } from "../../utils/auth";
import styles from "./styles.module.css";

async function fetchData(url) {
  const response = await fetch(
    `${process.env.REACT_APP_API_BASE_URL}/api/${url}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
    }
  );
  if (!response.ok) {
    console.log(response);
    toast.error("Something went wrong! Please try again.");
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return await response.json();
}

async function registerUser(email) {
  const passwordHash = extractPasswordFromEmail(email);
  const username = passwordHash;
  const response = await fetchData(
    `signup/${username}/${email}/${passwordHash}`
  );
  return response.user;
}

function Signup() {
  const { setUser, setIsAuthorized } = useContext(UserContext);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [passwordHash, setPasswordHash] = useState("");
  const navigate = useNavigate();

  const googleRegister = useGoogleLogin({
    onSuccess: async (respose) => {
      try {
        const res = await axios.get(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: {
              Authorization: `Bearer ${respose.access_token}`,
            },
          }
        );
        const data = res.data;
        const user = await registerUser(data.email);
        setUser(user);
        setIsAuthorized(true);
        navigate("/dashboard");
        toast.success("Registered via Google successfully!");
      } catch (err) {
        console.log(err);
      }
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetchData(
        `signup/${username}/${email}/${passwordHash}`
      );
      if (response.ok) {
        setUser(response.user);
        setIsAuthorized(true);
        navigate("/dashboard");
        toast.success("Logged in successfully!");
      } else {
        toast.error(response.error);
      }
    } catch (error) {
      toast.error("Something went wrong! Please try again.");
      console.error("Error signing up:", error);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Sign up Form</h1>
      <div className={styles.form_container}>
        <div className={styles.left}>
          <img className={styles.img} src="./images/signup.jpg" alt="signup" />
        </div>
        <div className={styles.right}>
          <h2 className={styles.from_heading}>Create Account</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              className={styles.input}
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <input
              type="email"
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
            <button type="submit" className={styles.btn}>
              Sign Up
            </button>
          </form>
          <p className={styles.text}>or</p>
          <button className={styles.google_btn} onClick={googleRegister}>
            <img src="./images/google.png" alt="google icon" />
            <span>Sing up with Google</span>
          </button>
          <p className={styles.text}>
            Already Have Account ? <Link to="/login">Log In</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
