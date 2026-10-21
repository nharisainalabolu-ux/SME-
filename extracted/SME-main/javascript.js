
    function validation(){
        
    let name=document.forms["signupForm"]["sname"].value;
    let rollno=document.forms["signupForm"]["srollno"].value;
    let email = document.forms["myform"]["email"].value;
    let password = document.forms["myform"]["password"].value;
    let confirm = document.forms["myform"]["confirm"].value;

    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            
            
            
             if(name==""&&rollno==""){
                alert("Name and rollno must be filled out");
                return false;
            }
            else if(name.length<2){
                alert("Password must contain at least 6 characters");
                return false;
            }
             else if (password != confirm) {
                alert("Passwords do not match");
                return false;
            }
            else {
                alert("Signup successful!");
                return true;
            }
        }

        
