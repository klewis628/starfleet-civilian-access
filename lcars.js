// Stardate computation
(function(){
  const BASE_STARDATE = 41000;
  const BASE_EPOCH = Date.UTC(1990,0,1,0,0);
  const UNITS_PER_MS = 1000 / (365.2425*24*3600*1000);
  function compute(date=new Date()){
    const sd = BASE_STARDATE + (date.getTime()-BASE_EPOCH)*UNITS_PER_MS;
    return (Math.floor(sd) + (Math.floor((sd%1)*10)/10)).toFixed(1);
  }
  function render(){
    const el = document.getElementById('stardate-value');
    if(el) el.textContent = compute(new Date());
  }
  render();
  setInterval(render, 8000);
})();

// Mission briefing loader
(async function(){
  const panel=document.getElementById('mission-briefing');
  const body=document.getElementById('mb-body');
  const upd=document.getElementById('mb-updated');
  if(!panel||!body) return;
  try{
    const res = await fetch('data/mission-briefing.json', {cache:'no-store'});
    if(!res.ok) throw new Error('No briefing');
    const data = await res.json();
    if(data.updated && upd){
      const dt = new Date(data.updated);
      upd.textContent = `Updated: ${dt.toLocaleString()}`;
    }
    if(Array.isArray(data.items) && data.items.length){
      body.innerHTML = data.items.map(it=>`<article class="mb-item"><h3 class="mb-title">${it.title||'Notice'}</h3><p class="mb-text">${it.body||''}</p></article>`).join('');
      panel.hidden = false;
    }
  }catch(e){ console.debug('Mission briefing not loaded:', e.message); }
})();

// Accept / Decline
addEventListener('DOMContentLoaded', ()=>{
  const go = (u)=>location.assign(u);
  document.getElementById('accept-btn')?.addEventListener('click',()=>go('success.html'));
  document.getElementById('decline-btn')?.addEventListener('click',()=>go('denied.html'));
});
