document.addEventListener("DOMContentLoaded", function() {
  // 1. تفعيل السياق الصوتي مرة واحدة فقط
  let audioContextActivated = false;
  
  const activateAudioContext = () => {
    if (audioContextActivated) return;
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        const audioContext = new AudioContext();
        audioContext.resume().then(() => {
          audioContextActivated = true;
        }).catch(console.error);
      }
    } catch (error) {
      console.error("AudioContext activation failed", error);
    }
  };

  // 2. نظام فعال لإدارة الأزرار
  const speechManager = {
    currentUtterance: null,
    currentButton: null,
    
    speak: function(text, button) {
      // إيقاف أي كلام جاري
      if (this.currentUtterance && speechSynthesis.speaking) {
        speechSynthesis.cancel();
        if (this.currentButton) {
          this.currentButton.innerHTML = "🔊";
        }
      }
      
      // تفعيل السياق الصوتي إذا لم يكن مفعلًا
      if (!audioContextActivated) activateAudioContext();
      
      try {
        // إنشاء كلام جديد
        this.currentUtterance = new SpeechSynthesisUtterance(text);
        this.currentUtterance.lang = "en-US";
        this.currentButton = button;
        button.innerHTML = "⏹";
        
        this.currentUtterance.onend = this.currentUtterance.onerror = () => {
          button.innerHTML = "🔊";
          this.currentUtterance = null;
          this.currentButton = null;
        };
        
        speechSynthesis.speak(this.currentUtterance);
      } catch (error) {
        console.error("Speech error", error);
        button.innerHTML = "🔊";
      }
    }
  };

  // 3. إعداد الأزرار بكفاءة
  document.querySelectorAll(".btn-speaker").forEach(button => {
    button.addEventListener("click", function() {
      const text = this.getAttribute("data-text");
      speechManager.speak(text, this);
    });
  });

  // 4. تفعيل الصوت عند أول تفاعل
  document.addEventListener('click', activateAudioContext, { once: true });
  document.addEventListener('touchstart', activateAudioContext, { once: true });
});
