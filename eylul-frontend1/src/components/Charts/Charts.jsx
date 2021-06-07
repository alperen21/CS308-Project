import React, {useState} from 'react'
import {Bar} from 'react-chartjs-2';
import './style.css'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Cookies from 'js-cookie'

const Charts = () => {

  const [expenses, setExpenses] = useState(0);
  const [revenue, setRevenue] = useState(0);
  const [profit, setProfit] = useState(0);
  
  const getCharts = async (e) => {
    e.preventDefault();
    let token_id = 0;
    let username = 0;

    try {
      token_id = await Cookies.get('token');
    } catch(e) {
      console.log(e);
    }

    try {
      username = await Cookies.get('userName'); 
    } catch(e) {
      console.log(e);
    }


  const response = await fetch('http://127.0.0.1:5000/stonks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        user: username,
        token: token_id,
      },
      body: JSON.stringify({
        start_date: startDate,
        end_date: endDate
      })
    })
    let json = await response.json();

    console.log(json);
    
    setExpenses(json.expenses);
    setProfit(json.profit);
    setRevenue(json.profit);
  }




  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
    return (
      <div class="d-flex flex-row card">
  <div class="p-2">
  <Bar
        data={{
          labels: ['Revenue', 'Cost', 'Profit'],
          datasets: [
            {
              label: 'Revenue',
              data: [revenue,expenses,profit ],
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(34,139,34, 0.2)'
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(34,139,34, 1)'
              ],
              borderWidth: 1,
            }
          ],
        }}
        height={400}
        width={600}
        options={{
          maintainAspectRatio: false,
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true,
                },
              },
            ],
          },
          legend: {
            labels: {
              fontSize: 25,
            },
          },
        }}
      />
  </div>
  <div class="p-2">
    
  <form>
  <div class="form-group">
    <label for="exampleInputEmail1">Start Date</label>
    <br/>
    <DatePicker 
    selected={startDate} 
    onChange={date => setStartDate(date)}
    dateFormat='yyyy-MM-dd'/>
    
  </div>
  <div class="form-group">
    <label for="exampleInputPassword1">End Date</label>
    <br/>
    <DatePicker 
    selected={endDate} 
    onChange={date => setEndDate(date)}
    dateFormat='yyyy-MM-dd'/>
  </div>
  <button type="submit" class="btn btn-primary" onClick={getCharts}>Get Charts</button>
</form>

  </div>
</div>

    )
}

export default Charts;

/* 
 */