const socket=io();
const bottom=document.querySelector('.bottom');
const outer=document.querySelector('.outer-container');
const joinbtn=document.querySelector('.btn-join');
const exitbtn=document.querySelector('.btn-exit');
const create_room=document.querySelector('.btn-create');
const waytogo=document.querySelector('.go_button');
const sendbtn=document.querySelector('.btn-send');
const message=document.querySelector('.message-box');
const msgindividual=document.querySelector('.messages-in');
const name=document.querySelector('.username');
const homepage=document.querySelector('.home-page');
const chat=document.querySelector('.chat-page');
const room=document.querySelector('.roomcondition');
const jroom=document.querySelector('.join_a_room');
const rcode=document.querySelector('.code');


const roomid=['A1','A2'];
let uname;

function display(msg,position){
    const element = document.createElement("div");
    element.innerText=msg;
    const currentDiv=document.querySelector(".messages-in");
    element.classList.add(position);
    currentDiv.appendChild(element);
};

message.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        document.querySelector('.btn-send').click();
    }
});

joinbtn.addEventListener("click",function(){
    if(name.value===""){
        return;
    }
    uname=name.value;
    homepage.classList.add("hidden");
    room.classList.remove("hidden");
    name.value=''; 
    outer.scrollTop = outer.scrollHeight;
    // used in future so keep a check maybe try to have value of name in another value and use it for remaining code or figure out any other way
});

create_room.addEventListener("click",function(){
    room.classList.add("hidden");
    chat.classList.remove("hidden");
    msgindividual.classList.remove("hidden");
    socket.emit('new-user-joined',uname);
    socket.on('joined',(name)=>{
        //Display message tht new user has joined
        display(`${name} has joined the conversation`,'other');
    });
    outer.style.height="71.5vh";
    outer.style.marginBottom="80px";
    bottom.classList.remove("hidden");
});

waytogo.addEventListener("click",function(){
    if(rcode.value==roomid[0]){
        console.log(`You entered ${room.value}`);
        jroom.classList.add('hidden');
        chat.classList.remove('hidden');
        bottom.classList.remove("hidden");
        socket.emit('new-user-joined',uname);
        // outer.scrollTop = outer.scrollHeight;
        socket.on('joined',(name)=>{
        //Display message tht new user has joined
        display(`${name} has joined the conversation`,'other');
        // outer.scrollTop = outer.scrollHeight;
        });
    }
    else{
        alert("Enter valid code");
    }
    outer.scrollTop = outer.scrollHeight;
    outer.style.height="71.5vh";
    outer.style.marginBottom="80px";
});

exitbtn.addEventListener("click",function(){
    chat.classList.add("hidden");
    homepage.classList.remove("hidden");
    msgindividual.classList.add("hidden");
    bottom.classList.add("hidden");
    socket.emit('user-exited');
    outer.style.height="80vh";
    outer.style.marginBottom="20px";
    outer.scrollTop = outer.scrollHeight;
});

socket.on('leave',(idname)=>{
  //username has left the conversation
  display(`${idname} has left the conversation`,'other');
  outer.scrollTop = outer.scrollHeight;
});

socket.on('recieve',data=>{
  // Display the message along with username
  display(`${data.name} : ${data.message}`,'other');
  outer.scrollTop = outer.scrollHeight;
});

sendbtn.addEventListener("click",function(){
    if(message.value===""){
        return;
    }
    //Sockets part
    const messageInput=message.value;
    display(`You : ${messageInput}`,'self');
    outer.scrollTop = outer.scrollHeight;
    socket.emit('send',messageInput);
    message.value='';
});
