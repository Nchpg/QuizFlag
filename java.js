function getRandomArbitrary(min, max) {
    return Math.trunc(Math.random() * (max - min) + min);
}

function sansAccent(str){
    var accent = [
        /[\300-\306]/g, /[\340-\346]/g, // A, a
        /[\310-\313]/g, /[\350-\353]/g, // E, e
        /[\314-\317]/g, /[\354-\357]/g, // I, i
        /[\322-\330]/g, /[\362-\370]/g, // O, o
        /[\331-\334]/g, /[\371-\374]/g, // U, u
        /[\321]/g, /[\361]/g, // N, n
        /[\307]/g, /[\347]/g, // C, c
    ];
    var noaccent = ['A','a','E','e','I','i','O','o','U','u','N','n','C','c'];
     
    for(var i = 0; i < accent.length; i++){
        str = str.replaceAll(accent[i], noaccent[i]);
    }
     
    return str;
}

function sansTiret(str){
    str = str.replaceAll('-', ' ');
    return str;
}

nbFlag = 0;
point = 0;
help = false;
dataLenght = data.length

function update(){
    document.querySelector('#answer p').textContent = '';
    alea = getRandomArbitrary(0, dataLenght - nbFlag);
    if(dataLenght - nbFlag == 0){
        alert('Bravo vous avez fini votre session avec un scrore de : '+point+' / '+nbFlag+" soit avec "+Math.round(point/nbFlag*10000)/100 +' % de réussite ! Pour recommencer actualiser la page.')
    }
    flagCode = data[alea]['alpha2'];
    nbFlag ++;
    flagName = '';

    data.forEach(d => {
        if(d['alpha2'] == flagCode){
            flagName = d['name'];
        }
    });

    data.splice(alea, 1);

    if (flagName != ''){
        document.getElementById('flag').setAttribute("src", "src/"+flagCode+".svg");
    };

}

input = document.querySelector('input')

input.addEventListener('keypress', (e)=>{
    if (e.keyCode == 13) {
        console.log(sansAccent(flagName.toLowerCase()), sansTiret(sansAccent(document.querySelector('input').value.toLowerCase())));
        if(sansTiret(sansAccent(flagName.toLowerCase())) == sansTiret(sansAccent(document.querySelector('input').value.toLowerCase()))){
            document.querySelector('input').value = '';
            console.log(help);
            if(help == false){
                point ++;
            };
            help = false;
            document.querySelector('#compteur h1').textContent = point+" | "+nbFlag;
            update();
        }
    }
});

update();
document.querySelector('#popUp p').textContent += data.length+1;

document.querySelector('#next img').addEventListener('click', (e)=>{
    document.querySelector('#answer p').textContent = flagName;
    document.querySelector('input').focus();
    help = true;
});
