var red = ['#821B0D','#B13631','#D75B5B','#F18788','#FDB9B0'];
var blue = ['#00477A','#2368A0','#4A8AC1','#75AEDC','#A7D2F1'];
var yellow = ['#664400','#8A6318','#AD8536','#D0A95C','#F2CE88'];
var green = ['#1E5124','#337331','#509453','#77B479','#A8D4A1'];
var grey = ['#353131','#5E5959','#8A8585','#B7B4B4','#E6E5E5'];

terra.registerCA({
  type: 'GoL',
  colorFn: function () {
    return this.alive ? this.color + ',1' : '0,0,0,0';
  },
  process: function (neighbors, x, y) {
    var surrounding = neighbors.filter(function (spot) {
      return spot.creature.alive;
    }).length;
    this.alive = surrounding === 3 || surrounding === 2 && this.alive;
    return true;
  }
}, function () {
  this.alive = Math.random() < 0.5;
});


terra.registerCA({
  type : 'infectable',
  colors : {
    healthy : chroma(blue[2]).rgba(),
    immune : chroma(blue[1]).rgba(),
    vaccinated : chroma(green[2]).rgba(),
    vaccinatedFail : chroma(green[4]).rgba(),
    sick : chroma(yellow[2]).rgba(),
    dead : chroma(grey[2]).rgba()
  },
  colorFn : function() {
    // console.log(this.state, this.colors[this.state]);
    return this.colors[this.state];
  },
  process : function(neighbors, x, y) {
    return true;
  }
}, function() {
  this.state = 'healthy';
});

var terrarium = new terra.Terrarium(25, 25, {
  id : 'terrarium',
  background : chroma(grey[3]).rgb(),
  insertAfter : document.getElementById('fieldmarker')
});

terrarium.grid = terrarium.makeGrid('infectable');

terrarium.animate(5);
