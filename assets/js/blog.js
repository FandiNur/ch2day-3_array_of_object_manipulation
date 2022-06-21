
// save data
let dataProject = []; 

console.log(dataProject);

//attach project
function addProject(event) {
  // fot net refresh
  event.preventDefault();
  let title = document.getElementById("input-title").value;
  let content = document.getElementById("input-description").value;
  let startdate = document.getElementById("startDate").value;
  let enddate = document.getElementById("endDate").value;
  let image = document.getElementById("input-image").files;
  let technologies1 = document.getElementById('input-js').checked;
  let technologies2 = document.getElementById('input-java').checked;
  let technologies3 = document.getElementById('input-react').checked;
  let technologies4 = document.getElementById('input-php').checked;

  // make url from image
  image = URL.createObjectURL(image[0]);

  //duration month
  let duration = getDuration(startdate, enddate);

  // alert
  if (title == '') {
    return alert("check your title") 
  } else if (content == '') { 
    return alert("check your description") 
  } else if (image == '') { 
    return alert("check your image")
  }

  let blog = {
    title,
    content,
    startdate,
    duration,
    enddate,
    technologies1,
    technologies2,
    technologies3,
    technologies4,
    image,
  };
  dataProject.push(blog);
  console.log(dataProject);
  renderBlog()
}

// render project
function renderBlog() {
  document.getElementById('contents').innerHTML = ''

  for(let data = 0; data < dataProject.length; data++){

    document.getElementById('contents').innerHTML +=
    `
    <div class="js-page">
            <div class="js-button">
              <button class="btn-edit">Edit Post</button>
              <button class="btn-post">Post Blog</button>
            </div>
          <div class="js-head">
              <h1>
                <a href="blog-detail.html" target="_blank"
                >${dataProject[data].title}</a>
              </h1>
            </div>
            
            <div class="js-image">
              <img class="image1" src="${dataProject[data].image}" alt="" />
            </div>
                
                <div class="checkboxx">
                  <p> ${dataProject[data].technologies1? `<i class="fa-brands fa-js-square"></i>`:""} </p>
                  <p> ${dataProject[data].technologies2? `<i class="fa-brands fa-java"></i>`:""} </p>
                  <p> ${dataProject[data].technologies3? `<i class="fa-brands fa-react"></i>`:""} </p>
                  <p> ${dataProject[data].technologies4? `<i class="fa-brands fa-php"></i>`:""} </p>
                </div>
                <div class="js-content">
                  <p>${dataProject[data].content}</p>
                </div>
                <div class="js-duration">
              <p class="content-duration">
              ${dataProject[data].duration} month
              </p>
            </div>
          </div
    </div>
    `
  }
}


//date
function getDuration (startDate, endDate) {
  let start = new Date(startDate);
  let end = new Date(endDate);
  let duration = end.getTime() - start.getTime();
  let month = Math.round(duration / (1000 * 3600 * 24 * 30));
  
  if (month <1){
      return "-1 month"
  }
  else{
      return month;
  }
}