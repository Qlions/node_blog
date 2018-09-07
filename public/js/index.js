
function cambiar_login() {
  document.querySelector('.cont_forms').className = "cont_forms cont_forms_active_login";  
document.querySelector('.cont_form_login').style.display = "block";
document.querySelector('.cont_form_sign_up').style.opacity = "0";               

setTimeout(function(){  document.querySelector('.cont_form_login').style.opacity = "1"; },400);  
  
setTimeout(function(){    
document.querySelector('.cont_form_sign_up').style.display = "none";
},200);  
   $("#username").val("");
   $("#password").val("");

  }

function cambiar_sign_up(at) {
  document.querySelector('.cont_forms').className = "cont_forms cont_forms_active_sign_up";
  document.querySelector('.cont_form_sign_up').style.display = "block";
document.querySelector('.cont_form_login').style.opacity = "0";
  
setTimeout(function(){  document.querySelector('.cont_form_sign_up').style.opacity = "1";
},100);  

setTimeout(function(){   document.querySelector('.cont_form_login').style.display = "none";
},400);  

  $("#reg_username").val("");
  $("#reg_password").val("");
  $("#re_password").val("");
}    



function ocultar_login_sign_up() {

document.querySelector('.cont_forms').className = "cont_forms";  
document.querySelector('.cont_form_sign_up').style.opacity = "0";               
document.querySelector('.cont_form_login').style.opacity = "0"; 

setTimeout(function(){
document.querySelector('.cont_form_sign_up').style.display = "none";
document.querySelector('.cont_form_login').style.display = "none";
},500);  
  
  }



  $(function (){

    if(document.cookie.indexOf("_id") != "-1"){
      window.location.pathname = "/";
    }
    // 登录
     $("#login_btn").click(()=>{
      let $username = $("#username").val();
      let $password = $("#password").val();
      if($username == "" || $password == ""){
        $("#login_waring").val("用户名密码不能为空")
        return;
      }
      $.ajax({
        url: "/api/user/login",
        type: "post",
        data:{
          username: $username,
          password: $password
        },
        datatype: "json",
        success(data){
          console.log(data)
          if(data.code == 1){
            $("#login_waring").val(data.message)
          }else{
            window.location.pathname = "/";
          }
        }
      })
     })

    //  注册
    $("#register_btn").click(()=>{
      let $username = $("#reg_username").val();
      let $password = $("#reg_password").val();
      let $repassword = $("#re_password").val();
      // 用户名是否为空
      if($username == ""){
        $("#sign_waring").html("用户名不能为空")
        return;
      }
      // 密码不能为空
      if($password == ""){
        $("#sign_waring").html("密码不能为空");
          return;
      }
      // 二次输入密码不能为空
      if($repassword != $password){
          $("#sign_waring").html("两次密码输入的不一致")
          return;
      }
      $.ajax({
        url: "/api/user/register",
        type: "post",
        data:{
          username: $username,
          password: $password,
          repassword: $repassword
        },
        success: function(data) {
          console.log(data)
          $("#sign_waring").html(data.message)
          if(data.code == "OK"){
            setTimeout(()=>{
              cambiar_login();
            }, 1500)
            

          }
        }
      })
     })

   
  })