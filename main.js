let YtEmbedCodeGenerator = {
    generate: function(){}
};    

(function() {
    function getVideoIdFromDefaultUrl(url) {
        let params = url.split('?')[1];
        params = params.split('&');
        for(let i = 0; i < params.length; i++) {
            let p = params[i].split('=');
            if(p[0] != 'v') {
                continue;
            }
            return p[1];
        }
        return null;
    }

    function getVideoIdFromShareUrl(url) {
        let arr = url.split('/');
        return (arr.slice(-1)[0]).trim();
    }

    function getVideoId(url) {
        if(url.indexOf("youtu.be") > -1) {
            return getVideoIdFromShareUrl(url);
        }else if(url.indexOf("watch") > -1){
            return getVideoIdFromDefaultUrl(url);
        }
        return null;
    }

    function getEmbedUrl(id) {
        return "https://www.youtube.com/embed/"+id;
    }

    function getCode(url) {
        let s = '<iframe width="560" height="315" src="'+url+'"';
        s += 'frameborder="0" allow="accelerometer; autoplay; encrypted-media;';
        s += 'gyroscope; picture-in-picture" allowfullscreen></iframe>';
        return s;
    }

    function generate() {
        let in_url = document.getElementById("inp_url").value;
        let videoid = getVideoId(in_url);
        let embedurl = getEmbedUrl(videoid);
        document.getElementById('output_code').value = getCode(embedurl);
    }

    document.addEventListener("DOMContentLoaded", function(){
        YtEmbedCodeGenerator.generate = generate;
    });
})();