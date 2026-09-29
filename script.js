(function(){
  var root=document.documentElement;

  // split hero name into letters for the intro
  var i=0;
  document.querySelectorAll('[data-split]').forEach(function(el){
    var t=el.textContent; el.textContent='';
    for(var k=0;k<t.length;k++){
      var s=document.createElement('span'); s.className='ch';
      s.style.setProperty('--i',i++);
      s.textContent=t[k]===' '?'\u00A0':t[k];
      el.appendChild(s);
    }
  });
  var go=function(){root.classList.add('ready')};
  if(document.fonts&&document.fonts.ready){Promise.race([document.fonts.ready,new Promise(function(r){setTimeout(r,900)})]).then(function(){requestAnimationFrame(go)})}
  else{setTimeout(go,150)}

  // gentle pointer parallax on the name, behind the portrait
  var nm=document.getElementById('name');
  var fine=window.matchMedia('(hover:hover) and (pointer:fine)').matches;
  var calm=window.matchMedia('(prefers-reduced-motion:reduce)').matches;
  if(fine&&!calm){
    window.addEventListener('pointermove',function(e){
      var x=(e.clientX/innerWidth-.5)*-26, y=(e.clientY/innerHeight-.5)*-12;
      nm.style.transform='translate('+x+'px,'+y+'px)';
    });
  }

  // heading reveal
  var rvs=document.querySelectorAll('.rv');
  if('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.3});
    rvs.forEach(function(r){io.observe(r)});
  }else{rvs.forEach(function(r){r.classList.add('in')})}

  // lightbox
  var lb=document.getElementById('lb'), lbimg=document.getElementById('lbimg');
  document.querySelectorAll('[data-zoom]').forEach(function(b){
    b.addEventListener('click',function(){
      var im=b.querySelector('img'); lbimg.src=im.src; lbimg.alt=im.alt;
      if(lb.showModal){lb.showModal()}else{lb.setAttribute('open','')}
    });
  });
  document.getElementById('lbclose').addEventListener('click',function(){lb.close()});
  lb.addEventListener('click',function(e){if(e.target===lb||e.target===lbimg)lb.close()});

  // copy email
  var cb=document.getElementById('copy'), msg=document.getElementById('copied');
  cb.addEventListener('click',function(){
    var em=cb.getAttribute('data-email');
    var done=function(){msg.textContent='Email address copied.'};
    var fail=function(){msg.textContent=em};
    try{navigator.clipboard.writeText(em).then(done,fail)}catch(e){fail()}
  });
})();
