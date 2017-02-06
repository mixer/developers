'use strict';

// Based on: https://stackoverflow.com/questions/4068373/center-a-popup-window-on-screen#4068385
/**
 * Opens a popup window, in the aproximate center of the screen the source window is on.
 */
function popupCenter (url) {
    // Fixes dual-screen position                         Most browsers      Firefox
    var dualScreenLeft = window.screenLeft !== undefined ? window.screenLeft : screen.left;
    var dualScreenTop = window.screenTop !== undefined ? window.screenTop : screen.top;

    var documentClientWidth = document.documentElement.clientWidth;
    var documentClientHeight = document.documentElement.clientHeight;

    var width = window.innerWidth || documentClientWidth || screen.width;
    var height = window.innerHeight || documentClientHeight || screen.height;

    // I fiddled around here to make the W and Height automatic, 1.5 looks good.
    var w = width / 1.5;
    var h = height / 1.5;

    var left = ((width / 2) - (w / 2)) + dualScreenLeft;
    var top = ((height / 2) - (h / 2)) + dualScreenTop;
    var newWindow = window.open(url, '_blank', 'location=0,menubar=0,status=0,toolbar=0' +
        ',width=' + w +
        ',height=' + h +
        ',top=' + top +
        ',left=' + left);

    // Puts focus on the newWindow
    if (window.focus) {
        newWindow.focus();
    }
}

function openImplicitOAuthWindow (scopes) {
    var clientId = 'fa54866255ea641235e596e5659fa726a4aa9f7ecc72758f';
    // var redirectURI = 'https://dev.beam.pro/oauthreturn.html';
    var redirectURI = 'http://localhost:3000/oauthreturn.html';
    var url = 'https://beam.pro/oauth/authorize?response_type=token&' +
        'redirect_uri=' + redirectURI + '&' +
        'scope=' + scopes + '&' +
        'client_id=' + clientId;
    popupCenter(url);
}

/**
 * Retrieve an implicit access token from the url hash
 */
function getAccessToken () {
    var hash = window.location.hash.slice(1);

    if (hash.length === 0) {
        return null;
    }

    var hashParts = hash.split('&');
    for (let i = 0; i < hashParts.length; i++) {
        var item = hashParts[i].split('=');
        if (item[0] === 'access_token') {
            return item[1];
        }
    }

    return null;
}

function handleOAuthResponse () {
    var token = getAccessToken();
    window.opener.replaceToken(token);
    window.close();
}

function replaceToken (token) {
    $('.auth-token').html(token).addClass('retrieved');
}

function registerOAuthClickHandler (scopes) {
    $('.auth-token').off('click').on('click', function (e) {
        if (e.currentTarget.classList.contains('retrieved')) {
            return;
        }
        openImplicitOAuthWindow(scopes);
    });
}
