/*
 * candyPopup
 * author: Austin Anderson
 * (c) Dyologic LLC
 * Licensed under MIT
 */
  (function($){
    var methods = {
        options : {
            dimensions : {}, //if you want fixed height width
            darkness : "30", //percent
            shadow : "0 0 6px 0 rgba(2,2,2,0.5)", //box shadow props
            content : "<div>asdsadsad!</div>",
            transitionIn : "sexySweep",
            transitionOut : "sexySweep",
            exitButton : true,
            tint : "rgba(100,100,255)",
            closeButtonId : "#closeMe",
            attachment : 'body' //defaults to body
            },
        create : function(opts, globalName){
          var self = this;
            $.extend(opts,this.options);
            console.log(this.options);
            var op = this.options;
            op.name = globalName,
            newName = '#candyPopup-modal-'+this.options.name+'';
            $(op.attachment).prepend(this.prep());
            if(op.tint){
              $(newName).find('.candyPopup-shell').css({"background" : op.tint});
            }
            if(op.shadow){
              $(newName).find('.candyPopup-shell').css({"box-shadow" : op.shadow});
              }
            if(op.darkness){
              var decimal = op.darkness/100;
              $(newName).css({"background" : "rgba(2,2,2,"+decimal+""});
              
            }
            this.transition("in",newName, function(){
              console.log("working");
              });
            $(newName).bind('click',function(){
                 self.close($(this).attr('id'),self.options.transitionOut);           
              });
            $(newName).find('.candyPopup-close').bind('click',function(){
              self.close($(this).parents('.candyPopup-modal').attr('id'),self.options.transitionOut);  
              });
        },
        destroy : function(id){
          console.log(id,"destroy");
        $(id).remove();
        },
        prep : function(){
          var  exit = this.options.exitButton ? "<div class='candyPopup-close'><span>x</span></div>" : "",
          back = "<div class='candyPopup-modal' id='candyPopup-modal-"+this.options.name+"'>\
          <div class='candyPopup-outerWrapper'>"+exit+"\
                         <div  class='candyPopup-shell'>\
                         <div  class='candyPopup-inner'>"+this.options.content+"\
                         </div>\
                         </div>\
                         </div>\
          </div>";
          return back;
        },
        close : function(id,transition){
          var self = this;
          this.transition("out",id,function(){
            self.destroy(id);
            });
        },       
        transition : function(type,id,callback){
          var self = this;
         if(type == "in"){
          $(id).fadeIn(300);
         }else{
          $(id).fadeOut(300);
          }
          var tim;
          tim = setTimeout(function(){
          $(id).find('.candyPopup-outerWrapper').addClass(self.options.transitionIn+"-"+type);
          if(callback !== undefined){
          callback();
           console.log(callback);
         }
         clearTimeout(tim);
            },100);
        }
        
    };
    
    $.candyPopup = function(opts){
      var id = Math.round(Math.random()*1000),
      globalName = "candyPopup-"+id+"";
      methods.create(opts,globalName);
    };
    })(jQuery);