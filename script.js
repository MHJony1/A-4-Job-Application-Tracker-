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

