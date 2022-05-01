import { initializeApp } from "firebase/app";
import {getAnalytics} from "firebase/analytics"
import firebaseConfig from "./firebase.config";
const initializeFirebaseAuth = () => {
  const app = initializeApp(firebaseConfig);
  getAnalytics(app)
};
export default initializeFirebaseAuth;
