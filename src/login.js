import React, { useState, useEffect } from 'react';
import { useFormik } from "formik";
import * as Yup from "yup";
import { json } from 'react-router';
import Spinner from "react-spinkit";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { dataRef } from './firebase';
import { FireHydrantAltTwoTone } from '@mui/icons-material';
import logos from './assets/snkrs.png'
import nike from './assets/nike.jpg'


let loginarray = []
let count = 0
let url = './register'


export default function Login() {

    useEffect(() => {
        count++
        if (count == 1) {
            const newarray = JSON.parse(localStorage.getItem('login'));
            if (newarray) {
                loginarray = newarray
                setNewData(loginarray)
                console.log(loginarray);
            }
        }
    }, [loginarray]);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const match = localStorage.getItem('Register') ? JSON.parse(localStorage.getItem('Register')) : []
    // const [flag, setFlag] = useState(false);
    let flags = false;
    const [allNewData, setNewData] = useState([]);

    const getData = (data) => {
        for (let i = 0; i < match.length; i++) {
            if (data.email === match[i].email && data.password === match[i].password) {
                flags = true;
            }
        }
        if (flags) {
            window.location.href = "./main"
        } else {
            alert('Please enter valid credential');
        }

        setEmail(data.email)
        setPassword(data.password)

        const newData = { email: data.email, password: data.password, };
        loginarray.push(newData)
        console.log(loginarray)
        localStorage.setItem('login', JSON.stringify(loginarray));
        setNewData(loginarray);

        // localStorage.setItem('login', JSON.stringify(temparray1));
        // window.location.href = './addproduct'
        setEmail('')
        setPassword('')

    }

    // const  firedatas = (data) =>{
    //     dataRef.ref('Login User').set({
    //         email:data.email,
    //         password:data.password,
    //     }).catch(alert);
    // }



    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },

        validationSchema: Yup.object({
            email: Yup.string()
                .email("Invalid email format")
                .required("Required!"),
            password: Yup.string()
                .required("Required!"),
        }),




        onSubmit: values => {
            getData(values);
            // firedatas(values)
            // localStorage.setItem('items', JSON.stringify(value))
        }
    });


    return (
        <div className='login'>
            <div className="App">
                <div className='looogo'>
                    <img src={nike} style={{ height: "80px" }} />
                </div>
                <h4 className='banners'>Enter your email to join us or sign in.</h4>
                <form onSubmit={formik.handleSubmit} className="loginform">
                    <div className='EMails'>
                        <label>Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                        />
                        {formik.errors.email && formik.touched.email && (
                            <p className='erros'>{formik.errors.email}</p>
                        )}
                    </div>
                    <div >
                        <label>Password</label>
                        <input
                            type="password"
                            name="password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                        />
                        {formik.errors.password && formik.touched.password && (
                            <p className='erros'>{formik.errors.password}</p>
                        )}
                    </div>

                    <div className='refisterif'>
                        <a href={url} >If you don't have an account</a>
                    </div>


                    <div class="mb6-sm prl0-lg fs14-sm">
                        <button type="submit" class="loginafter ">Login</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
