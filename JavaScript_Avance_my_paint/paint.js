var canvas = document.getElementById('myCanvas');
var contexte = canvas.getContext('2d');
var buttonCrayon = document.getElementById('crayon'),
buttonLigne = document.getElementById('ligne'),
buttonGomme = document.getElementById('gomme'),
buttonCercle = document.getElementById('cercle'),
buttonCercleP = document.getElementById('cerclep'),
buttonRectangle = document.getElementById('rect'),
buttonRectangleP = document.getElementById('rectp');
var buttonCrayon, buttonLigne, buttonGomme;
var bErasing =  false;
var selectedValue = document.getElementById('listEpaisseur').value;
var color = document.getElementById('color').value;


function getSelectValue(){
    selectedValue = document.getElementById('listEpaisseur').value;
}

function lineColor(){
    color = document.getElementById('color').value;
}


buttonCrayon.onclick = function(elem){
    buttonCrayon = true;
    buttonLigne = false;
    buttonGomme = false;
    var mouvement;

    canvas.onmousedown = function(elem) {
        mouvement = true;
        contexte.beginPath();
        contexte.moveTo(elem.offsetX, elem.offsetY);
    };
    canvas.onmousemove = function(elem) {
        if (mouvement && buttonCrayon) {
            contexte.strokeStyle = color;
            contexte.lineWidth = selectedValue;
            contexte.lineTo(elem.offsetX, elem.offsetY);
            contexte.stroke();
        }
    };
    canvas.onmouseup = function() {
        mouvement = false;
        contexte.closePath();
    };
}

buttonLigne.onclick = function(elem){
    var tab = [];
    canvas.onmousedown = function(el){
        var x1 = el.offsetX;
        var y1 = el.offsetY;

        tab.push(x1, y1);

        canvas.onmousedown = function(el){
            var x2 = el.offsetX;
            var y2 = el.offsetY;

            tab.push(x2, y2);
            contexte.beginPath();
            contexte.strokeStyle = color;
            contexte.lineWidth = selectedValue;
            contexte.moveTo(tab[0], tab[1]);
            contexte.lineTo(tab[2], tab[3]);
            contexte.stroke();

            if(tab[2]){
                tab = [];
            }
        }
    }
}

buttonGomme.onclick = function(elem){
    var mouvement;
    buttonCrayon = false;
    buttonLigne = false;
    buttonGomme = true;
    bErasing = true;

    canvas.onmousedown = function(elem) {
        mouvement = true;
    };
    canvas.onmousemove = function(elem){
        if (mouvement) {
            contexte.lineWidth = selectedValue;
            contexte.beginPath();
            if(bErasing){
                contexte.globalCompositeOperation="destination-out";
            }else{
                contexte.globalCompositeOperation="source-over";
            }
            contexte.moveTo(elem.pageX - this.offsetLeft, elem.pageY - this.offsetTop);
            contexte.lineTo(elem.pageX ,elem.pageY);
            contexte.stroke();
        };
    };
    canvas.onmouseup = function(elem){
        mouvement = false;
    };
}

buttonCercle.onclick = function(elem){
    var tab = [];
    canvas.onmousedown = function(el){
        var x1 = el.offsetX;
        var y1 = el.offsetY;

        tab.push(x1, y1);

        canvas.onmousedown = function(el){
            var x2 = el.offsetX;
            var y2 = el.offsetY;

            tab.push(x2, y2);
            var radian = (Math.pow(tab[2] - tab[0], 2) + Math.pow(tab[3] - tab[1], 2));
            radian = Math.sqrt(radian);
            contexte.beginPath();
            contexte.strokeStyle = color;
            contexte.lineWidth = selectedValue;
            contexte.arc(tab[0], tab[1], radian, 0, 2*Math.PI);
            contexte.stroke();
            contexte.closePath();

            if(tab[2]){
                tab = [];
            }
        }
    }
}

buttonCercleP.onclick = function(elem){
    var tab = [];
    canvas.onmousedown = function(el){
        var x1 = el.offsetX;
        var y1 = el.offsetY;

        tab.push(x1, y1);

        canvas.onmousedown = function(el){
            var x2 = el.offsetX;
            var y2 = el.offsetY;

            tab.push(x2, y2);
            var radian = (Math.pow(tab[2] - tab[0], 2) + Math.pow(tab[3] - tab[1], 2));
            radian = Math.sqrt(radian);
            contexte.beginPath();
            contexte.fillStyle = color;
            contexte.lineWidth = selectedValue;
            contexte.arc(tab[0], tab[1], radian, 0, 2*Math.PI);
            contexte.fill();
            contexte.closePath();

            if(tab[2]){
                tab = [];  
            }
        }
    }
}

buttonRectangle.onclick = function(elem){
    var tab = [];
    canvas.onmousedown = function(el){
        var x1 = el.offsetX;
        var y1 = el.offsetY;

        tab.push(x1, y1);

        canvas.onmousedown = function(el){
            var x2 = el.offsetX - x1;
            var y2 = el.offsetY - y1;

            tab.push(x2, y2);

            contexte.beginPath();
            contexte.strokeStyle = color;
            contexte.lineWidth = selectedValue;
            contexte.rect(tab[0], tab[1],tab[2], tab[3]);
            contexte.stroke();
            contexte.closePath();
        }
    }
}

buttonRectangleP.onclick = function(elem){
    var tab = [];
    canvas.onmousedown = function(el){
        var x1 = el.offsetX;
        var y1 = el.offsetY;

        tab.push(x1, y1);

        canvas.onmousedown = function(el){
            var x2 = el.offsetX - x1;
            var y2 = el.offsetY - y1;

            tab.push(x2, y2);
            contexte.beginPath();
            contexte.fillStyle = color;
            contexte.lineWidth = selectedValue;
            contexte.rect(tab[0], tab[1], tab[2], tab[3]);
            contexte.fill();
            contexte.closePath();
        }
    }
}
