#  Emitter2

emitter2 is a Titanium port of the [EventEmitter2](https://github.com/hij1nx/EventEmitter2) for node.js.
Don't cross the native bridge if you don't have to create and call event emitters from javascript for better performance.

_For a more detailed explanation there is a great blog post by David Bankier [The Toll on the Kroll Bridge ](http://www.yydigital.com/blog/2012/6/18/The_Toll_On_The_Kroll_Bridge)_

## Features

 - Namespaces/Wildcards.
 - Times To Listen (TTL), extends the `once` concept with `many`.
 - Add and fire native events with a simple wrapper


## Installation
Clone the github repo and move the module to your apps commonjs module directory

```bash
$ tipm install tipm/events2
```

Add the module to you `tiapp.xml`

```xml
<modules>
  <module version="0.1.0">tipm-emitter2</module>
</modules>
```

## Setup
The Config takes a configuration object.

```javascript
    var EventEmitter = require('tipm-emitter2');
    var events = new EventEmitter({
      wildcard: true, // should the event emitter use wildcards.
      delimiter: '::', // the delimiter used to segment namespaces, defaults to `.`.
      maxListeners: 20, // the max number of listeners that can be assigned to an event, defaults to 10.
    });
```

### Add a listeners for Native Proxy event with the `proxy` Namespace

*Only Proxy EventListners are hooked to the native events right now.

*If you manually fire a proxy event listener it will fire your listener but not the native event

```javascript

    // Inherit from EventEmitter2
    WrappedView.prototype.__proto__ = EventEmitter.prototype;
    WrappedView.prototype.constructor = WrappedView;

    //Create WrapperView Object
    function WrapperView(options) {
      this.proxy = Ti.UI.createView(options);
    }

    var view = new WrapperView({top:10, left:10, height:10, width:10});

    // Add Proxy EventListener
    view.on('proxy.click', function(e){
      //Do something...
    });

    // Fire Proxy EventListner
    view.emit('proxy.click', {/*optional data to pass*/});
```

### Getting the actual event that fired.
```javascript
    app.on('foo.*', function(value1, value2) {
      console.log(this.event, value1, value2);
    });
```

### Fire an event N times and then remove it, an extension of the `once` concept.
```javascript
    app.many('foo', 4, function() {
      console.log('hello');
    });
```

### Pass in a namespaced event as an array rather than a delimited string.
```javascript
    app.many(['foo', 'bar', 'bazz'], function() {
      console.log('hello');
    });
```


## API

When an `EventEmitter` instance experiences an error, the typical action is
to emit an `error` event. Error events are treated as a special case.
If there is no listener for it, then the default action is to print a stack
trace and exit the program.

All EventEmitters emit the event `newListener` when new listeners are
added.


**Namespaces** with **Wildcards**
To use namespaces/wildcards, pass the `wildcard` option into the EventEmitter constructor.
When namespaces/wildcards are enabled, events can either be strings (`foo.bar`) separated
by a delimiter or arrays (`['foo', 'bar']`). The delimiter is also configurable as a
constructor option.

An event name passed to any event emitter method can contain a wild card (the `*` character).
If the event name is a string, a wildcard may appear as `foo.*`. If the event name is an array,
the wildcard may appear as `['foo', '*']`.

If either of the above described events were passed to the `on` method, subsequent emits such
as the following would be observed...

```javascript
   emitter.emit(['foo.bazz']);
   emitter.emit(['foo', 'bar']);
```

### emitter.on(event, listener)

Adds a listener to the end of the listeners array for the specified event.

```javascript
    app.on('data', function(value1, value2, value3 /* accepts any number of expected values... */) {
      console.log('The event was raised!');
    });
```

```javascript
    app.on('data', function(value) {
      console.log('The event was raised!');
    });
```

### emitter.addListener(event, listener)
Adds a listener to the end of the listeners array for the specified event.
Alias of `EventEmitter.on`

```javascript
javascript app.addListener('data', function(value1, value2, value3 /* accepts any number of expected values... */) { console.log('The event was raised!'); });

javascript app.addListener('data', function(value) { console.log('The event was raised!'); });
```

### emitter.onAny(listener)

Adds a listener that will be fired when any event is emitted.

```javascript
    app.onAny(function(value) {
      console.log('All events trigger this.');
    });
```

### emitter.offAny(listener)

Removes the listener that will be fired when any event is emitted.

```javascript
    app.offAny(function(value) {
      console.log('The event was raised!');
    });
```

### emitter.once(event, listener)

Adds a **one time** listener for the event. The listener is invoked only the first time the event is fired, after which it is removed.

```javascript
    app.once('get', function (value) {
      console.log('Ah, we have our first value!');
    });
```

### emitter.many(event, timesToListen, listener)

Adds a listener that will execute **n times** for the event before being removed. The listener is invoked only the first time the event is fired, after which it is removed.

```javascript
    app.many('get', 4, function (value) {
      console.log('This event will be listened to exactly four times.');
    });
```


### emitter.off(event, listener)

Remove a listener from the listener array for the specified event. **Caution**: changes array indices in the listener array behind the listener.

```javascript
    var callback = function(value) {
      console.log('someone connected!');
    };
    app.on('get', callback);
    // ...
    app.removeListener('get', callback);
```

### emitter.removeListener(event, listener)
Alias `of EventEmitter.off`
Remove a listener from the listener array for the specified event. **Caution**: changes array indices in the listener array behind the listener.

```javascript
    var callback = function(value) {
      console.log('someone connected!');
    };
    app.on('get', callback);
    // ...
    app.removeListener('get', callback);
```

### emitter.removeAllListeners([event])

Removes all listeners, or those of the specified event.


### emitter.setMaxListeners(n)

By default EventEmitters will print a warning if more than 10 listeners are added to it. This is a useful default which helps finding memory leaks. Obviously not all Emitters should be limited to 10. This function allows that to be increased. Set to zero for unlimited.


### emitter.listeners(event)

Returns an array of listeners for the specified event. This array can be manipulated, e.g. to remove listeners.

```javascript
    app.on('get', function(value) {
      console.log('someone connected!');
    });
    console.log(console.log(app.listeners('get')); // [ [Function] ]
```

### emitter.listenersAny()

Returns an array of listeners that are listening for any event that is specified. This array can be manipulated, e.g. to remove listeners.

```javascript
    app.onAny(function(value) {
      console.log('someone connected!');
    });
    console.log(console.log(app.listenersAny()[0]); // [ [Function] ] // someone connected!
```

### emitter.emit(event, [arg1], [arg2], [...])

Execute each of the listeners that may be listening for the specified event name in order with the list of arguments.

## License

(The MIT License)

Copyright (c) 2012 Christian Sullivan &lt;cs@euforic.co&gt;

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.