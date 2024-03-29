
import { useEffect } from 'react';
import { Formik } from "formik";
import * as Yup from "yup";
import { red } from '@material-ui/core/colors';
import { useState } from 'react';
import { UploadFile } from '@mui/icons-material';
import { width } from '@mui/system';
import { dataRef } from './firebase';
import firebase from './firebase';
import { add } from './store/cartSlice';


let count = 0
let array1 = [];
let array2 = [];
// let array3 = [];  



export default function Sneaker() {


    useEffect(() => {
        count++
        if (count == 1) {
            const addeddata = JSON.parse(localStorage.getItem('sneakers'));
            // console.log(addeddata);
            if (addeddata) {
                array1 = addeddata
                setData(array1)
            }
        }
    }, [array1])
    
   useEffect(()=>{
    count++
    if(count == 1){
        const addeddata1 = JSON.parse(localStorage.getItem('sneakers'));
        if(addeddata1){
            array1 = addeddata1
            setData(array1)
        } 
    }
   })

    
    const [showimage, setShowimage] = useState(array2)

    const getBase64 = (file) => {
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            console.log('RESULT', reader.result)
            array2.push(reader.result)
            console.log(array2);
        }
        setShowimage(array2);
    }

    const uploadImage = (images) => {
        for (let i = 0; i < images.length; i++) {
            getBase64(images[i])
        }
    }


    const [name, setName] = useState('')
    const [price, setPrice] = useState('');
    const [file, setFile] = useState('');
    const [description, setDescription] = useState('');
    const [sku, setSku] = useState('')
    const [data, setData] = useState([]);
    const [id, setId] = useState(Date.now());

    const getdata = (data) => {
        setName(data.name);
        setPrice(data.price);
        setFile(data.file);
        setDescription(data.description);
        const newshoesdata = { name: data.name, price: data.price, file: array2, sku: data.sku, id: id, description: data.description }
        array1.push(newshoesdata)
        setData(array1)
        console.log(array1);
        localStorage.setItem('sneakers', JSON.stringify(array1))
    }

    const upcomming = () => {
        window.location.href = './upcomming'
    }


    // const onSubmits = (values) => {
    //     let ref1 = firebase.database().ref().child('users').push()
    //     ref1.set(values)
    // };


    return (
        <div>

            <div className='upcooming'>
                <h1 > Shoes form</h1>
            </div>
            <Formik
                initialValues={{ name: "", price: "", file: array2, description: "", sku: "", data: [] }}
                onSubmit={(values, { setSubmitting }) => {
                    getdata(values);
                    // onSubmits(values);
                    window.location.href = './sneaker'
                }}
                validationSchema={Yup.object().shape({
                    name: Yup.string()
                        .required("name Required"),
                    price: Yup.string()
                        .required('Price required'),
                    // file: Yup.string()
                    //     .required('Image required'),
                    description: Yup.string()
                        .required('Description required'),
                    sku: Yup.string()
                        .required('sku required'),
                })}

            >
                {props => {
                    const {
                        values,
                        touched,
                        errors,
                        isSubmitting,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        onClick,
                    } = props;
                    return (
                        <>
                            <form onSubmit={handleSubmit}>
                                <label htmlFor="name">name</label>
                                <input
                                    name="name"
                                    type="text"
                                    placeholder="Enter your name"
                                    value={values.name}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={errors.name && touched.name && "error"}
                                />
                                {errors.name && touched.name && (
                                    <div className="input feedback">{errors.name}</div>
                                )}


                                <label htmlFor="sku">Skucode</label>
                                <input
                                    name="sku"
                                    type="text"
                                    placeholder="Enter your sku"
                                    value={values.sku}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={errors.sku && touched.sku && "error"}
                                />
                                {errors.sku && touched.sku && (
                                    <div className="input feedback">{errors.sku}</div>
                                )}

                                <label htmlFor="price">price</label>
                                <input
                                    name="price"
                                    type="number"
                                    placeholder="Enter your price"
                                    value={values.price}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={errors.price && touched.price && "error"}
                                />
                                {errors.price && touched.price && (
                                    <div className="input feedback">{errors.price}</div>
                                )}


                                <label htmlFor="image">Product Images</label>
                                <input id="file" name="file" className={`form-control ${touched.file && errors.file ? "is-invalid" : ""
                                    }`} type="file" onChange={(event) => {
                                        uploadImage(event.target.files);
                                    }} multiple />
                                <div className='showimage'>
                                    {
                                        showimage.length > 0 && showimage.map((img) => {
                                            return (
                                                <img src={img} style={{ width: "100px" }} />
                                            )
                                        })
                                    }
                                </div>
                                {errors.price && touched.price && (
                                    <div className="input feedback">{errors.price}</div>
                                )}

                                <label htmlFor="description">description</label>
                                <textarea
                                    name="description"
                                    type="text"
                                    placeholder="Enter your description"
                                    value={values.description}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    style={{ width: "100%" }}
                                    className={errors.description && touched.description && "error"}
                                />
                                {errors.description && touched.description && (
                                    <div className="input feedback">{errors.description}</div>
                                )}

                                <div className='submit'>

                                    <button type="submit" disabled={isSubmitting}>
                                        Submit
                                    </button>
                                </div>
                            </form>
                        </>
                    );
                }}
            </Formik>
        </div>
    )
}

