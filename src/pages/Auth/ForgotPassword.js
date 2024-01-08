import React,{useState} from 'react'
import Layout from '../../components/Layout/Layout'
import axios from 'axios'
import  {useNavigate} from 'react-router-dom'
import toast from 'react-hot-toast'

const ForgotPassword = () => {
    const[email,setEmail] = useState("");
    const[newpassword,setNewPassword] = useState("");
    const[answer,setAnswer] = useState("");

    const navigate = useNavigate();

    const handlesubmit = async(e) => {
        e.preventDefault();
        try {
          const res = await axios.post('/api/v1/auth/forgot-password',{email,newpassword,answer});
          if(res.data.success)
          {
            toast.success(res.data & res.data.message)
            navigate('/login');
          }else{
            toast.error(res.data.message);
          }
        } catch (error) {
          console.log(error);
          toast.error("Something Went Wrong")
        }
    }
    
  return (
    <Layout title={'Forgot Password - Ecommerce App'}>
<div className='register'>
        <h1>Reset Password</h1>
       <form onSubmit={handlesubmit}>
      
  <div className="mb-3">
    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}  className="form-control" id="exampleInputEmail1" placeholder='Enter Your Email' required />
  </div>

  <div className="mb-3">
    <input type="text" value={answer} onChange={(e) => setAnswer(e.target.value)}  className="form-control" id="exampleInputEmail1" placeholder='Enter Your Favorite Sport Name' />
  </div>
  
 
  <div className="mb-3">
    <input type="password" value={newpassword} onChange={(e) => setNewPassword(e.target.value)} className="form-control" id="exampleInputPassword1" placeholder='Enter Your Password' required />
  </div>

  <button type="submit" className="btn btn-primary">Reset</button>
</form>

    </div>
    </Layout>
  )
}

export default ForgotPassword