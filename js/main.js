var red = ['#821B0D','#B13631','#D75B5B','#F18788','#FDB9B0'];
var blue = ['#00477A','#2368A0','#4A8AC1','#75AEDC','#A7D2F1'];
var yellow = ['#664400','#8A6318','#AD8536','#D0A95C','#F2CE88'];
var green = ['#1E5124','#337331','#509453','#77B479','#A8D4A1'];
var grey = ['#353131','#5E5959','#8A8585','#B7B4B4','#E6E5E5'];


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
    return this.colors[this.state];
  },
  process : function(neighbors, x, y) {
    var exposed = neighbors.filter(function(i) {
      return i.creature.state === 'sick';
    });
    if( exposed.length > 0 &&
      ['healthy', 'vaccinatedFail'].indexOf(this.state) > -1 &&
      Math.random() > Math.pow(0.8, exposed.length)
    ) {
      this.state = 'sick';
      return true;
    }
    return true;
  }
}, function() {
  var rand = Math.random();
  this.state = rand > 0.9 ? 'immune' : 'healthy';
  this.state = rand < 0.001 ? 'sick' : this.state;
  if(this.state === 'healthy') {
    var rand2 = Math.random();
    this.state = rand2 > 0.9 ? 'healthy' : 'vaccinated'
    this.state = rand2 < 0.1 ? 'vaccinatedFail' : this.state;
  }
});

var terrarium = new terra.Terrarium(100, 100, {
  id : 'terrarium',
  cellSize : 4,
  background : chroma(grey[3]).rgb(),
  insertAfter : document.getElementById('fieldmarker')
});

terrarium.grid = terrarium.makeGrid('infectable');

terrarium.animate(300);
