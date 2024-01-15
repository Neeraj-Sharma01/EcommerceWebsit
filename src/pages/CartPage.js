import React from 'react'
import Layout from '../components/Layout/Layout'
import { useCart } from '../context/cart'
import { useAuth } from '../context/auth'
import { useNavigate } from 'react-router-dom'
const CartPage = () => {
  const[auth,setAuth] = useAuth()
  const[cart,setCart] = useCart()
  const navigate = useNavigate()

  //delte Item
  const removecartItem = (pid) => {
    try {
      let myCart = [...cart]
      let index = myCart.findIndex(item => item._id === pid)
      myCart.splice(index,1)
      setCart(myCart)
    } catch (error) {
      console.log(error);
    }
  }


  return (
    <Layout>
    <div className='container'>
    <div className='row'>
    <div className='col-md-12'>
       <h1 className='text-center bg-light p-2 mb-1'>
        {`Hello ${auth?.token && auth?.user?.name}`}
       </h1>
       <h4 className='text-center'>
        {cart?.length >= 1 ? `You have ${cart.length} items in Cart ${auth?.token ? "" : "Please Login to checkOut"}`: "Your Cart Is Empty"}
       </h4>
    </div>
    <div className='row'>
      <div className='col-md-8'>
        {cart?.map((p) => (
          <div className='row mb-2 p-3 card flex-row'>
             <div className='col-md-4'>
             <img src={`/api/v1/product/product-photo/${p._id}`} className="card-img-top" alt={p.name} width={"105px"} height={"100px"}/>
             </div>
             <div className='col-md-8'>
             <p>{p.name}</p>
             <p>{p.description.substring(0,30)}</p>
             <p>Price:₹{p.price}</p>
             <button className='btn btn-danger' onClick={() => removecartItem(p.id)}>Remove</button>
             </div>
          </div>
        ))}
      </div>
      <div className='col-md-4'>
      Checkout|Payment
      </div>
    </div>
    </div>
    </div>
    </Layout>
  )
}

export default CartPage