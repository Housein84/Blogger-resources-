
document.addEventListener("DOMContentLoaded", function(){
  let currentUtterance = null;

  document.querySelectorAll(".btn-speaker").forEach(function(button) {
    button.setAttribute("aria-label", "play/stop");
    
    button.addEventListener("click", function(){
      const text = this.getAttribute("data-text");
      
      if (currentUtterance && speechSynthesis.speaking) {
        speechSynthesis.cancel();
        this.innerHTML = "🔊";
        currentUtterance = null;
      } else {
        if (window.speechSynthesis) {
          const utterance = new SpeechSynthesisUtterance(text);
          utterance.lang = "en-US";
          
          utterance.onstart = () => {
            this.innerHTML = "⏹";
            currentUtterance = utterance;
          };
          
          utterance.onend = () => {
            this.innerHTML = "🔊";
            currentUtterance = null;
          };
          
          speechSynthesis.speak(utterance);
        }
      }
    });
  });
});
