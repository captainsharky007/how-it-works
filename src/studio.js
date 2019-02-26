require('./studio.html');
import './css/studio.scss';
import 'bootstrap/js/dist/carousel';
import 'bootstrap/js/dist/tooltip';

$('.carousel').carousel({
  interval: 0
})

$('[data-toggle="tooltip"]').tooltip();

$('#carousel').on('slide.bs.carousel', function (data) {
	var id = "#text-for-slide-";
	$(id + data.from).slideToggle();
	$(id + data.to).slideToggle();
});
