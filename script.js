let interviewList = [];
let rejectedList = [];
let currentStatus = "all";

//all container section
const allCardSection = document.getElementById('allCard');
const mainContainer = document.querySelector('main');
const filterSection = document.getElementById('filter-section');

// count section 
const totalCount = document.getElementById('total');
const interviewCount = document.getElementById('interviewCount');
const rejectedCount = document.getElementById('rejectedCount');
const availableJobsCount = document.getElementById('jobsCount');

function calculateCounts(){
  // totalCount.innerText = allCardSection.children.length;
  const total = allCardSection.children.length;
  const interview = interviewList.length;
  const rejected = rejectedList.length;

  totalCount.innerText = total;
  interviewCount.innerText = interview;
  rejectedCount.innerText = rejected;

  let current = 0;

  if(currentStatus === "all-filter-btn"){
    current = total;
  }
  else if(currentStatus === "interview-filter-btn"){
    current = interview;
  }
  else if(currentStatus === "rejected-filter-btn"){
    current = rejected;
  }

  availableJobsCount.innerText = `${current} of ${total}`;
}

function updateCounts(){
  totalCount.innerText = allCardSection.children.length;
  availableJobsCount.innerText =  `${allCardSection.children.length} `;
}
updateCounts();


//all toggling btn section
const allFilterBtn = document.getElementById('all-filter-btn');
const interviewFilterBtn = document.getElementById('interview-filter-btn');
const rejectedFilterBtn = document.getElementById('rejected-filter-btn');

// toggle btn functionality
function toggleBtn(id){
//add
const buttons = [allFilterBtn, interviewFilterBtn, rejectedFilterBtn];
    
   buttons.forEach(btn => {
        btn.classList.remove('bg-linear-to-r', 'from-blue-500', 'to-purple-600', 'text-white');
        btn.classList.add('bg-white', 'text-black');
   });

    const selected = document.getElementById(id);
    selected.classList.add('bg-linear-to-r', 'from-blue-500', 'to-purple-600', 'text-white');
    selected.classList.remove('bg-white', 'text-black');

  if(id == 'interview-filter-btn'){
    allCardSection.classList.add('hidden');
    filterSection.classList.remove('hidden');
    renderInterview();
  }else if(id == 'all-filter-btn'){
    allCardSection.classList.remove('hidden');
    filterSection.classList.add('hidden');
  }else if(id == 'rejected-filter-btn'){
    allCardSection.classList.add('hidden');
    filterSection.classList.remove('hidden');
     renderRejected();
  }

  currentStatus = id; 
  calculateCounts();  
}

// event listener diye btn functoin korano
let jobs = [];
mainContainer.addEventListener('click', function (e) {
 
  const card = e.target.closest('.job-card');
  if (!card) return;

  // DELETE BUTTON
  if (e.target.closest('.delete-btn')) {

    const title = card.querySelector('.title').innerText;

    // Remove from interview & rejected arrays
    interviewList = interviewList.filter(item => item.title !== title);
    rejectedList = rejectedList.filter(item => item.title !== title);

    // Remove from DOM
    card.remove();

    calculateCounts();

    // Re-render 
    if(currentStatus === "interview-filter-btn"){
      renderInterview();
    }
    else if(currentStatus === "rejected-filter-btn"){
      renderRejected();
    }

    return;
  }

  // Determine type
  let type = null;

  if (e.target.classList.contains('interview-btn')) {
    type = "INTERVIEW";
  } 
  else if (e.target.classList.contains('rejected-btn')) {
    type = "REJECTED";
  }

  if (!type) return;

  updateStatus(card, type);
});

function updateStatus(card, type) {
  card.querySelector('.status').innerText = type;

  const title = card.querySelector('.title').innerText;

  // Remove from both lists first
  interviewList = interviewList.filter(item => item.title !== title);
  rejectedList = rejectedList.filter(item => item.title !== title);

  const cardInfo = {
    title,
    subtitle: card.querySelector('.subtitle').innerText,
    salary: card.querySelector('.salary').innerText,
    status: type,
    notes: card.querySelector('.notes').innerText
  };

  if (type === "INTERVIEW") {
    interviewList.push(cardInfo);
  } else {
    rejectedList.push(cardInfo);
  }
  calculateCounts();
 //auto re-render
  if(currentStatus === "interview-filter-btn"){
    renderInterview();
  }
  else if(currentStatus === "rejected-filter-btn"){
    renderRejected();
  }
}

