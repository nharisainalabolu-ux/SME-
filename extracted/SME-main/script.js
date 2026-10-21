function welcomemessage() {
    document.getElementById("para").innerHTML = "Welcome To Lamrin Tech Skill University";
}
function change(){
    document.getElementById("para").style.fontSize="35px"
    document.getElementById("para").style.color="rgb(123, 0, 0)"
}
function addparagraph(){
    const p = document.createElement('p');
    p.textContent = "Hello, I am a new paragraph!";
    p.setAttribute('id', 'p1');
    const papa = document.getElementById('container').appendChild(p);   
    document.getElementById('container').style.color="rgb(123, 0, 0)"
}
function removeParagraph() {
    const r = document.getElementById('p1');
    if (r) {
        r.remove();
    }
}
function toggleDiv() {
    const x = document.getElementById("container");
    if (x.style.display === "none") {
        x.style.display = "block";
        } else {
        x.style.display = "none";
    }
}
function age() {
    let age = prompt("Enter your age:");
    if (age <= 12) {
        document.getElementById("para").innerHTML = "You are a Child";
    } 
    else if (age <= 19) {
        document.getElementById("para").innerHTML = "You are a teenager";
    }
    else {
        document.getElementById("para").innerHTML = "You are an adult.";
    }
}
function numberchecker(){
    let y = prompt("Enter a number:");
    if (y > 0){
        document.getElementById("para").innerHTML = "The number is positive.";
    }
    else if (y < 0){
        document.getElementById("para").innerHTML = "The number is negative.";
    }
    else {
        document.getElementById("para").innerHTML = "The number is zero.";
    }
}
function evenodd(){
    let x = prompt("Enter a number:");
    if (x % 2 == 0){
        document.getElementById("para").innerHTML = "The number is even.";
    }
    else {
        document.getElementById("para").innerHTML = "The number is odd.";
    }
}
function daycheck(){
    let day = prompt("Enter a day of the week:");
    switch(day.toLowerCase()) {
        case "monday":
            document.getElementById("para").innerHTML = "Monday";
            break;
        case "tuesday":
            document.getElementById("para").innerHTML = "Tuesday";
            break;
        case "wednesday":
            document.getElementById("para").innerHTML = "Wednesday";
            break;
        case "thursday":
            document.getElementById("para").innerHTML = "Thursday";
            break;
        case "firday":
            document.getElementById("para").innerHTML = "Friday";
            break;
        case "saturday":
            document.getElementById("para").innerHTML = "Saturday";
            break;
        default:
            document.getElementById("para").innerHTML = "Invalid day";
    }
}
function calcs(){
    let x = Number(prompt("Enter a number"));
    let z = prompt("Select any 1 of them + , - , / , *");
    let y = Number(prompt("Enter a number"));
    if( z == "+"){
        document.getElementById("para").innerHTML = x + y;
    }
    else if(z == "-"){
        document.getElementById("para").innerHTML = x - y;
    }
    else if(z == "/"){
        document.getElementById("para").innerHTML = x / y;
    }
    else if(z == "*"){
        document.getElementById("para").innerHTML = x * y;
    }
    else{
        document.getElementById("para").innerHTML = "invalid operator";
    }
}
function loop(){
    let n = 3;
    let t = "";
    for(let i = 1; i <= 10; i++){
        t += n+" * " +i+" = "+ (n*i) + "<br>";
    }
    document.getElementById("num").innerHTML = t;
}
function factorial(){
    let x = Number(prompt("Enter a number"));
    let y = 1;
    for(let i = 1; i <= x; i++){
        y = y * i;
    }
    document.getElementById("num").innerHTML = "factorial : "+ y;
}
function fibonacci(){
    let n = Number(prompt("Enter the numbers"));
    let a = 0, b = 1;
    let result = "";
    for(let i = 1; i <= n; i++){
        result += a + " ";
        let c = a + b;
        a = b;
        b = c;
    }
    document.getElementById("num").innerHTML = result ;
}
function sum(){
    let total = 0;
    for(let i = 1; i <= 100; i++){
        total = total + i;
    }
    document.getElementById("num").innerHTML = "Sum :"+ total;
}
function evenadd(){
    let sum = 0;
    for(let i = 2; i <= 50; i += 2){
        sum = sum + i;
    }
    document.getElementById("num").innerHTML = "Sum of even numbers :"+ sum;
}
function oddeven(){
    for (let i = 1; i <= 100; i++) {
        if (i % 2 == 0) {
            document.write("Even no: " + i + "<br>");
        }
        else {
            document.write("Odd no: " + i + "<br>");
        }
    }
}
function calculateGrade() {
    let name = document.getElementById("name").value;
    let roll = document.getElementById("roll").value;

    let m1 = Number(document.getElementById("m1").value);
    let m2 = Number(document.getElementById("m2").value);
    let m3 = Number(document.getElementById("m3").value);
    let m4 = Number(document.getElementById("m4").value);
    let m5 = Number(document.getElementById("m5").value);

    let total = m1 + m2 + m3 + m4 + m5;
    let percentage = (total / 500) * 100;
    let grade;

            if (percentage >= 80) {
        grade = "A";
            }
            else if (percentage >= 60) {
        grade = "B";
            }
            else if (percentage >= 40) {
        grade = "C";
            }
            else {
        grade = "F";
            }

            document.getElementById("result").innerHTML =
        "Student Details:<br>" +
        "Name: " + name + "<br>" +
        "Roll No: " + roll + "<br>" +
        "Total Marks: " + total + "/500<br>" +
        "Percentage: " + percentage + "%<br>" +
       "Grade: " + grade;
}

function cars(){
    const car = [];
    for(let i = 0; i < 100;  i++){
    console.log("car "+ i);
    }
}