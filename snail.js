
const generateS4 = () => Math.floor(Math.random() * 0x10000).toString(16);
const generateUserId = () => generateS4() + generateS4() + generateS4() + generateS4();
const generateSessionId = () => new Date().getTime();

var Snail = (configurations) => {
    let windowAlias = window;
    let hostname = windowAlias.location.hostname;
    let Protocol = windowAlias.location.protocol;
    let pttOpen = windowAlias.XMLHttpRequest.prototype.open;
    let pttSend = windowAlias.XMLHttpRequest.prototype.send;

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

    let startMunch = (() => {
        window.XMLHttpRequest.prototype.open = function() {
            console.log( arguments );
            return pttOpen.apply(this, [].slice.call(arguments));
        };
    });

    let startDigest = (() => {
        window.XMLHttpRequest.prototype.send = function() {
            console.log( arguments );
            return pttSend.apply(this, [].slice.call(arguments));
        };
    });

    startMunch();
    startDigest();
}

var init = () => Snail("");

(() => {
    let proxied = window.XMLHttpRequest.prototype.open;
    window.XMLHttpRequest.prototype.open = function() {
        console.log("Track Open");
        console.log( arguments );
        return proxied.apply(this, [].slice.call(arguments));
    };
})();

(() => {
    let postxied = window.XMLHttpRequest.prototype.send;
    window.XMLHttpRequest.prototype.send = function() {
        console.log( arguments );
        return postxied.apply(this, [].slice.call(arguments));
    };
})();

(() => {
    let xmlreqc=XMLHttpRequest;
    XMLHttpRequest = function() {
        this.xhr = new xmlreqc();
        return this;
    };
    let responds = window.XMLHttpRequest.prototype.onreadystatechangefunction;
    window.XMLHttpRequest.prototype.onreadystatechangefunction = function() {
        if (this.xhr.readyState == 4){
            console.log("responds");
            console.log(this.xhr.responseText);
        }
        return responds.apply(this, [].slice.call(arguments));
    };
})();