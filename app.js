
// Create a new date instance dynamically with JS
let d = new Date();
let newDate =   d.getDate() + '/' + (d.getMonth()+1) + '/' + d.getFullYear();

/* Global Variables */

//url to retrieve information from weather app
const baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';
 // API key to get the tempreture in celsius
const apiKey = '&appid=94d6cb2c2b3a236e2b93d14fd3664aa6&units=metric';

 
// callback function for EventListner
const performAction = (e) => {

  const Zip = document.getElementById('zip').value;
  
  const Feelings = document.getElementById('feelings').value;
  

  getAPIinfo(baseURL, Zip, apiKey)
    .then(function (data) {
      //post data
      postData('/add', {
        temp: data.main.temp,
        date: newDate,
        content: Feelings
      })
      .then(() => { updateUI() } )
    })
    
    }
    //get api data
const getAPIinfo = async (baseURL, zip, apiKey) => {
        
  const res = await fetch(baseURL + zip + apiKey);
    
      try {
        const data = await res.json();
        console.log(data);
        return data;
        
      }  catch(error) {
        // appropriately handle the error
        console.log("error", error);
      }
    }
   
    /* retrive collecting data to the server side 
    with POST request*/
    
    const postData = async(url = '', data = {}) => {
      const res = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
  
        },
        body: JSON.stringify( 
          {
          date: data.date,
          temp: data.temp,
          content: data.content,
          
          }
        ) // body data type must match "Content-Type" header
      });
      try {
        const newData = await res.json();

          return newData;
      } catch(error) {
        console.log("error", error);
        // appropriately handle the error
      }
  }

  //update ui :
const updateUI = async() => {
  const req = await fetch('/all');
  try {
    const allData = await req.json();
    console.log(allData);
    document.getElementById('date').innerHTML = `date:${allData.date}`;
      document.getElementById('temp').innerHTML = `Temperature: ${allData.temp}`;
    document.getElementById('content').innerHTML = `I feel ${allData.content}`;
      
  } catch(error) {
    console.log("error", error);
    // appropriately handle the error
  }
}
    

// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', performAction);


