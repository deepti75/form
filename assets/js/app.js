 let cl = console.log;

const stdInfoForm = document.getElementById('stdInfoForm');
const fname = document.getElementById('fname');
const lname = document.getElementById('lname');
const email = document.getElementById('email');
const contact = document.getElementById('contact');
const stdData = document.getElementById('stdData');
const submitbtn = document.getElementById('submitbtn');
const updateBtn = document.getElementById('updateBtn');

let stdArray=[];
if(localStorage.getItem('setstdInfo')){
  stdArray = JSON.parse(localStorage.getItem('setstdInfo'));
}

function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);

  });
}
function templeting(arr){
  let result ="";
  arr.forEach((ele, i)=>{
    result +=`
       <tr>
           <td>${i + 1}</td>
           <td>${ele.getfname}</td>
           <td>${ele.getlname}</td>
           <td>${ele.getEmail}</td>
           <td>${ele.getContact}</td>
           <td>
              <button class="btn btn-success" data-id="${ele.id}" onclick="onEditHabndler(this)">Edit</button>
           </td>
           <td>
           <button class="btn btn-danger" data-id="${ele.id}" onclick="onDeleteHabndler(this)">Delete</button>
           </td>
       </tr>
    `
  });
  stdData.innerHTML = result;
}

templeting(stdArray)
function onsubmitHandler(eve){
  eve.preventDefault();
  // cl(eve);
  let obj = {
    getfname : fname.value,
    getlname : lname.value,
    getEmail : email.value,
    getContact : email.value,
    id : uuidv4(),
  }
  cl(obj);
  stdArray.push(obj);
  // localStorage.setItem('setstdInfo',JSON.stringify(stdArray));
  setlocalData(stdArray)
  stdInfoForm.reset();
  templeting(stdArray)

}

const onEditHabndler = (ele) =>{
  updateBtn.classList.remove('d-none');
  submitbtn.classList.add('d-none');
  let getId = ele.getAttribute("data-id");
  localStorage.setItem('setId', getId);
  let getData = getLocalData();
  let getObj = getData.find(ele  =>{
    return ele.id === getId;
  });
  cl(getObj)
  fname.value = getObj.getfname;
  lname.value = getObj.getlname;
  email.value = getObj.getEmail;
  contact.value = getObj.getContact;
}

const onDeleteHabndler = (eve) =>{
  // cl("edit")
  let getId = eve.getAttribute('data-id');
  // cl(getId)
  let getData = getLocalData();
  let newData = getData.filter(ele =>{
    return ele.id != getId;
  });
  // localStorage.setItem('setstdInfo',JSON.stringify(newData));
  setlocalData(newData)
  templeting(newData)
}
const onUpdateHandler = (eve) =>{
  // cl(eve.target)
  let getId = localStorage.getItem('setId');
  // cl(getId)
  let getData =getLocalData();
  getData.forEach(e =>{
    if(e.id === getId){
      e.getfname = fname.value;
      e.getlname = lname.value;
      e.getEmail = email.value;
      e.getContact = contact.value;
    }
  });
  // localStorage.setItem('setstdInfo',JSON.stringify(getData));
  setlocalData(getData)
  templeting(getData);
  updateBtn.classList.add('d-none');
  submitbtn.classList.remove('d-none');
  stdInfoForm.reset();
}

function getLocalData(){
  return JSON.parse(localStorage.getItem("setstdInfo"));
}

function setlocalData(arr){
  return  localStorage.setItem('setstdInfo',JSON.stringify(arr))
}
stdInfoForm.addEventListener('submit', onsubmitHandler)

updateBtn.addEventListener('click', onUpdateHandler)
