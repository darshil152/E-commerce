import { CardTravelSharp, CloseFullscreen, ImportExport } from '@mui/icons-material'
import React, { useState,useEffect } from 'react'
import Table from 'react-bootstrap/Table';


export default function Cart() {

  const [counter, setCounter] = useState(1);

  const newdata = localStorage.getItem('cartitems') ? JSON.parse(localStorage.getItem('cartitems')) : [];
  const old = localStorage.getItem('productdetail') ? JSON.parse(localStorage.getItem('productdetail')) : [];
  const [data, setData] = useState([])
  const [currentdata, setCurrentdata] = useState([]);



  useEffect(() => {
    console.log(old);
    for (let i = 0; i < old.length; i++) {
      if (old[i].id == newdata[i]) {
        setCurrentdata(old[i])
      }
    }
  }, [])
  
  console.log(currentdata)

  // const decreaseQty = (data) => {
  //   console.log(data);
  // }

  // //-----------------------increment decrement --------------------------//

  // const increase = (data) => {
  //   setCounter(count => count + 1);

  //   const totalPrice = data * (counter + 1)
  //   console.log(totalPrice);
  // };


  // const decrease = (data) => {
  //   if (counter > 0) {
  //     setCounter(count => count - 1);
  //     const totalPrice2 = data * (counter - 1)
  //     console.log(totalPrice2);
  //   }
  // };
  // const reset = (data) => {
  //   setCounter(1)
  //   const totalPrice3 = data * counter
  //   console.log(totalPrice3);
  // }


  // const sendprice = (data) => {
  //   console.log("Total Price", data * items.price)
  // }


  // const clear = (data) =>{
  //   console.log(data);

  //   const filter = items.filter((ind=>ind.id !== data));
  //   setItems(filter)
  //   localStorage.setItem('cartitems',JSON.stringify(filter))
  //   console.log(filter);
  // }


  return (
    <>
      {/* <div>
        {
          items.length > 0 && items.map((datas) => {
            return (
              <div className='container'>
                <div className='row'>
                  <div className='test'>
                    <img src={datas.file[0]} style={{ width: "100px" }} />
                    <div className='test'>
                      <h5>{datas.productname}</h5>
                      <h2>{datas.price}</h2>
                    </div>
                  </div>
                  <div className="counter">
                    <span className="counter__output">{counter}</span>
                    <div className="btn__container">
                      <button className="control__btn" onClick={() => decrease(datas.price)}>-</button>
                      <button className="control__btn" onClick={() => increase(datas.price)}>+</button>
                      <button className="reset" onClick={reset}>Reset</button>
                    </div>
                  </div>
                </div>
              </div>
            )
          })
        }
      </div> */}



    </>
  )
}
