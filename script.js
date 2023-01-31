
  window.addEventListener("resize", function() {
    if (window.innerWidth < 768) {
      if(document.querySelector(".navbar").classList.contains('bg-transparent')){
        document.querySelector(".navbar").classList.remove("position-absolute");
        document.querySelector(".navbar").classList.remove("bg-transparent");
        document.querySelector(".navbar").classList.add("bg-dark");
      }
      
      
    } else {
        if(document.querySelector(".navbar").classList.contains('bg-dark')){
            document.querySelector(".navbar").classList.add("position-absolute");
            document.querySelector(".navbar").classList.remove("bg-dark");
            document.querySelector(".navbar").classList.add("bg-transparent");
        }
    }
  });

  if (window.matchMedia("(max-width: 768px)").matches) {
    if(document.querySelector(".navbar").classList.contains('bg-transparent')){
        document.querySelector(".navbar").classList.remove("position-absolute");
        document.querySelector(".navbar").classList.remove("bg-transparent");
        document.querySelector(".navbar").classList.add("bg-dark");
      }
  }