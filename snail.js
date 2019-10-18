
const generateS4 = () => Math.floor(Math.random() * 0x10000).toString(16);
const generateUserId = () => generateS4() + generateS4() + generateS4() + generateS4();
const generateSessionId = () => new Date().getTime();

var Snail = (configurations) => {
    // **************************************************************************************************     
    //  Variable to Snail
    // **************************************************************************************************
    let windowAlias = window;
    let hostname = windowAlias.location.hostname;
    let Protocol = windowAlias.location.protocol;
    let pttOpen = windowAlias.XMLHttpRequest.prototype.open;
    let pttSend = windowAlias.XMLHttpRequest.prototype.send;

    // **************************************************************************************************     
    //  Check for id
    // **************************************************************************************************
    let checkEgg = hostname => {return localStorage.getItem(hostname);};
    
    let layEgg = (hostname, content=(generateUserId()+":"+generateSessionId())) => {
        localStorage.setItem(hostname, content);
        return localStorage.getItem(hostname);
    };

    let grabEgg = hostname => {
        return checkEgg(hostname) ? localStorage.getItem(hostname) : layEgg(hostname); 
    };
    let updateEgg = (hostname,egg) => {
        egg = egg.split(":");
        let previousSession = Number(egg[1]);
        let newSession = generateSessionId();
        let session_id = (((newSession - previousSession) > 1800000) ? newSession : previousSession);
        return layEgg(hostname, egg[0]+":"+session_id) 
    }
    let egg = updateEgg(hostname, grabEgg(hostname));

    console.log(egg);
    // **************************************************************************************************     
    //  Click Event Listener
    // **************************************************************************************************

    document.onclick = (e) =>{
        // console.log(e);
        // console.log(window.event.srcElement);
        // console.log(e.target);
        let click = (window.event) ? window.event.srcElement : e.target;
        let tags = document.getElementsByTagName(click.tagName);

        for(var i=0;i<tags.length;++i){
            if(tags[i]==click)
            {
                console.log(tags[i]);
                console.log(click.tagName);
            }    
        }
    };
    // **************************************************************************************************     
    //  Cursor Movement Tracker Listener
    // **************************************************************************************************

    (() => {
        window.onmousemove = function(e){
            // console.log(`Movement ${e.screenX},${e.screenY} - ${new Date().getTime()}`);
        }
     })();


    // **************************************************************************************************     
    //  API Event Listener
    // **************************************************************************************************
    // let windowAlias = window;
    // let pttOpen = windowAlias.XMLHttpRequest.prototype.open;
    // let pttSend = windowAlias.XMLHttpRequest.prototype.send;

    let startMunch = (() => {
        window.XMLHttpRequest.prototype.send = function(){
            console.log(arguments)
            return pttSend.apply(this, [].slice.call(arguments));
        };
    })
    // let openReplacement = (() =>{
    //     return pttOpen.apply(this, arguments)
    // });

    // let sendReplacement = (() =>{
    //     if(this.onreadystatechange) {
    //         this._onreadystatechange = this.onreadystatechange;
    //       }
         
    //       console.log('Request sent');
          
    //       this.onreadystatechange = onReadyStateChangeReplacement;
    //       return pttSend.apply(this, arguments);
    // });

    // function onReadyStateChangeReplacement() {  
  
    //     console.log('Ready state changed to: ', this.readyState);
        
    //     if(this._onreadystatechange) {
    //       return this._onreadystatechange.apply(this, arguments);
    //     }
    //   }

    // window.XMLHttpRequest.prototype.open = openReplacement;  
    // window.XMLHttpRequest.prototype.send = sendReplacement;
    // let startMunch = (() => {
    //     window.XMLHttpRequest.prototype.open = function() {
    //         console.log( arguments );
    //         return pttOpen.apply(this, [].slice.call(arguments));
    //     };
    // });

    // let startDigest = (() => {
    //     window.XMLHttpRequest.prototype.send = function() {
    //         console.log( arguments );
    //         return pttSend.apply(this, [].slice.call(arguments));
    //     };
    // });

    // startMunch();
    // startDigest();

}

var init = () => Snail("");
