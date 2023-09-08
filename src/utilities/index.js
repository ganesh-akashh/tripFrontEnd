import axios from "axios"
import state from "../store";
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';

export const deleteUser = () => {
    axios.delete(`http://localhost:8081/deleteUserName/${state.userEmail}`).then((response) => {
        if (response.status === 200) {
            toast.success('Account deleted successfully. We hope to see you again!', {
                position: 'top-right',
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                style: {
                    backgroundColor: '#4CAF50',
                    color: 'white',
                    borderRadius: '8px',
                    padding: '16px',
                    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
                    fontFamily: 'Arial, sans-serif',
                    fontWeight: 'bold',
                    fontSize: '14px',
                },
            });
            localStorage.clear();
            state.userName = '';
            state.userEmail = '';
            state.isLoggedIn = false;
        } else {
            toast.error("Oops something went wrong. Please Try again", {
                position: 'top-right',
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                style: {
                    backgroundColor: '#FF5252',
                    color: 'white',
                    borderRadius: '8px',
                    padding: '16px',
                    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
                    fontFamily: 'Arial, sans-serif',
                    fontWeight: 'bold',
                    fontSize: '14px',
                },
            });
        }
    }).catch((error) => {
        console.log(error);
    });

}

export const isSignUpValid = async (inputForm, type) => {
    const email = inputForm.email;
    try {
        const response = await axios.get(`http://localhost:8081/checkEmailExists/${email}`);

        if (response.data === 0 && type === "signUp") {
            return true;
        } else if (response.data === 1 && type === "signIn") {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.log(error);
        return false;
    }
};


export const isSignInValid = async (inputForm) => {
    const email = inputForm.email;
    const password = inputForm.password;
    try {
        const response = await axios.get(`http://localhost:8081/checkForm/${email}/${password}`);
        const string = response.data;
        if (string.length > 1) {
            state.userName = string;
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.log(error);
        return false;
    }
}
