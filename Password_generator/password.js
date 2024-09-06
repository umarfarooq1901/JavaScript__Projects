let show_password = document.querySelector(".show-password");
const generator_btn = document.querySelector(".generator-btn");

let upper_pass = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let lower_pass = "abcdefghijklmnopqrstuvwxyz";
let number_pass = "0123456789";
let symbol_pass = "!@#$%&*()-_+={}[]|<>?/~`^,";
let mixture_pass = upper_pass + lower_pass + number_pass + symbol_pass;

function generate() {
  let pass_store = "";

  for (let i = 0; i < 10; i++) {
    pass_store += mixture_pass[Math.round(Math.random() * mixture_pass.length)];
  }

  show_password.innerText = `Your Password is: ${pass_store}`;
}

generator_btn.addEventListener("click", function () {
    generate();

  },false);
