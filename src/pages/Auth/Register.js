import React,{useState} from 'react'
import Layout from '../../components/Layout/Layout'
import axios from 'axios'
import  {useNavigate} from 'react-router-dom'
import toast from 'react-hot-toast'


const Register = () => {
    const[name,setName] = useState("");
    const[email,setEmail] = useState("");
    const[phone,setPhone] = useState("");
    const[address,setAddress] = useState("");
    const[password,setPassword] = useState("");
    const[answer,setAnswer] = useState("");

    const navigate = useNavigate();

    const handlesubmit = async(e) => {
        e.preventDefault();
        try {
          const res = await axios.post('/api/v1/auth/register',{name,email,password,phone,address,answer});
          if(res.data.success)
          {
            toast.success(res.data & res.data.message);
            navigate('/home');
          }else{
            toast.error(res.data.message);
          }
        } catch (error) {
          console.log(error);
          toast.error("Something Went Wrong")
        }
    }

  return (
    <Layout>
    <div className='register'>
        <h1>RegisterPage</h1>
       <form onSubmit={handlesubmit}>
       <div className="mb-3">
    <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="form-control" id="exampleInputEmail1" placeholder='Enter Your Name' aria-describedby="emailHelp" required />
  </div>
  <div className="mb-3">
    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}  className="form-control" id="exampleInputEmail1" placeholder='Enter Your Email'required />
  </div>
  <div className="mb-3">
    <input type="number" value={phone} onChange={(e) => setPhone(e.target.value)} className="form-control" id="exampleInputEmail1" placeholder='Enter Your MobileNo.' required />
  </div>
  <div className="mb-3">
    <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} className="form-control" id="exampleInputEmail1" placeholder='Enter Your Address' required />
  </div>
  <div className="mb-3">
    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" id="exampleInputPassword1" placeholder='Enter Your Password' required />
  </div>
  <div className="mb-3">
    <input type="text" value={answer} onChange={(e) => setAnswer(e.target.value)} className="form-control" id="exampleInputPassword1" placeholder='What Is Your Favorite Sport' required />
  </div>
  
  <button type="submit" className="btn btn-primary">Submit</button>
</form>

    </div>
    </Layout>
  )
}

export default Register