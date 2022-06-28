ListName = [];

data.forEach(element => {
    ListName.push(element['name']);
});

ListName = ListName.sort(function (a, b) {
    return a.localeCompare(b);
});

ListName.forEach(element => {
    data.forEach(item => {
        if (item['name'] == element){
            document.querySelector('body').innerHTML += "<div class='el'><img src='src/"+item['alpha2']+".svg'><p>"+item['name']+"</p></div>";
        }
    });
});