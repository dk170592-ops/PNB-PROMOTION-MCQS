const seed=[
['Banking & RBI','Which institution is the central bank of India?',['SEBI','RBI','NABARD','IRDAI'],1],
['Credit & Loans','What does LTV stand for?',['Loan to Value','Limit to Value','Loan Transfer Value','Liability to Value'],0],
['NPA & Recovery','A loan account is generally classified as NPA when overdue exceeds:',['30 days','60 days','90 days','180 days'],2],
['MSME & Priority Sector','MSME classification is based on:',['Only investment','Only turnover','Investment and turnover','Employees only'],2],
['PNB Knowledge','Punjab National Bank was established in:',['1894','1895','1901','1947'],0],
['Banking & RBI','CRR is maintained by banks with:',['RBI','SEBI','Government','NABARD'],0],
['Digital Banking','UPI is operated by:',['NPCI','RBI alone','SEBI','IRDAI'],0]
];
let qs=JSON.parse(localStorage.getItem('pnbPortalMcqs')||'null')||seed.map(x=>({category:x[0],question:x[1],options:x[2],correct:x[3]}));
let quiz=[],pos=0,score=0,answered=false;
function save(){localStorage.setItem('pnbPortalMcqs',JSON.stringify(qs))}
function page(id){document.querySelectorAll('.page').forEach(x=>x.classList.remove('active'));document.getElementById(id).classList.add('active');if(id==='home')home()}
function home(){document.getElementById('qCount').textContent=qs.length;document.getElementById('totalMcq').textContent=qs.length;document.getElementById('attempted').textContent=localStorage.getItem('attempted')||0;document.getElementById('latestScore').textContent=localStorage.getItem('latestScore')||'Not attempted';
let cats=[...new Set(qs.map(q=>q.category))];document.getElementById('topics').innerHTML=cats.map(c=>`<div class="topic" onclick="topicQuiz('${c}')"><b>${c}</b><small>${qs.filter(q=>q.category===c).length} MCQs</small></div>`).join('');
document.getElementById('latest').innerHTML=qs.slice(-5).reverse().map(q=>`<div class="mcq"><span class="tag">${q.category}</span><h3>${q.question}</h3><small><b>Answer:</b> ${q.options[q.correct]}</small></div>`).join('')}
function topicQuiz(c){quiz=qs.filter(q=>q.category===c);begin()}
function startQuiz(){quiz=[...qs].sort(()=>Math.random()-.5).slice(0,Math.min(10,qs.length));begin()}
function begin(){pos=0;score=0;page('practice');document.getElementById('startBtn').classList.add('hidden');document.getElementById('nextBtn').classList.remove('hidden');showQ()}
function showQ(){answered=false;let q=quiz[pos];document.getElementById('progress').textContent=`Question ${pos+1} of ${quiz.length}`;document.getElementById('quizScore').textContent=`Score: ${score}`;document.getElementById('bar').style.width=((pos/quiz.length)*100)+'%';document.getElementById('question').textContent=q.question;document.getElementById('feedback').textContent='';document.getElementById('options').innerHTML=q.options.map((o,i)=>`<button class="option" onclick="answer(${i})">${String.fromCharCode(65+i)}. ${o}</button>`).join('')}
function answer(i){if(answered)return;answered=true;let q=quiz[pos],b=document.querySelectorAll('.option');b[q.correct].classList.add('correct');if(i===q.correct){score++;document.getElementById('feedback').textContent='✓ Correct!'}else{b[i].classList.add('wrong');document.getElementById('feedback').textContent='✗ Incorrect. Correct answer: '+q.options[q.correct]}}
function nextQuestion(){if(!answered){document.getElementById('feedback').textContent='Please select an answer first.';return}pos++;if(pos<quiz.length)showQ();else finish()}
function finish(){let pct=Math.round(score/quiz.length*100);document.getElementById('progress').textContent='Quiz Completed';document.getElementById('quizScore').textContent='';document.getElementById('bar').style.width='100%';document.getElementById('question').textContent=`Your Score: ${score}/${quiz.length} (${pct}%)`;document.getElementById('options').innerHTML='';document.getElementById('feedback').textContent=pct>=70?'Excellent! Keep practicing.':'Keep practicing to improve your score.';document.getElementById('nextBtn').classList.add('hidden');document.getElementById('restartBtn').classList.remove('hidden');localStorage.setItem('latestScore',pct+'%');localStorage.setItem('attempted',Number(localStorage.getItem('attempted')||0)+quiz.length)}
function publish(){let question=document.getElementById('newQuestion').value.trim(),options=[0,1,2,3].map(i=>document.getElementById('o'+i).value.trim());if(!question||options.some(x=>!x)){alert('Please complete all fields.');return}qs.push({category:category.value,question,options,correct:Number(correct.value)});save();['newQuestion','o0','o1','o2','o3'].forEach(id=>document.getElementById(id).value='');alert('MCQ published successfully!');page('home')}
home();