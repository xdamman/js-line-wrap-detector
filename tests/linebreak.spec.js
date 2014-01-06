var detector = require('lineWrapDetector');

describe("detector.getLines", function() {

  var p;

  beforeEach(function() {
    p = document.createElement('p');
    p.innerHTML = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore alias ullam eveniet <b>officiis consequatur laboriosam</b> porro aliquid minima eum impedit. Suscipit minima eligendi <a href="">necessitatibus <i>consequuntur pariatur</i> natus</a> quae placeat. Suscipit.';
  });

  afterEach(function() {
    p.remove();
    p = null;
  });

  it("everything on one line", function() {
    p.style.width = '1550px';
    document.body.appendChild(p);
    var lines = detector.getLines(p);
    expect(lines[0].length).to.equal(30);
  });

  it("multiple lines", function() {
    p.style.width = '600px';
    document.body.appendChild(p);
    var lines = detector.getLines(p);
    expect(lines.length).to.equal(3);
    expect(lines[0].length+lines[1].length+lines[2].length).to.equal(30);
  });

  it("many more lines", function() {
    p.style.width = '200px';
    document.body.appendChild(p);
    var lines = detector.getLines(p);
    expect(lines.length).to.equal(9);
  });

});

describe("detector.wrapWords", function() {

  it("wraps a single word text", function() {

    expect(detector.wrapWords("hello","a","b")).to.equal("ahellob");

  });

  it("wraps a 2 word text", function() {
    expect(detector.wrapWords("hello world","a","b")).to.equal("ahellob aworldb");
  });

});

describe("wrap paragraph", function() {

  var p;

  beforeEach(function() {
    p = document.createElement('p');
  });

  afterEach(function() {
    p.remove();
    p = null;
  });

 it("wrap a simple one word paragraph", function() {

    p.innerHTML = 'Lorem';
    detector.wrapWordsInElement(p);

    expect(p.innerText).to.equal('Lorem');
    expect(p.innerHTML).to.equal('<span class="js-detect-wrap">Lorem</span>');

  });

  it("wrap a one level mutiple  word paragraph", function() {

    p.innerHTML = 'Lorem ipsum latum.';
    detector.wrapWordsInElement(p);

    expect(p.innerHTML).to.equal('<span class="js-detect-wrap">Lorem</span> <span class="js-detect-wrap">ipsum</span> <span class="js-detect-wrap">latum.</span>');
    expect(p.innerText).to.equal('Lorem ipsum latum.');

  });
 

  it("wrap a two level deep mutiple  word paragraph", function() {

    p.innerHTML = 'Lorem <b>ipsum latum</b> latum.';
    detector.wrapWordsInElement(p);

    expect(p.innerHTML).to.equal('<span class="js-detect-wrap">Lorem</span> <b><span class="js-detect-wrap">ipsum</span> <span class="js-detect-wrap">latum</span></b> <span class="js-detect-wrap">latum.</span>');
    expect(p.innerText).to.equal('Lorem ipsum latum latum.');

  });
 

  it("wrap a 3 level deep mutiple  word paragraph", function() {

    p.innerHTML = 'Lorem <b>ipsum <i>latum</i></b> latum.';
    detector.wrapWordsInElement(p);

    expect(p.innerHTML).to.equal('<span class="js-detect-wrap">Lorem</span> <b><span class="js-detect-wrap">ipsum</span> <i><span class="js-detect-wrap">latum</span></i></b> <span class="js-detect-wrap">latum.</span>');
    expect(p.innerText).to.equal('Lorem ipsum latum latum.');

  });
 
  it("does something right", function(done) {

    p.innerHTML = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore alias ullam eveniet <b>officiis consequatur laboriosam</b> porro aliquid minima eum impedit. Suscipit minima eligendi <a href="">necessitatibus <i>consequuntur pariatur</i> natus</a> quae placeat. Suscipit.';

    expect(p.children.length).to.equal(2);

    var initialText = p.innerText;
    detector.wrapWordsInElement(p);

    expect(initialText).to.equal(p.innerText);

    done();

  });

});
