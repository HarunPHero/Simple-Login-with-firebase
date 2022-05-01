import { useState } from "react";
import "./App.css";
import {
  getAuth,
  signInWithPopup,
  FacebookAuthProvider,
  GithubAuthProvider,
  GoogleAuthProvider,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
  sendPasswordResetEmail
} from "firebase/auth";
import initializeFirebaseAuth from "./Firebase/firebase.initialize";

initializeFirebaseAuth();

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIslogin] = useState(false);
  const [error, setError] = useState("");
  const [user, setUser] = useState("");
  const [people, setPeople] = useState({})
  const auth = getAuth();

  const GoogleProvider = new GoogleAuthProvider();
  const FacebookProvider = new FacebookAuthProvider();
  const GitProvider = new GithubAuthProvider();

  const signInWithGoogle = () => {
    signInWithPopup(auth, GoogleProvider).then((result) => {
      const {displayName,photoURL, email} = result.user;
      let loggedPeople = {
        name:displayName,
        photo:photoURL,
        email:email
      };
      setPeople(loggedPeople)
    });
  };
  const handleRegister = (e) => {
    e.preventDefault();
    if (password.length < 6) {
      setError("password must be 6 characters long");
      return;
    }
    if (!/(?=.*[A-Z].*[A-Z])/.test(password)) {
      setError("Ensure string has two uppercase letters.");
      return;
    }
    if (isLogin) {
      loginProcess(email, password);
    } else {
      registerProcess(email, password);
    }
  };
  const loginProcess = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        setError("User is successfully created")
        
      })
      .catch((error) => setError("Wrong password or email"));
  };
  const registerProcess = (email, password) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        setError("");
        updateUser();
        verifyUser();
        
      })
      .catch((error) => setError("This user is already created"));
  };
  const verifyUser = () => {
    sendEmailVerification(auth.currentUser).then(() => {});
  };
  const updateUser = () => {
    updateProfile(auth.currentUser, {
      displayName:user
    })
  }
  const handleEmail = (e) => {
    e.preventDefault();
    setEmail(e.target.value);
  };
  const handlePassword = (e) => {
    e.preventDefault();

    setPassword(e.target.value);
  };
  const signInWithfacebook = () => {
    signInWithPopup(auth, FacebookProvider).then((result) => {
      const {displayName,photoURL, email} = result.user;
      let loggedPeople = {
        name:displayName,
        photo:photoURL,
        email:email
      };
      console.log(result.user)
      setPeople(loggedPeople)
    });
  };
  const handleResetPassword = () => {
    sendPasswordResetEmail(auth, email).then(() => {});
  };
  const handleUser = (e) => {
    setUser(e.target.value);
  };
  const signInWithGithub = () => {
    signInWithPopup(auth, GitProvider).then((result) => {
      const {displayName,photoURL, email} = result?.user;
      let loggedPeople = {
        name:displayName,
        photo:photoURL,
        email:email
      };
      setPeople(loggedPeople)
    });
  };
  const logout = () => {
    signOut(auth).then(() => {setPeople({})});
  };

  const handleisLogin = (e) => {
    setIslogin(e.target.checked);
  };

  return (
    <div className="m-5">
      {!people.name ?
        <>
          {" "}
          <h1 className="text-center text-primary">
            Please{" "}
            {!isLogin ? "fillout the form for register" : "Login the form"}
          </h1>
          <div>
            <form
              onSubmit={handleRegister}
              className="m-5 shadow-lg p-3 mb-5 bg-body rounded"
            >
              <button
                className="text-light btn btn-success"
                onClick={signInWithGoogle}
              >
                <svg
                  aria-hidden="true"
                  class="native svg-icon iconGoogle"
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                >
                  <path
                    d="M16.51 8H8.98v3h4.3c-.18 1-.74 1.48-1.6 2.04v2.01h2.6a7.8 7.8 0 0 0 2.38-5.88c0-.57-.05-.66-.15-1.18Z"
                    fill="#4285F4"
                  ></path>
                  <path
                    d="M8.98 17c2.16 0 3.97-.72 5.3-1.94l-2.6-2a4.8 4.8 0 0 1-7.18-2.54H1.83v2.07A8 8 0 0 0 8.98 17Z"
                    fill="#34A853"
                  ></path>
                  <path
                    d="M4.5 10.52a4.8 4.8 0 0 1 0-3.04V5.41H1.83a8 8 0 0 0 0 7.18l2.67-2.07Z"
                    fill="#FBBC05"
                  ></path>
                  <path
                    d="M8.98 4.18c1.17 0 2.23.4 3.06 1.2l2.3-2.3A8 8 0 0 0 1.83 5.4L4.5 7.49a4.77 4.77 0 0 1 4.48-3.3Z"
                    fill="#EA4335"
                  ></path>
                </svg>
                Sign {!isLogin ? "up" : "in"} with Google{" "}
              </button>
              <br />
              <br />
              <button
                className="btn btn-primary text-light text-center"
                onClick={signInWithfacebook}
              >
                <svg
                  aria-hidden="true"
                  class="svg-icon iconFacebook"
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                >
                  <path
                    d="M3 1a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2H3Zm6.55 16v-6.2H7.46V8.4h2.09V6.61c0-2.07 1.26-3.2 3.1-3.2.88 0 1.64.07 1.87.1v2.16h-1.29c-1 0-1.19.48-1.19 1.18V8.4h2.39l-.31 2.42h-2.08V17h-2.5Z"
                    fill="#4167B2"
                  ></path>
                </svg>
                Sign {!isLogin ? "up" : "in"} with Facebook
              </button>
              <br />
              <br />
              <button
                className="text-light btn btn-secondary"
                onClick={signInWithGithub}
              >
                <svg
                  aria-hidden="true"
                  class="svg-icon iconGitHub"
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                >
                  <path
                    d="M9 1a8 8 0 0 0-2.53 15.59c.4.07.55-.17.55-.38l-.01-1.49c-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.42 7.42 0 0 1 4 0c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48l-.01 2.2c0 .21.15.46.55.38A8.01 8.01 0 0 0 9 1Z"
                    fill="#010101"
                  ></path>
                </svg>
                Sign {!isLogin ? "up" : "in"} with Github
              </button>
              {!isLogin && (
                <div className="row mb-3 mt-5">
                  <label
                    htmlFor="inputName"
                    className="col-sm-2 col-form-label"
                  >
                    Name
                  </label>
                  <div className="col-sm-10">
                    <input
                      onBlur={handleUser}
                      type="text"
                      className="form-control"
                      id="inputName"
                      required
                    />
                  </div>
                </div>
              )}
              <h5 className="text-danger">{error}</h5>
              <div className="row mb-3 mt-5">
                <label
                  htmlFor="inputEmail3"
                  className="col-sm-2 col-form-label"
                >
                  Email
                </label>
                <div className="col-sm-10">
                  <input
                    onBlur={handleEmail}
                    type="email"
                    className="form-control"
                    id="inputEmail3"
                    required
                  />
                </div>
              </div>
              <div className="row mb-3">
                <label
                  htmlFor="inputPassword3"
                  className="col-sm-2 col-form-label"
                >
                  Password
                </label>
                <div className="col-sm-10">
                  <input
                    onBlur={handlePassword}
                    type="password"
                    className="form-control"
                    id="inputPassword3"
                    required
                  />
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-sm-10 offset-sm-2">
                  <div className="form-check">
                    <input
                      onChange={handleisLogin}
                      className="form-check-input"
                      type="checkbox"
                      id="gridCheck1"
                    />
                    <label className="form-check-label" htmlFor="gridCheck1">
                      Already registered?
                    </label><br />
                    {isLogin && <button onClick={handleResetPassword}>Forgotten password</button> }
                    
                  </div>
                </div>
              </div>
              <button type="submit" className="btn btn-primary">
                {isLogin ? "Login" : "Signup"}
              </button>
            </form>
          </div>
        </>:<div className="text-center">
        <button className="btn btn-danger"onClick={logout}>Logout</button>
        <h1>Hello {people.name}</h1>
        <h1>Your email is {people.email || "none (you have no email for this account)"}</h1>
        <img src={people.photo} alt="" />
        </div>
      }
    </div>
  );
}

export default App;
