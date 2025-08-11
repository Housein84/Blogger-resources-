document.addEventListener("DOMContentLoaded", function() {
  let currentUtterance = null;
  let audioContextActivated = false;

  // 1. تفعيل السياق الصوتي - ESSENTIAL
  const activateAudioContext = () => {
    if (!audioContextActivated) {
      try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (AudioContext) {
          const audioContext = new AudioContext();
          audioContext.resume().then(() => {
            audioContextActivated = true;
          }).catch(error => {
            console.error("AudioContext activation failed:", error);
          });
        }
      } catch (error) {
        console.error("AudioContext error:", error);
      }
    }
  };

  // تفعيل عند أول نقر في الصفحة
  document.addEventListener('click', function initAudio() {
    activateAudioContext();
    document.removeEventListener('click', initAudio);
  }, { once: true });

  // 2. نظام النطق مع التحسينات
  document.addEventListener("click", function(e) {
    const button = e.target.closest(".btn-speaker");
    if (!button) return;
    
    e.preventDefault();

    // تأكد من تفعيل الصوت
    activateAudioContext();

    const text = button.getAttribute("data-text");

    if (currentUtterance && speechSynthesis.speaking) {
      speechSynthesis.cancel();
      button.innerHTML = "🔊";
      currentUtterance = null;
      return;
    }

    if (window.speechSynthesis) {
      // إضافة تأخير بسيط للتأكد من تفعيل الصوت
      setTimeout(() => {
        try {
          const utterance = new SpeechSynthesisUtterance(text);
          utterance.lang = "en-US";

          utterance.onstart = () => {
            button.innerHTML = "⏹";
            currentUtterance = utterance;
          };

          utterance.onend = () => {
            button.innerHTML = "🔊";
            currentUtterance = null;
          };
          
          // 3. معالجة الأخطاء - ESSENTIAL
          utterance.onerror = (event) => {
            console.error("Speech error:", event.error);
            button.innerHTML = "🔊";
            currentUtterance = null;
            
            // رسائل تنبيه بالإنجليزية
            if (event.error === 'interrupted') {
              alert('Audio playback blocked. Please enable sound permissions in browser settings.');
            } else if (event.error === 'synthesis-failed') {
              alert('Speech synthesis failed. Try again later.');
            } else {
              alert('Speech error: ' + event.error);
            }
          };

          speechSynthesis.speak(utterance);
        } catch (error) {
          console.error("Speech system error:", error);
          alert("Speech system error: " + error.message);
          button.innerHTML = "🔇";
        }
      }, 100); // تأخير 100ms
    } else {
      alert("Text-to-speech is not supported in your browser");
    }
  });
});
