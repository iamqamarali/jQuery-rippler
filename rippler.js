(function($ , window , undefined){
    "use strict"

    $.fn.rippler = function(arg = {}){

        var rippler = null;

        // Initialize the plugin if not allready initiallized
        this.each(function(){
           destroyRipper(this);

            rippler = new $.Rippler(this , arg);
            $.data(this , rippler );
        })


        // If Selector is provided in the Argss Object;
         if(this.length == 0 && arg instanceof Object && arg.selector != undefined  )
         {
             $(arg.selector).each(function(){  
                 destroyRipper(this) 
             });
             return new $.Rippler(this , arg);
         }


        // if some method is provided call the method
        if(typeof arg == 'string')
        {
            this.each(function(){
                if($.data(this)[arg]){
                    if(arg == 'destroy' )
                        destroyRipper(this) 
                    else
                        $.data(this)[arg]();           
                }
                else
                    throw new Error('method ' + arg +' not defined on rippler ');
            })
        }

        
        return this;
    }


    // Constructor
    $.Rippler = function(elm , options){
        this.elm = $(elm) ;
        this.opts = options;

        this.init();
    }


    // Defaults
    $.Rippler.defaults = {
        selector :  ''  ,
        color    :  ''  ,
        duration : 1000 , 
        classes  : { ripplerContainer : "rippler-container" , ripple : "ripple"  }
    }



    // Plugin Methods

    $.extend($.Rippler.prototype , {
        rippler : '1.0',

        init : function()
        {

            var opt = $.extend({}  , $.Rippler.defaults ,  this.opts);
            var self = this;
            if(this.elm.length )
            {
                this.elm.off("click.rippler")
                this.elm.on("click.rippler", this.makeRipple.bind(this));
            }

            if(opt.selector)
            {
                $(document.body).undelegate( opt.selector , "click.rippler" );
                $(document.body).delegate( opt.selector , "click.rippler" , function(e){
                    self.elm = $(this);
                    self.makeRipple.call(self , e);
                });    
            }

            return this;
        },
        
        makeRipple: function(e)
        {
            var opt = $.extend({} , $.Rippler.defaults , this.opts);
            var $this = this.elm;

            var color = '';
            var classes = opt.classes;

            if(opt.color)
                color = opt.color
            else
                color = getColor($this)

            if( " absolute relative fixed".indexOf(  $this.css("position") )  == -1 )
                $this.css({"position" : "relative"  , "overflow" : "hidden"});
    
            if($this.children("."+classes.ripplerContainer).length == 0 )
                $this.append("<div class=' "+classes.ripplerContainer+" '></div>");
    
            var size =  $this.outerWidth() * 1.4  ,

                $ripplerContainer = $this.children("."+classes.ripplerContainer) ,            
            
                $ripple = $("<div class=' " + classes.ripple + " '></div>").css({
                        "top" : ( (e.clientY-$this.offset().top)+$(window).scrollTop()) +"px" ,
                        "left": (e.clientX-$this.offset().left) + "px" ,
                        "box-shadow" : "0px 0px 0px 0px "+ color,
                        "background-color" : color,
                        'transition' : ' all ' + opt.duration/2.3 + 'ms ease-in , opacity ' + opt.duration/3.1 + 'ms ' + opt.duration/1.4 + 'ms ease-in'
                    });
    
            $ripplerContainer.show().append($ripple);
    
            setTimeout(function(){
                $ripple.css({
                    "box-shadow" : "0px 0px 0px "+ size+"px "+ color,
                    opacity  : 0
                });
                setTimeout(function(){
                    $ripple.remove();
                    if($ripplerContainer.find('.'+classes.ripple).length == 0 )
                        $ripplerContainer.hide();
                } , opt.duration);
            } , 20);
            
            return this;
        },


        destroy: function()
        {
            if(this.elm.length )
                this.elm.off("click.rippler");

            if(this.opts.selector)
                $(document.body).undelegate( this.opts.selector , "click.rippler" );
            return this;
        }

    });



    // Utility Methods
    function getColor($elm)
    {
        if($elm.css("color")){
            var temp = $elm.css("color");
                temp = temp.substr(4);
                temp = temp.substr(0 , temp.length-1);
                temp = temp.split(",");
            return  "rgba("+temp[0]+" ,"+temp[1]+" ,"+temp[2]+" , 0.15 )";
        }

        return "rgba(235,235,235 , .15 )";
    }

    function destroyRipper(elm)
    {
        rippler = $.data(elm);
        if(rippler.init)
        {
            rippler.destroy();
            $.removeData(elm);
        }
    }


}(jQuery , window));

