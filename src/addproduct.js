import React, { useEffect, useState } from "react";
import Layout from "./layout";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { json } from "react-router-dom";
import { Switch } from "@material-ui/core";

let temparray1 = [];
let temparray2 = [];
let count = 0
export default function Addproduct() {
  useEffect(() => {
    count++
    if (count == 1) {
      const newarray = JSON.parse(localStorage.getItem('productdetail'));
      if (newarray) {
        temparray1 = newarray
        setData(temparray1)
        console.log(temparray1);
      }
    }
  }, [temparray1]);



  const [productname, setProductname] = useState("");
  const [skucode, setSkucode] = useState("");
  const [category, setcategory] = useState("");
  const [gender, setGender] = useState("");
  const [price, setPrice] = useState("");
  const [checked, setChecked] = useState([]);
  const [discount, setDiscount] = useState("");
  const [description, setDescription] = useState("");
  const [file, setfile] = useState("");
  const [id, setId] = useState(Date.now());
  const [trending, setTrending] = useState('');

  const [data, setData] = useState([]);

  const LoginSchema = Yup.object().shape({
    productname: Yup.string().required("productname is required"),
    skucode: Yup.string()
      .min(6, "skucode must be 6 characters at minimum")
      .required("skucode is required"),
    category: Yup.string()
      .required("product category is required!"),
    gender: Yup.string()
      .required("Gender is required!"),
    // description:Yup.string()
    // .required('Description in reuired'),
    price: Yup.string()
      .required("Price is required"),
  });

  const getBase64 = (file) => {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      // console.log(reader.result);
      temparray2.push(reader.result)
      console.log(temparray2)
    };
  }

  const uploadImage = (images) => {
    for (let i = 0; i < images.length; i++) {
      getBase64(images[i])
    }
  }

  const getData1 = (data) => {

    setProductname(data.productname);
    setSkucode(data.skucode);
    setcategory(data.category);
    setGender(data.gensd);
    setPrice(data.price);
    setChecked(data.checked)
    setDiscount(data.discount)
    setDescription(data.description);
    setfile(data.setfile);
    setTrending(data.trending)


    console.log(temparray1, 'before');
    const newdata = { trending:data.trending,checked: data.checked, productname: data.productname, skucode: data.skucode, price: data.price, category: data.category, gender: data.gender, id: id, description: data.description, file: temparray2, discount: data.discount };
    console.log(newdata)
    temparray1.push(newdata)
    console.log(newdata)
    setData(temparray1)
    console.log(temparray1, 'after')
    localStorage.setItem('productdetail', JSON.stringify(temparray1));

    // muchas gracias afición esto es para vosotros siuuuuuuuuuuuu

    temparray2 = []

    setTimeout(() => {
      window.location.reload();
    }, 2000);

    toast.success('You successfully add product', {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 5000
    });

  };

  return (
    <div>

      {/* <Layout> */}
      <div className="container">
        <div className="row mb-5">
          <div className="col-lg-12 text-center">
            <h1 className="mt-5">Add Products </h1>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <Formik
              initialValues={{
                productname: "",
                skucode: "",
                price: "",
                discount: "",
                category: "",
                gender: "",
                description: "",
                file: temparray2,
                checked: [],
                data: [],
                trending:'',
              }}
              validationSchema={LoginSchema}


              onSubmit={(values, { isSubmitting }) => {
                getData1(values);
              }}
            >
              {({
                touched,
                errors,
                isSubmitting,
                values,
                handleChange,
                handleBlur,
                setFieldValue,
              }) => (
                <Form>
                  <div className="form-group">
                    <label htmlFor="productname">Productname</label>
                    <Field
                      type="text"
                      name="productname"
                      placeholder="Enter productname"
                      className={`form-control ${touched.productname && errors.productname
                        ? "is-invalid"
                        : ""
                        }`}
                    />
                    <ErrorMessage
                      component="div"
                      name="productname"
                      className="invalid-feedback"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="skucode">Skucode</label>
                    <Field
                      type="text"
                      name="skucode"
                      placeholder="Enter skucode"
                      className={`form-control ${touched.skucode && errors.skucode ? "is-invalid" : ""
                        }`}
                    />
                    <ErrorMessage
                      component="div"
                      name="skucode"
                      className="invalid-feedback"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="trending">trending</label>
                  <Switch
                    name="trending"
                    value="Y"
                    checked={values.trending === "Y"}
                    onChange={(event, checked) => {
                      setFieldValue("trending", checked ? "Y" : "N");
                    }}
                  />
                  </div>

                  <div id="checkbox-group">Size</div>
                  <div role="group" aria-labelledby="checkbox-group">
                    <label>
                      <Field type="checkbox" name="checked" value="Small" />
                      S
                    </label>
                    <label>
                      <Field type="checkbox" name="checked" value="Medium" />
                      M
                    </label>
                    <label>
                      <Field type="checkbox" name="checked" value="Large" />
                      L
                    </label>
                    <label>
                      <Field type="checkbox" name="checked" value="Single Large" />
                      XL
                    </label>
                    <label>
                      <Field type="checkbox" name="checked" value="Double Large" />
                      XXL
                    </label>
                    <label>
                      <Field type="checkbox" name="checked" value="Triple Large" />
                      XXXL
                    </label>
                  </div>

                  <div className="form-group">
                    <label htmlFor="price">price</label>
                    <Field
                      type="number"
                      name="price"
                      placeholder="Ex: $5"
                      className={`form-control ${touched.price && errors.price ? "is-invalid" : ""
                        }`}
                    />
                    <ErrorMessage
                      component="div"
                      name="price"
                      className="invalid-feedback"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="discount">discount</label>
                    <Field
                      type="text"
                      name="discount"
                      placeholder="Enter discount"
                      className={`form-control ${touched.discount && errors.discount ? "is-invalid" : ""
                        }`}
                    />
                    <ErrorMessage
                      component="div"
                      name="discount"
                      className="invalid-feedback"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="email" style={{ display: "block" }}>
                      category
                    </label>
                    <select
                      name="category"
                      value={values.category}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      style={{ display: "block" }}
                      className={`form-control ${touched.category && errors.category ? "is-invalid" : ""
                        }`}
                    >
                      <option value="" label="Select a category">
                        Select a category{" "}
                      </option>
                      <option value="Cloths" label="Cloths">
                        {" "}
                        Cloths
                      </option>
                      <option value="Electronics" label="Electronics">
                        Electronics
                      </option>

                      <option value="Footware" label="Footware">
                        Footware
                      </option>
                    </select>
                    <ErrorMessage
                      component="div"
                      name="category"
                      className="invalid-feedback"
                    />

                  </div>

                  <div className="form-group">
                    <label htmlFor="email" style={{ display: "block" }}>
                      Gender
                    </label>

                    <label className="name">
                      <input
                        type="radio"
                        name="gender"
                        value="Male"
                        checked={values.gender === "Male"}
                        onChange={() => setFieldValue("gender", "Male")}
                      />
                      Male
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="gender"
                        value="Female"
                        checked={values.gender === "Female"}
                        onChange={() => setFieldValue("gender", "Female")}

                      />
                      Female
                    </label>
                  </div>

                  <div className="form-group">
                    <input id="file" name="file" className={`form-control ${touched.file && errors.file ? "is-invalid" : ""
                      }`} type="file" onChange={(event) => {
                        uploadImage(event.target.files);
                      }} multiple />
                  </div>


                  <div className="form-group">
                    <label htmlFor="description">description</label>
                    <Field
                      as="textarea"
                      name="description"
                      placeholder="Enter description"
                      className={`form-control ${touched.description && errors.description ? "is-invalid" : ""
                        }`}
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary btn-block"
                  >
                    Submit
                  </button>
                  <ErrorMessage
                    component="div"
                    name="gender"
                    className="invalid-feedback"
                  />
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
      {/* </Layout> */}
      <ToastContainer position="top-center" />
    </div>

  );
}