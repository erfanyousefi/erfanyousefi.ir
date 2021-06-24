 (function () {
   const elmHamburger = document.querySelector('.hamburger')
   elmHamburger.addEventListener('click', () => {

     elmHamburger.classList.toggle('is-opened-navi');
   });
 }());

 const baners = document.querySelectorAll(".baner");
 baners.forEach(baner => {
   baner.addEventListener("mouseenter", () => {
     baner.querySelector(".cover").classList.add("show-cover")
   })
   baner.addEventListener("mouseleave", () => {
     baner.querySelector(".cover").classList.remove("show-cover")
   })
 })
 window.addEventListener("scroll", () => {
   if (window.scrollY > 15) {
     document.querySelector("header").style.boxShadow = "5px 5px 10px #333"
   } else {
     document.querySelector("header").style.boxShadow = ""
   }

   if (window.scrollY > 350) {
     document.querySelector(".moveUp").style.display = "flex"
   } else {
     document.querySelector(".moveUp").style.display = "none"
   }
 })
 document.querySelector(".moveUp").addEventListener("click", () => {
   window.scrollTo({
     top : 0
   });
 })