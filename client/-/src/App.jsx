import { useState } from 'react'
import PaymentGateway from './components/PaymentGateway';

import './App.css'

function App() {
  const [selectedPlan, setSelectedPlan] = useState(null);

  const plans = [
    {
      id: 'free',
      name: 'Free Plan',
      price: 0,
      tweetsLimit: 1,
      description: 'Get started with 1 tweet per month.',
    },
    {
      id: 'bronze',
      name: 'Bronze Plan',
      price: 100,
      tweetsLimit: 5,
      description: 'Upgrade to post 5 tweets per month.',
    },
    {
      id: 'gold',
      name: 'Gold Plan',
      price: 300,
      tweetsLimit: 'Unlimited',
      description: 'Unlock unlimited tweets per month.',
    },
  ];


  const handlePlanSelect = (planId) => {
    setSelectedPlan(planId);
  };

  const handlePayment = () => {
    // Implement payment gateway integration (Stripe/Razorpay)
    alert('Redirecting to payment gateway...');
  };




  const paymentHandler=async(event)=>{ 
    const amount=500;
    const currency="INR";
    const reciptId="1234567890";
  const  response= await fetch("http://localhost:5000/order",{
    method :"POST",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify({
      amount,
      currency,
       receipt:reciptId
    })

  })
  const order=await response.json();
  console.log("order",order);


 var option={
  key:"",
  amount,
  currency,
  name:"Web codder",
  description:"test Transaction",
  image:"https://i.ibb.co/5Y3m33n/test.png"
,
order_id:order.id,
handler:async function (response){
  const body={...response}
  const validateResponse= await fetch("http://localhost:5000/validate",{
    method:"POST",
    headers:{
      'Content-type':"application/json"
    },
    body:JSON.stringify(body)

  })
  const jsonResponse=await validateResponse.json();
  console.log("jsonresponse",jsonResponse);
},
prefill:{
  name:"Sameena shaikh",
  email:"webcoder@example",
  contact:"9000000000",
},
notes:{
  address:"Razorpay Corporate office",
},
theme:{
  address:"#3399cc",

}
 }
  var rzp1=new Razorpay(option);
  rzp1.on("payment failed", function(response){
    alert(response.error.code);
    alert(response.error.description);
    alert(response.error.source);
    alert(response.error.step);
    alert(response.error.reason);
    alert(response.error.metadata.order_id);
    alert(response.error.metadata.payment_id);
  })
  rzp1.open();
  event.preventDefault();
}
 

  return (
    <>
 <div className="app">
      <header className="app-header">
        <h1>Timed Payment Service</h1>
      </header>
      <main>
        <PaymentGateway />
      </main>
    </div>

 <div className='min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-4xl mx-auto'>
        <h1 className='text-4xl font-bold text-center text-gray-900 mb-8'>
          Choose Your Plan
        </h1>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`bg-white p-8 rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105 ${selectedPlan === plan.id ? 'border-2 border-blue-500' : ''}`}
              onClick={() => handlePlanSelect(plan.id)}
            >
              <h2 className='text-2xl font-semibold text-gray-900 mb-4'>{plan.name}</h2>
              <p className='text-gray-600 mb-4'>{plan.description}</p>
              <p className='text-4xl font-bold text-gray-900 mb-6'>₹{plan.price}/mo</p>
              <button
                onClick={handlePayment}
                className='w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors duration-300'
              >
                Subscribe Now
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>




    <div className='pro duct'>
      <h1> Razorpay Payment Getway</h1>
      <button className='button' onClick={paymentHandler}>Pay Now</button>
    </div>
    </>
  )
}

export default App ;
