import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from "axios";
import { useState } from 'react';
import { toast } from "react-hot-toast"
const BASE_URL = process.env.REACT_APP_BASE_URL

const SendMoney = () => {

  const navigate = useNavigate()
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const name = searchParams.get("name");
  const image = searchParams.get("image")
  const [amount, setAmount] = useState(0);

  console.log("id is", id)
  console.log("amount is", amount)

  const token = localStorage.getItem("token")
  console.log("token is", token)

  const transfer = async () => {
    try {
      console.log("transsaction sattr")
      if (amount === 0) {
        toast.error("Enter amount");
        return;
      }

      console.log("insuff start")
      // Fetch the user's account details to check balance
      const response = await axios.get(`${BASE_URL}/account/balance`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const userBalance = response.data.balance;
      console.log("userBalance is", userBalance)

      if (userBalance < amount) {
        toast.error("Insufficient balance");
        return;
      }

      // Proceed with the transfer if the balance is sufficient
      await axios.post(`${BASE_URL}/account/transaction`, {
        to: id,
        amount
      }, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token")
        }
      });

      toast.success("Transaction successful");
      navigate("/dashboard");
    } catch (error) {
      alert("Transaction failed");
    }
  };


  return <div class="flex justify-center h-screen bg-richblack-50">
    <div className="h-full flex flex-col justify-center">
      <div
        class="border h-min text-card-foreground max-w-md px-4 w-96 bg-white shadow-lg rounded-lg"
      >
        <div class="flex flex-col space-y-1.5 p-6">
          <h2 class="text-3xl font-bold text-center">Send Money</h2>
        </div>
        <div class="p-6">
          <div class="flex items-center space-x-4">
            <img
              src={image}
              alt={`profile-${name}`}
              className="aspect-square w-[60px] rounded-full object-cover"
            />
            <h3 class="text-2xl font-semibold">{name}</h3>
          </div>
          <div class="space-y-4">
            <div class="space-y-2">
              <label
                class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                for="amount"
              >
                Amount (in Rs)
              </label>
              <input
                onChange={(e) => {
                  setAmount(e.target.value);
                }}
                type="number"
                class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                id="amount"
                placeholder="Enter amount"
              />
            </div>
            <button onClick={transfer} class="justify-center rounded-md text-sm font-medium ring-offset-background transition-colors h-10 px-4 py-2 w-full bg-caribbeangreen-200 text-black">
              Initiate Transfer
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
}

export default SendMoney