import React, { useState } from "react";
import styled from "styled-components";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BackgroundImage from "../components/BackgroundImage";
import Header from "../components/Header";
import { createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "../utils/firebase-config";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate(); 
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });
  const [passwordError, setPasswordError] = useState(null);
  const [password, setPassword] = useState("");
  const handleButtonClick = () => {
    setShowPassword(true);
  };


  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    // Validate the password
    if (newPassword.length < 6) {
      setPasswordError("Password must be at least 6 characters");
    } else {
      setPasswordError(null);
    }

    setFormValues({ ...formValues, password: newPassword });
  };
  const handleSignIn = async () => {
    // Check if all fields are filled
    if (!formValues.email || !formValues.password) {
      toast.error("All fields are mandatory", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } else if (password.length < 6) {
      toast.error("Password should be at least 6 characters long", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } else {
      // Check if the password is valid
      if (passwordError) {
        toast.error("Password must be at least 6 characters", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        return;
      }
  
      try {
        const { email, password } = formValues;
        await createUserWithEmailAndPassword(firebaseAuth, email, password);
  
        // Reset the form, validation error, and show success toast
        setFormValues({
          email: "",
          password: "",
        });
        toast.success("Signup successful!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      } catch (err) {
        console.error(err);
        toast.error("Signup failed. Please try again.", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    }
  };
  onAuthStateChanged(firebaseAuth,(currentuser)=>
  {
    if(currentuser) navigate("/")
  });
  

  return (
    <Container showPassword={showPassword}>
      <ToastContainer />
      <BackgroundImage />
      <div className="content">
        <Header login />
        <div className="body flex column a-center j-center">
          <div className="text flex column">
            <h1>Unlimited movies, TV shows, and more</h1>
            <h4>Watch anywhere, cancel anytime</h4>
            <h6>
              Ready to watch? Enter your email to create or restart membership
            </h6>
          </div>
          <div className="form">

            <input
              type="email"
              placeholder="Email address"
              name="email"
              value={formValues.email}
              onChange={(e) =>
                setFormValues({ ...formValues, [e.target.name]: e.target.value })
              }
            />
            {showPassword && (
              <>
                <input
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={formValues.password}
                  onChange={handlePasswordChange}
                />
                {passwordError && (
                  <p style={{ color: "red" }}>{passwordError}</p>
                )}
              </>
            )}
            {!showPassword && (
              <button onClick={handleButtonClick}>Get Started</button>
            )}
          </div>
          <button onClick={handleSignIn}>Sign Up</button>
        </div>
      </div>
    </Container>
  );
}

const Container = styled.div`
  position: relative;

  .content {
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.5);
    height: 100vh;
    width: 100vw;
    display: grid;
    grid-template-rows: 15vh 85vh;

    .body {
      gap: 1rem;

      .text {
        gap: 1rem;
        text-align: center;
        font-size: 2rem;

        h1 {
          padding: 0 2rem; // Adjusted padding value
        }
      }

      .form {
        display: grid;
        grid-template-columns: ${({ showPassword }) =>
          showPassword ? "1fr 1fr" : "2fr 1fr"};
        width: 60%;
        input {
          color: black;
          border: none;
          font-size: 1.2rem;
          padding: 1.5rem;
          border: 1px solid black;
          &:focus {
            outline: none;
          }
        }
        button {
          padding: 0.5rem 1rem;
          background-color: #e50914;
          border: none;
          cursor: pointer;
          color: white;
          font-weight: bolder;
          font-size: 1.05rem;
        }
       
      }

     
      button {
        padding: 0.5rem 1rem;
        background-color: #e50914;
        border: none;
        cursor: pointer;
        color: white;
        font-weight: bolder;
        font-size: 1.05rem;
        transition: background-color 0.3s; // Add transition for a smooth effect

        &:hover {
          background-color:#700d21; // Change color on hover
        }

        &:active {
          background-color: #d91419; // Change color when clicked
        }
      }
    }
  }

  .error {
    color: red;
    margin-top: 1rem;
    text-align: center;
  }
`;
