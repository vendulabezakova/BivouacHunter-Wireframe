let cur=0;
let loggedIn=false;
function setVh(){document.documentElement.style.setProperty('--vh',window.innerHeight*0.01+'px');}
setVh();
window.addEventListener('resize',setVh);
window.addEventListener('DOMContentLoaded',()=>{setVh();goTo(0);renderWxTimes();});
function goTo(n){
  if(n>=2 && !loggedIn){goTo(0);return;}
  document.querySelectorAll('.sl').forEach((s,i)=>{
    const active = i===n;
    s.style.opacity = active ? '1' : '0';
    s.style.visibility = active ? 'visible' : 'hidden';
    s.classList.toggle('active', active);
  });
  cur=n;
  document.querySelectorAll('.d').forEach((d,i)=>d.classList.toggle('active',i===n));
}
function login(n){loggedIn=true;goTo(n);}
function logout(){loggedIn=false;goTo(0);}
function next(){if(cur<7)goTo(cur+1);}
function prev(){if(cur>0)goTo(cur-1);}

// SOS
function openSOS(e){e.stopPropagation();document.getElementById('sosOverlay').classList.add('open');document.getElementById('sosSheet').classList.add('open');}
function closeSOS(){document.getElementById('sosOverlay').classList.remove('open');document.getElementById('sosSheet').classList.remove('open');}

const SP=[
{c:'46.9421°N, 11.9834°E',tp:'(Bivak)',te:'Nadmořská výška: 2638 m<br>Sklon terénu: <span style="color:#4a9a2a;font-weight:600;">4° (mírný = vhodný)</span><br>Orientace svahu: JV<br>Vzdálenost od pěšiny: 320 m<br>Pramen: 480 m<br>Typ terénu: alpská louka',w:[['Teď','⛅','8°C','12 km/h od JJZ','0 mm'],['18:00','🌤','7°C','14 km/h od JJV','0 mm'],['21:00','☁️','4°C','8 km/h od VJV','0 mm'],['03:00','🌑','1°C','6 km/h od V','0 mm']],lg:'Bivakování povoleno. Zákaz ohně. <a class="ll">Nationalpark Hohe Tauern</a>',sklon:4,orient:'JV',pesina:320,pramen:480,pristresek:null,leg:'povoleno',vyska:2638},
{c:'46.9318°N, 12.0041°E',tp:'(Bivak)',te:'Nadmořská výška: 2710 m<br>Sklon terénu: <span style="color:#8a8a00;font-weight:600;">6° (výrazný = nouzový)</span><br>Orientace svahu: SV<br>Vzdálenost od pěšiny: 80 m<br>Pramen: 1200 m<br>Typ terénu: travnatý hřeben',w:[['Teď','🌤','6°C','18 km/h od S','0 mm'],['18:00','⛅','5°C','20 km/h od SSZ','0 mm'],['21:00','🌧','3°C','15 km/h od Z','1 mm'],['03:00','🌧','1°C','10 km/h od Z','2 mm']],lg:'Bivakování povoleno max. 1 noc. Zákaz ohně. <a class="ll">Biotopo Alpi Aurine</a>',sklon:6,orient:'SV',pesina:80,pramen:1200,pristresek:900,leg:'max1noc',vyska:2710},
{c:'46.9205°N, 12.0112°E',tp:'(Bivak)',te:'Nadmořská výška: 2540 m<br>Sklon terénu: <span style="color:#1a6b1a;font-weight:600;">2° (rovný = ideální)</span><br>Orientace svahu: J<br>Vzdálenost od pěšiny: 650 m<br>Pramen: 200 m<br>Typ terénu: chráněná kotlina, les smíšený',w:[['Teď','🌤','11°C','9 km/h od JJZ','0 mm'],['18:00','🌤','10°C','11 km/h od JJV','0 mm'],['21:00','⛅','7°C','7 km/h od VJV','0 mm'],['03:00','🌑','4°C','5 km/h od V','0 mm']],lg:'Bivakování povoleno. Zákaz ohně. <a class="ll">CHKO Alpi Aurine / Campo Tures</a>',sklon:2,orient:'J',pesina:650,pramen:200,pristresek:null,leg:'povoleno',vyska:2540},
];
let am=null;
function openSpot(e,idx){
  e.stopPropagation();
  const s=SP[idx];
  document.getElementById('scoo').textContent=s.c;
  document.getElementById('stp').textContent=s.tp;
  document.getElementById('ste').innerHTML=s.te;
  let wh='';s.w.forEach(w=>{wh+='<div class="wr"><span class="wt">'+w[0]+'</span><span class="wi">'+w[1]+'</span><span class="wtp">'+w[2]+'</span><span class="ww">💨 '+w[3]+'</span><span class="wp">🌧 '+w[4]+'</span></div>';});
  document.getElementById('swe').innerHTML=wh;
  document.getElementById('slg').innerHTML='<span style="font-size:16px">📋</span><span>'+s.lg+'</span>';
  if(am)am.classList.remove('active');
  am=e.currentTarget;am.classList.add('active');
  goTo(5);
}
function handleMapClick(e){if(!e.target.closest('.lpanel')&&!e.target.closest('.lbtn')&&!e.target.closest('.ibtn'))document.getElementById('lp').classList.remove('open');}
function toggleLP(e){e.stopPropagation();document.getElementById('lp').classList.toggle('open');}
function rdS(){const v=document.getElementById('lS').checked?'block':'none';['sm1','sm2','sm3'].forEach(id=>document.getElementById(id).style.display=v);}
function rdR(){document.getElementById('rl').style.display=document.getElementById('lR').checked?'block':'none';}
function rdV(){document.getElementById('vl').style.display=document.getElementById('lV').checked?'block':'none';}
function rdH(){const v=document.getElementById('lH').checked?'flex':'none';['hm1','hm2'].forEach(id=>document.getElementById(id).style.display=v);}

