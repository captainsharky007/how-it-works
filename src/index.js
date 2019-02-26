require('./index.html');
import 'bootstrap/js/dist/util';
import 'bootstrap/js/dist/dropdown';
import 'bootstrap/js/dist/modal';
import $ from 'jquery';
import './css/style.scss';

// Scroll animation when user clicks on anchor links
$(document).on('click', '#whatsonpage a[href^="#"]', function(event) {
    event.preventDefault();
    $('html, body').animate({
        scrollTop: $($.attr(this, 'href')).offset().top
    }, 500);
});

$('#video').on('show.bs.modal', function() {
    $('.modal-backdrop').css({ opacity:1, backgroundColor: 'white' });
})

// Stop youtube video when modal window is closed
$('#video').on('hidden.bs.modal', function() {
    var frame = document.getElementById("youtube-iframe");
    frame.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
})


$('#video').on('shown.bs.modal', function() {
    var frame = document.getElementById("youtube-iframe");
    frame.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
})