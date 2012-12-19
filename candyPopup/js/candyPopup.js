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
            submitButtonId : null,
            attachment : 'body' //defaults to body
            },
        create : function(opts, globalName){
          var self = this;
            $.extend(this.options,opts);
            var op = this.options;
            op.name = "#"+globalName,
            newName = this.options.name;
            $(op.attachment).prepend(this.prep());
            if(op.tint){
              $(newName).find('.candyPopup-shell').css({"background" : op.tint});
            }
            if(op.shadow){
              $(newName).find('.candyPopup-shell').css({"box-shadow" : op.shadow});
              }
            if(op.dimensions){
              if(op.dimensions.width !== undefined && op.dimensions.height !== undefined){
                 $(newName).find('.candyPopup-inner').animate({width : op.dimensions.width, height : op.dimensions.height},200);
              }else{
                console.log("width or height is not set!");
              }
              
            }
            if(op.darkness){
              var decimal = op.darkness/100;
              $(newName).css({"background" : "rgba(2,2,2,"+decimal+""});
            }
           
            this.transition("in",newName, function(){
      
              });
            $(newName).bind('click',function(e){
              e.stopPropagation();
                 if(e.target.className == "candyPopup-modal"){
                 self.close('#'+$(this).attr('id'),self.options.transitionOut);
                 }
                 if(op.popupClosedCallBack !== undefined){
                  op.popupClosedCallBack();
                }
              });
            if(op.submitButtonId){
            $(newName).find(op.submitButtonId).bind('click', function(){
                if(op.submitButtonCallBack !== undefined){
                  sop.ubmitButtonCallBack();
                }
                self.close('#'+$(this).parents('.candyPopup-modal').attr('id'),self.options.transitionOut);  
              });
            }
            $(newName).find('.candyPopup-close').bind('click',function(){
              if(op.popupClosedCallBack !== undefined){
                  op.popupClosedCallBack();
                }
              self.close('#'+$(this).parents('.candyPopup-modal').attr('id'),self.options.transitionOut);  
              });

        },
        destroy : function(id){
        $(id).remove();
        },
        prep : function(){
          var  exit = this.options.exitButton ? "<div class='candyPopup-close'><span>x</span></div>" : "",
          back = "<div class='candyPopup-modal' id='"+this.options.name.split('#')[1]+"'>\
          <div class='candyPopup-outerWrapper "+this.options.transitionOut+"-out'>"+exit+"\
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
          var transName = self.options.transitionIn,
           other = self.options.transitionOut;
         }else{
          var transName = self.options.transitionOut,
          other = self.options.transitionIn;
         }
          var tim,
          out;
          tim = setTimeout(function(){
          $(id).find('.candyPopup-outerWrapper').attr('class',"candyPopup-outerWrapper "+transName+"-"+type);
          if(callback !== undefined){
          if(type =="out"){
           out = setTimeout(function(){
            $(id).fadeOut(300);
            callback();
            clearTimeout(out);
            },300); 
          }else{
               callback();
          }
         }
         clearTimeout(tim);
            },100);
        }
        
    };
    
    $.candyPopup = function(opts){
      var id = Math.round(Math.random()*1000),
      globalName = "candyPopup-"+id;
      methods.create(opts,globalName);
      return {close : function(){ methods.close('#'+globalName,opts.transitionOut); }};
    };
    })(jQuery);
