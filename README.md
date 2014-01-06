# jsLineWrapDetector

Detect where the text wrap in any dom element.

## Usage

    <script src="src/lineWrapDetector.js"></script>
    <script>
    var ps = document.getElementsByTagName('p');
    var p = ps[0];
    var lines = lineWrapDetector.getLines(p);
    console.log(lines.length+" lines: ", lines);
    </script>

With `RequireJS`:

    <script>
    require(['src/lineWrapDetector'], function(detector) {
      var ps = document.getElementsByTagName('p');
      var p = ps[0];
      var lines = detector.getLines(p);
      console.log(lines.length+" lines: ", lines);
    });
    </script>
    
## Tests

    npm install; npm test