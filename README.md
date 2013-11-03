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

![route printer output](data:image/png;base64,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)
