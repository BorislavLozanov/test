BROWSER = new Object();
BROWSER.isOpera = navigator.userAgent.indexOf("Opera") > -1;
BROWSER.isIE = navigator.userAgent.indexOf("MSIE") > 1 && !BROWSER.isOpera;
BROWSER.isMoz = navigator.userAgent.indexOf("Mozilla/5.") == 0 && !BROWSER.isOpera;

if (typeof($) != "function")
    $ = function(ID) {
        return document.getElementById(ID);
    }

function redirect(id) {
    alert("This link works only in front-end site!")
}

function popupimg(img) {
    var d = new Date()
    var ID = d.getDate() + "" + d.getMonth() + 1 + "" + d.getFullYear() + "" + d.getHours() + "" + d.getMinutes() + "" + d.getSeconds();

    var loc = "/enlarge.php?src=" + img;
    var win = window.open(loc, "_new" + ID, "toolbar=yes,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=200,height=200");
    win.location.href = loc;
    win.focus();
}

/* highlist elements onmouse over event
 */
function highlight(groupElements, classOver) {
    var i, j, Obj, groupObjects = [];
    for (j = 1; j < 100; j++) {
        for (i in groupElements) {
            Obj = $(groupElements[i] + j);
            if (Obj) {
                Obj.ind = j;
                groupObjects[groupObjects.length] = Obj;
            }
        }
    }

    for (i in groupObjects) {
        Obj = groupObjects[i];
        Obj.classDefault = Obj.className;
        Obj.classOver = classOver;
        Obj.groupObjects = groupObjects;

        Obj.onmouseover = function() {
            this.className = this.classOver;
            for (var i in this.groupObjects) {
                var Obj = this.groupObjects[i];
                if (Obj.ind == this.ind)
                    Obj.className = Obj.classOver;
            }
        }
        Obj.onmouseout = function() {
            this.className = this.classDefault;
            for (var i in this.groupObjects) {
                var Obj = this.groupObjects[i];
                if (Obj.ind == this.ind)
                    Obj.className = Obj.classDefault;
            }
        }
    }
}

function openLink(link) {
    location.href = link;
}

function showVideoCode(boxID) {
    var html = $("#" + boxID).html();
    $("#" + boxID).html("");
    $("#" + boxID).html(html);
}

function showVideoFile(boxID, videoFile) {
    swfobject.embedSWF("/flash/mediaplayer.swf?file=" + videoFile, boxID, "300", "200", "8.0.0", "/js/swfobject/expressInstall.swf",
            {width: "300", height: "200", autostart: false},
    {allowfullscreen: "true", wmode: "transparent"},
    {'id': boxID, 'name': boxID});
}

function showAudioFile(boxID, videoFile) {
    swfobject.embedSWF("/flash/mediaplayer.swf?file=" + videoFile, boxID, "300", "20", "8.0.0", "/js/swfobject/expressInstall.swf",
            {width: "300", height: "20", autostart: false},
    {allowfullscreen: "true", wmode: "transparent"},
    {'id': boxID, 'name': boxID});
}

function playAudio(objID) {
    var Obj = document.getElementById(objID)

    // JW player v.4 play
    if (typeof Obj.sendEvent != "unknown")
        Obj.sendEvent("PLAY");

    // JW player v.5.1
    // if (typeof Obj.play != "unknown") Obj.play();
}

$(document).ready(function() {
    $("a.textImage").fancybox({'overlayOpacity': 0.8, 'titlePosition': 'inside'});

    //ajaxPopIn
    $('a.ajaxPopIn').click(function() {

        $.fancybox.showActivity();
        var title = $(this).attr('title')
        $.ajax({
            type: "GET",
            url: $(this).attr("href"),
            data: "ajaxPopIn=1",
            success: function(html) {
                $.fancybox({
                    'overlayOpacity': 0.8,
                    'titlePosition': 'inside',
                    'title': title,
                    'content': html
                });
            }
        });
        return false;
    });

    //fancyBoxPopIn
    $('span.fancyBoxPopIn a').click(function() {

        $.fancybox.showActivity();
        var title = $(this).attr('title')
        $.ajax({
            type: "GET",
            url: $(this).attr("href"),
            data: "fancyBoxPopIn=1",
            success: function(html) {
                $.fancybox({
                    'overlayOpacity': 0.8,
                    'titlePosition': 'inside',
                    'title': title,
                    'content': '<div id="ajaxPopInBox">' + html + '</div>',
                    'onComplete': function() {
//                        $('#ajaxPopInBox').css({'width':$('#ajaxPopInBox').width()+20+'px', 'height':$('#ajaxPopInBox').height()+20+'px'});
//                        $.fancybox.resize();
                        $('#fancybox-close').attr('href', '#').attr('title', 'Close');
                        $('#fancybox-inner').focus();

                    }
                });
            }
        });
        return false;
    });

});

function jsRedirect(url) {
    window.location.href = url;
}

function openPaymentPage(E, paymentType) {
    if (E.startRedirect)
        return;
    E.startRedirect = true;
    if (paymentType == 'paypal') {
        E.src = "/images/paypal_unactive.gif";
        document.forms['paymentForm'].paymentType.value = paymentType;
    }
    document.forms['paymentForm'].submit();
}

function showAudioFile(boxID, audioFile) {
    swfobject.embedSWF("/flash/mediaplayer.swf?file=" + audioFile, boxID, "370", "20", "8.0.0", "/js/swfobject/expressInstall.swf",
            {width: "370", height: "20", autostart: !BROWSER.isIE},
    {allowfullscreen: "true", wmode: "transparent"},
    {'id': boxID, 'name': boxID});
    // setTimeout("playAudio('" + boxID + "')", 1000);
}

function playAudio(objID) {
    var Obj = document.getElementById(objID)

    // JW player v.4 play
    if (typeof Obj.sendEvent != "undefined")
        Obj.sendEvent("PLAY");


    // JW player v.5
    // if (typeof Obj.play != "unknown") Obj.play();
}

function languageSelect(lang) {
   var selectLang = lang
   window.location.href = '/' + selectLang;

}


$(document).ready(function() {


// var selectedLang = $('#langSelector').find(":selected").text();
// var notSelectedLang = $('#langSelector option:not(:selected)').text();
// var notSelectedLangVal = $('#langSelector option:not(:selected)').attr('value');
// $('#'+notSelectedLang).hide();
// $('#langSelector').hide();
// $('.languages').click(function(){
//     $('#'+notSelectedLang).css('top','40px');
//     $('#'+notSelectedLang).toggle();
// })
// $('#'+notSelectedLang).click(function(){
// languageSelect(notSelectedLangVal);
// })

    $(".contactBtn").click(function() {
        $.fancybox.showActivity();
        $.fancybox({             
            'width': 470,
            'height': 485,
            'enableEscapeButton': false,
            'overlayShow': true,
            'autoScale': true,
            'scrolling': 'no',
            'overlayOpacity': 0.7,
            'hideOnOverlayClick': false,
            'type': 'iframe',
            'href': "/contact-us/?hasLayout=1"
        });
    });
});
