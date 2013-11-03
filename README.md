express-route-printer
=====================

Print a neat, colorized listing of registered ExpressJS routes. For example:

```javascript
var app = express();

app.get('/foo', fooRoute);
app.post(/regex\/[Rr]outes?/, regexRoute);
app.delete('/fizz/:buzz', fizzBuzzRoute);

require('express-route-printer')(app, console);
```
