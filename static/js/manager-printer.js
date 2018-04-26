$(document).ready(function(){

    //for mobile css
    if(/Android|webOS|iPhone|iPad|BlackBerry/i.test(navigator.userAgent)) {
    } else {
	    var css = $('#css').attr('href');
	    css = css.replace(/-mobile/g, '');
	    $('#css').attr('href', css);
    }
    $('.tab').hide();
    $(document).on('click', '.back', function(){
	    window.location.replace('/manager-home');
    });
    $(document).on('click', '.menu .add', function(){
	    $('.tab').hide();
	    $('.printer-add').show();
    });
    $(document).on('click', '.menu .del', function(){
	    $('.tab').hide();
	    $('.printer-del').show();
    });
    $(document).on('click', '.menu .show', function(){
	    $('.tab').hide();
	    $('.printer-show').show();
	    $.postJSON(
	        '/manager-printer-show',
	        {},
	        function(response){
		        if(response.status != 'ok') return;
		        var printers = response.printers;
		        var p = $('.printer-show tbody').empty();
		        for(var i in printers) {
		            
		            var one = printers[i];
                    var tr = $('<tr><td class="name">0001</td> <td class="ip">192.168.1.5</td> </tr>');
                    tr.find('.name').text(one.name);
                    tr.find('.ip').text(one.ip);
                    p.append(tr);
		        }
	        }
	    );
    });
    $(document).on('click', '#printer-add-button', function(){
	    var name = $('#printer-name').val();
	    name = trim(name);
        var ip = $('#printer-ip').val();
        ip = trim(ip);
	    if(name== '') return;
        if(ip == '') return;
	    $.postJSON(
	        '/manager-printer-add',
	        {'name': name, 'ip': ip},
	        function(response) {
		        if(response.status == 'ok') {
		            $('#printer-name').val('');
                    $('#printer-ip').val('');
		        }
	        }
	    );
    });
    $(document).on('click', '#printer-del-button', function(){
	    var printer = $('#printer-del').val();
	    printer = trim(printer);
	    if(printer == '') return;
	    $.postJSON(
	        '/manager-printer-del',
	        {'printer': printer},
	        function(response) {
		        if(response.status == 'ok') {
		            $('#printer-del').val('');
		        }
	        }
	    );
    });
});
