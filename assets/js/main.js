
document.addEventListener('DOMContentLoaded', ()=> {
  const switcher = document.getElementById('lang');
  function setLang(lang){
    document.documentElement.lang = (lang === 'pt') ? 'pt-BR' : 'en';
    localStorage.setItem('site_lang', lang);
    document.querySelectorAll('[data-en]').forEach(el=>{el.style.display = (lang==='en')?'block':'none';});
    document.querySelectorAll('[data-pt]').forEach(el=>{el.style.display = (lang==='pt')?'block':'none';});
    if(switcher) switcher.value = lang;
  }
  const saved = localStorage.getItem('site_lang') || 'pt';
  setLang(saved);
  if(switcher) switcher.addEventListener('change',(e)=> setLang(e.target.value));
  const form = document.getElementById('contact-form');
  if(form){
    form.addEventListener('submit',(e)=>{
      e.preventDefault();
      const name=form.querySelector('#name').value||'';
      alert((document.documentElement.lang==='pt-BR')?`Obrigado, ${name}! Sua mensagem foi recebida.`:`Thanks, ${name}! Your message was received.`);
      form.reset();
    });
  }
});