//empty card show korano
function showEmptyCard(){
  filterSection.innerHTML = `
        <div class=" w-full mx-auto flex flex-col items-center justify-center p-10 rounded-xl mt-10 mb-20 bg-white text-center space-y-4 ">
           <img class=" flex items-center justify-center" src="jobs.png" alt="">
           <div>
            <h2 class="text-3xl opacity-60 font-semibold mb-2">No jobs available</h2>
            <p class="text-xl text-gray-400">Check back soon for new job opportunities</p>
           </div>
        </div>         
  `    
}

function renderInterview(){
  filterSection.innerHTML = '';

  if(interviewList.length === 0){
    showEmptyCard();
    return;
  }

  for(let interview of interviewList){
    console.log(interview);
    let div = document.createElement('div');
    div.className = "job-card flex flex-col md:flex-row gap-5 justify-between p-5 rounded-xl mb-8 bg-white border border-l-5 border-transparent shadow-sm transition-all duration-300 ease-in-out hover:border-blue-600 hover:-translate-y-1 hover:shadow-md"
    div.innerHTML = `
        <div class="left space-y-5">
          <!-- part-1 -->
           <div>
            <h2 class="title text-xl opacity-70 font-semibold">${interview.title}</h2>
            <p class="subtitle text-gray-400">React Native Developer</p>
           </div>
          <!--part-2  -->
           <div>
            <p class="salary text-gray-400">Remote • Full-time • $130,000 - $175,000</p>  
           </div>
           <!--part-3  -->
           <div>
            <p class="status bg-green-500 text-black opacity-70 rounded-md w-fit px-2 py-1 font-semibold mb-2 mt-2">${interview.status}</p>
            <p class="notes">Build cross-platform mobile applications using React Native. Work on products used by millions of users worldwide.</p>
           </div>
           <!--part-4  -->
           <div class="flex gap-3">
            <button class="interview-btn px-2 py-1 font-semibold border-2 border-green-300 text-green-400 hover:bg-green-700 rounded-md cursor-pointer">INTERVIEW</button>
           <button class="rejected-btn px-2 py-1 font-semibold border-2 border-red-300 text-red-400 hover:bg-red-700 rounded-md cursor-pointer">REJECTED</button>
           </div>
           
        </div>
        <div class="right">
          <button class="delete-btn bg-gray-100 p-2 rounded-full cursor-pointer"><i class="fa-regular fa-trash-can"></i></button>
        </div>
    `
    filterSection.appendChild(div);
  }
}

//rejectedList
function renderRejected(){ 
  filterSection.innerHTML = '';

   if(rejectedList.length === 0){
    showEmptyCard();
    return;
  }

  for(let rejected of rejectedList){
    console.log(rejected);
    let div = document.createElement('div');
    div.className = "job-card flex flex-col md:flex-row gap-5 justify-between p-5 rounded-xl mb-8 bg-white border border-l-5 border-transparent shadow-sm transition-all duration-300 ease-in-out hover:border-blue-600 hover:-translate-y-1 hover:shadow-md"
    div.innerHTML = `
        <div class="left space-y-5">
          <!-- part-1 -->
           <div>
            <h2 class="title text-xl opacity-70 font-semibold">${rejected.title}</h2>
            <p class="subtitle text-gray-400">React Native Developer</p>
           </div>
          <!--part-2  -->
           <div>
            <p class="salary text-gray-400">Remote • Full-time • $130,000 - $175,000</p>  
           </div>
           <!--part-3  -->
           <div>
            <p class="status bg-red-500 text-black opacity-70 rounded-md w-fit px-2 py-1 font-semibold mb-2 mt-2">${rejected.status}</p>
            <p class="notes">Build cross-platform mobile applications using React Native. Work on products used by millions of users worldwide.</p>
           </div>
           <!--part-4  -->
           <div class="flex gap-3">
            <button class="interview-btn px-2 py-1 font-semibold border-2 border-green-300 text-green-400 hover:bg-green-700 rounded-md cursor-pointer">INTERVIEW</button>
           <button class="rejected-btn px-2 py-1 font-semibold border-2 border-red-300 text-red-400 hover:bg-red-700 rounded-md cursor-pointer">REJECTED</button>
           </div>
           
        </div>
        <div class="right">
          <button class="delete-btn bg-gray-100 p-2 rounded-full cursor-pointer"><i class="fa-regular fa-trash-can"></i></button>
        </div>
    `
    filterSection.appendChild(div);
  }
}

