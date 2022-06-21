const express = require('express');

const app = express()
const port = 8000

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
})

// set view engine
app.set('view engine', 'hbs') 

//directory(save data static)
app.use('/assets', express.static(__dirname + '/assets')) 
app.use(express.urlencoded({extended:false}))

//conditionall
let isLogin = true

//directory for data
let dataProject = [{

  title:'try to figur out about data ',
  startDate:'',
  endDate:'',
  description:'i have bad problem for figur this out, on first day. because i dont make  data mapping so this make it become harder than i thought.so this make me learn  ',
  js:'fa-brands fa-js',
  php:'fa-brands fa-php',
  java:'fa-brands fa-java',
  react:'fa-brands fa-react',
  duration:'4 month',
  file:'',
  isLogin,
}]



// ===========get===============

//render home page
app.get('/', (request, response) => {
  console.log(dataProject);
  let data = dataProject.map(function (items) {
    return {
        ...items,
        isLogin,
        startDate: getFullTime (new Date(items.startDate)),
        endDate: getFullTime (new Date(items.endDate)),duration: getDistanceTime(new Date(items.startDate), new Date(items.endDate)),
    };
  });

  response.render('index',{ isLogin, indexx : data});
})


app.get('/project', (request, response) =>{
  response.render("project"); 
})





app.get('/contact', (request, response) =>{
  response.render("contact"); 
})


app.get("/edit-blog/:index", (request, response)=>{


  let index = request.params.index;

  let edit = dataProject[index]

  let data = dataProject.map(function (items) {
    return {
        ...items,
        isLogin,
        startDate: getFullTime (new Date(items.startDate)),
        endDate: getFullTime (new Date(items.endDate)),duration: getDistanceTime(new Date(items.startDate), new Date(items.endDate)),
    };
  });

  
  console.log('edit', edit);

  response.render('edit-blog',{ isLogin , edit, data, id : index });
  
}) 


// delete blog in /index
app.get('/delete-blog/:index',(request, response) =>{

  let index = request.params.index
  dataProject.splice(index, 1 )
  response.redirect('/')
})

//render index in blog
app.get('/blog/:index',(request,response) => {
  let index =request.params.index

  let projectss = dataProject[index]
  response.render('blog',projectss)  
})

// ===========post=========

// input data-> html(body) -->js
app.post('/project', (request, response) =>{
  // console.log(request.body);
  let data = request.body;

  data = {
    title: data.inputTitle,
    startDate: data.inputStartDate,
    endDate: data.inputEndDate,
    description:data.inputDescription,
    js:data.js,
    php:data.php,
    java:data.java,
    react:data.react,
    file:data.inputFile,
    duration: getDistanceTime(
      new Date(data.inputStartDate), 
      new Date(data.inputEndDate)),
    
  };

  // console.log(data);
  dataProject.push(data);
  // console.log(dataProject);
  response.redirect('/')
})



//update data
app.post('/edit-blog/:index', (request, response) =>{
  let data = request.body;
  let index = request.params.index
  data = {
    title:data.inputTitle,
    startDate:getFullTime(new Date(data.inputStartDate)),
    endDate:getFullTime (new Date(data.inputEndDate)),
    description:data.inputDescription,
    js:data.js,
    php:data.php,
    java:data.java,
    react:data.react,
    file:data.inputFile,
    duration: getDistanceTime(
      new Date(data.inputStartDate),
      new Date(data.inputEndDate)),
  };

dataProject[index] = data;

response.redirect("/")
})






// render blog
// app.get('/blog', (request, response) =>{
//   response.render("blog",{ blogs : dataProject}); 
// })





// date funciton
function getFullTime( waktu) {
  let month = [
      "Januari",
      "Febuari",
      "Maret",
      "April",
      "Mei",
      "Juni",
      "Juli",
      "Agustus",
      "September",
      "Oktober",
      "November",
      "Desember",
  ];

  let date = waktu.getDate();
  let monthIndex = waktu.getMonth();
  let year = waktu.getFullYear();

  let fullTime = `${date} ${month[monthIndex]} ${year}`;
  return fullTime;
}

function getDistanceTime(startDate, endDate) {
  let start = startDate ;
  let end = endDate ;
  
  let duration = end.getTime() - start.getTime();
  let day = Math.round(duration / (1000 * 3600 * 24));
  let month = Math.round(day / 30);
  duration = month <= 0 ? day + " day" : month + " month";

  if (start > end) {
      alert("check Your Date");
  } else if (start < end) {
      return `${duration} `;
  }
}