// Filtry
const SPOT_IDS = ['sm1','sm2','sm3'];
const SPOT_DATA = [SP[0], SP[1], SP[2]];

function applyFilters(){
  const sklon = +document.getElementById('sel-sklon').value || null;
  const orient = document.getElementById('sel-orient').value || null;
  const pesina = +document.getElementById('sel-pesina').value || null;
  const pramen = +document.getElementById('sel-pramen').value || null;
  const pristresek = +document.getElementById('sel-pristresek').value || null;
  const leg = document.getElementById('sel-leg').value || null;

  // Mark selects as active
  document.querySelectorAll('.flt-select').forEach(s => {
    s.classList.toggle('active', s.value !== '');
  });

  // Show/hide shelter and spring POI markers based on filters
  const shelterEl = document.getElementById('poi-shelter');
  const springEl = document.getElementById('poi-spring');
  if(shelterEl) shelterEl.style.display = pristresek ? 'block' : 'none';
  if(springEl) springEl.style.display = pramen ? 'block' : 'none';

  SPOT_IDS.forEach((id, i) => {
    const el = document.getElementById(id);
    if(!el) return;
    const s = SPOT_DATA[i];
    let show = true;
    if(sklon && s.sklon > sklon) show = false;
    if(orient && s.orient !== orient) show = false;
    if(pesina && s.pesina > pesina) show = false;
    if(pramen && s.pramen > pramen) show = false;
    if(pristresek && (s.pristresek === null || s.pristresek > pristresek)) show = false;
    if(leg && s.leg !== leg) show = false;
    el.style.display = show ? 'block' : 'none';
  });
}


// Uložené
function toggleUl(i){
  const isOpen = document.getElementById('uld-'+i).style.display !== 'none';
  // Zavři všechny
  [0,1,2,3].forEach(j => {
    document.getElementById('uld-'+j).style.display = 'none';
    document.getElementById('ula-'+j).classList.remove('open');
  });
  // Otevři kliknutou (pokud nebyla otevřená)
  if(!isOpen){
    document.getElementById('uld-'+i).style.display = 'block';
    document.getElementById('ula-'+i).classList.add('open');
  }
}
function editName(e, i){
  e.stopPropagation();
  const el = document.getElementById('uln-'+i);
  const cur = el.textContent.replace('✏️','').trim();
  const val = prompt('Přejmenovat:', cur);
  if(val) el.innerHTML = val + ' <span class="ul-edit" onclick="editName(event,'+i+')">✏️</span>';
}
const LB_EMOJIS = ['🏔','🌄','🌲','🌲','🌄'];
function openLightbox(i){
  const lb = document.getElementById('ulLightbox');
  document.getElementById('ulLbImg').textContent = LB_EMOJIS[i] || '🏔';
  lb.classList.add('open');
}
function closeLightbox(){
  document.getElementById('ulLightbox').classList.remove('open');
}


const HS_DATA = [
  {name:'Bergrettung Stall im Mölltal', dist:'2,3 km od tvojí polohy', tel:'+43 512 621000', addr:'Mölltalstraße 12, 9833 Stall, Rakousko', coords:'46.9102°N, 13.0241°E'},
  {name:'Soccorso Alpino Valle Aurina', dist:'3,8 km od tvojí polohy', tel:'+39 0474 551010', addr:'Via Centrale 4, 39030 Campo Tures, Itálie', coords:'46.9450°N, 11.9680°E'},
];
function openHS(e, i){
  e.stopPropagation();
  const d = HS_DATA[i];
  document.getElementById('hsName').textContent = d.name;
  document.getElementById('hsDist').textContent = d.dist;
  document.getElementById('hsTel').textContent = d.tel;
  document.getElementById('hsAddr').textContent = d.addr;
  document.getElementById('hsCoords').textContent = d.coords;
  document.getElementById('hsOverlay').classList.add('open');
  document.getElementById('hsSheet').classList.add('open');
}
function closeHS(){
  document.getElementById('hsOverlay').classList.remove('open');
  document.getElementById('hsSheet').classList.remove('open');
}


function renderWxTimes(){
  const WX_TIMES = ["Teď", "21:41", "00:41", "03:41", "06:41", "09:41", "12:41", "15:41", "18:41", "21:41", "00:41", "03:41", "06:41", "09:41", "12:41", "15:41"];
  for(let i=0; i<16; i++){
    const el = document.getElementById('wxt-'+i);
    if(!el) continue;
    el.textContent = WX_TIMES[i];
  }
}


function applyFilters2(){
  ['sklon','orient','pesina','pramen','pristresek','leg'].forEach(n => {
    const s2 = document.getElementById('sel2-'+n);
    const s1 = document.getElementById('sel-'+n);
    if(s1 && s2) s1.value = s2.value;
  });
  applyFilters();
  // Sync back visual active state on both panels
  document.querySelectorAll('.flt-select').forEach(s => {
    s.classList.toggle('active', s.value !== '');
  });
}

