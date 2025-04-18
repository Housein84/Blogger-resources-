(function() {
  const css = `
    :root {
      --base: 1.125rem;
      --lh: 1.5;
      --h1: 1.375rem;
      --h2: 1.25rem;
      --h3: 1.125rem;
      --h1c: #6aa84f;
      --h2c: #333;
      --h3c: #2b00fe;
    }

    body, p, div {
      font-family: Arial, sans-serif;
      font-size: var(--base);
      color: #333;
      line-height: var(--lh);
      margin: 0;
      padding: 0;
    }

    h1 {
      color: var(--h1c);
      font-size: var(--h1);
      font-weight: 700;
      line-height: 1.2;
      margin: 0.875rem 0 0.4375rem;
    }

    /* أكمل بقية التنسيقات هنا */
  `;

  const styleElement = document.createElement('style');
  styleElement.innerHTML = css;
  document.head.appendChild(styleElement);

  document.addEventListener("DOMContentLoaded", () => {
    let currentSpeech = null;
    
    document.querySelectorAll(".btn-speaker").forEach(button => {
      button.setAttribute("aria-label", "تشغيل/إيقاف الصوت");
      
      button.addEventListener("click", function() {
        const text = this.getAttribute("data-text");
        
        if (currentSpeech && window.speechSynthesis.speaking) {
          window.speechSynthesis.cancel();
          this.innerHTML = "🔊";
          currentSpeech = null;
        } else {
          const utterance = new SpeechSynthesisUtterance(text);
          utterance.lang = "en-US";
          
          utterance.onstart = () => {
            this.innerHTML = "⏹";
            currentSpeech = utterance;
          };
          
          utterance.onend = () => {
            this.innerHTML = "🔊";
            currentSpeech = null;
          };
          
          window.speechSynthesis.speak(utterance);
        }
      });
    });
  });
})();