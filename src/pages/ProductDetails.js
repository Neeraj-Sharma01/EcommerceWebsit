import React,{useEffect,useState} from 'react'
import Layout from '../components/Layout/Layout'
import axios from 'axios'
import { useParams } from 'react-router-dom'
const ProductDetails = () => {
  const params = useParams()
  const[product,setProduct] = useState({})
  const[relatedProduct,setRealtedProduct]= useState([])

  //initial get product
   useEffect(() => {
       if(params?.slug) getProduct()
   },[params?.slug])

  //get-product
  const getProduct = async () => {
    try {
      const{data} = await axios.get(`/api/v1/product/get-product/${params.slug}`)
      setProduct(data?.product)
      getSimilarProduct(data?.product._id,data?.product.category._id)
    } catch (error) {
      console.log(error);
    }
  }

  //get simillar product
  const getSimilarProduct = async(pid,cid) => {
    try {
      const {data} = await axios.get(`/api/v1/product/related-product/${pid}/${cid}`)
      setRealtedProduct(data?.products)
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <Layout>
        <h1>
        <div className='row container mt-2'>
          <div className='col-md-6'>
          <img src={`/api/v1/product/product-photo/${product._id}`} className="card-img-top" alt={product.name}
          height="350"
          width={"225px"} />
          </div>
          <div className='col-md-6'>
          <h1 className='text-center'>Product Details</h1>
           <h6>Name:{product.name}</h6>
           <h6>Description:{product.description}</h6>
           <h6>Price:{product.price}</h6>
           <h6>Category:{product.category?.name}</h6>
           <button className='btn btn-secondary ms-1'>Add To Cart</button>
          </div>
          <hr/>
          <div className='row container'>
           <h6>Simillar Product</h6>
           {relatedProduct.length < 1 && <p className='text-center'>No Similler Products found</p>} 
           <div className='d-flex flex-wrap'>
        {relatedProduct?.map((p) => (

                   <div className="card m-2" style={{width: '15rem'}} key={p._id}>
  <img src={`/api/v1/product/product-photo/${p._id}`} className="card-img-top" alt={p.name} />
  <div className="card-body">
    <h5 className="card-title">{p.name}</h5>
    <p className="card-text">{p.discription}...</p>
    <p className="card-text">₹{p.price}</p>
    
    <button className='btn btn-secondary ms-1'>Add to card</button>
  </div>
</div>

                ))}
        </div>
          </div>
        </div>
        </h1>
    </Layout>
  )
}

export default ProductDetails