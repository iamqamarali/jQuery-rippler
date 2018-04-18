# rippler.js

it is a javascript plugin for jquery.


# Description
it creates ripples inside what ever Dom object you have selector you will supply
You can use it using 2 approches, there is a little difference between both approches i'll explain it first take a look at the **syntax**

Syntax
```javascript
    
    $('.button').rippler()


    // or
    $().rippler({
        selector : '.button'
    });

```

### First Approch to instanciate
When you initialize the rippler on some DOM object using first approch `$('.selector').rippler()` it creates the instance of `$.Rippler` for each of the selected **dom element** and attach to instance to it.

### Second Approch to instanciate
While if you use the second approch in which you dont provide the selector to the jquery function `$().rippler({ selector : '.button'});` which means it will create the **ripple effect** on the DOM Objects present now and on those DOM Objects created in the future dynamically as long as they have the class provided to the `selector` option in the options object


# Options
There are some options that you can supply to the rippler function as an argument
 1. Color
 ⋅⋅* You can supply the color of the ripple. By default the plugin will extract the text color the on element and make it the color of the ripple.
 2. Duration
 ⋅⋅* You can specify the duration the ripples should take to end in miliseconds.

**Example**
```javascript
    
    $('.button').rippler({
        color : "rgba(255 , 255 , 255 , .1)",
        duration : 800
    })

```


# Calling methods 
You can call the methods defined on the rippler instance by just passing the method name to the rippler function.

**Example**
```javascript
    
    $('.button').rippler('destroy')

```



# Defaults

You can change the defaults by overwriting the object `$.Rippler.defaults`

# Adding Custom Methods

Any Method attach to the `Prototype` of the `$.Rippler` will automatically going to be available in the rippler instance so you can use it freely.


