(function() {
  const css = `
:root{--base:1.125rem;--lh:1.5;--h1:1.375rem;--h2:1.25rem;--h3:1.125rem;--h1c:#6aa84f;--h2c:#333;--h3c:#2b00fe}body,p,div{font-family:Arial,sans-serif;font-size:var(--base);color:#333;line-height:var(--lh);margin:0;padding:0}h1{color:var(--h1c);font-size:var(--h1);font-weight:700;line-height:1.2;margin:.875rem 0 .4375rem}h2{color:var(--h2c);font-size:var(--h2);font-weight:700}h3{color:var(--h3c);font-size:var(--h3);font-weight:700}.exw{font-size:1.4375rem;color:red;font-style:normal}.ex-ar{font-size:.9375rem;direction:rtl;text-align:right;color:#999;display:block;margin-left:auto}.en-ex{font-size:1.4375rem;color:#000;font-weight:400;display:block;margin-right:0;position:relative;direction:ltr;unicode-bidi:embed}.en-ex::before{content:"\2022 ";color:#000;margin-right:.3125rem}.btn-speaker{font-size:var(--base);padding:0;border:0;cursor:pointer;color:#333;margin-left:.3125rem;display:inline-block;vertical-align:middle;background:0 0;white-space:nowrap}#article-content{font-size:1.11rem;line-height:1.6}#article-content h1{font-size:1.44rem}#article-content h2{font-size:1.22rem}#article-content h3{font-size:1.11rem}.container{max-width:56.25rem;margin:auto;padding:.9375rem}[lang=en]{direction:ltr;unicode-bidi:embed}.pr-ar{direction:rtl;text-align:right;color:#999;display:block;margin-left:auto}.hl{color:red}table{width:100%;border-collapse:collapse}td,th{border:1px solid #ddd;padding:8px}@media (min-width:1025px){body{font-size:1.125rem}}@media (max-width:768px){:root{--base:1rem;--h1:1.25rem;--h2:1.125rem;--h3:1.125rem}.exw,.en-ex{font-size:1.125rem}}@media (max-width:480px){:root{--base:1.25rem;--h1:1.4rem;--h2:1.25rem;--h3:1.25rem}}
  `;
  
  // إضافة CSS إلى الصفحة
  const styleElement = document.createElement("style");
  styleElement.textContent = css;
  document.head.appendChild(styleElement);
  
  // JavaScript FUNCTIONALITY CODE
  document.addEventListener("DOMContentLoaded",()=>{let t=null;document.querySelectorAll(".btn-speaker").forEach(e=>{e.setAttribute("aria-label","play/stop"),e.addEventListener("click",function(){const o=this.getAttribute("data-text");t&&window.speechSynthesis.speaking?(window.speechSynthesis.cancel(),this.innerHTML="🔊",t=null):window.speechSynthesis&&((n=new SpeechSynthesisUtterance(o)).lang="en-US",n.onstart=()=>{this.innerHTML="⏹",t=n},n.onend=()=>{this.innerHTML="🔊",t=null},window.speechSynthesis.speak(n))})})});
})();
