$(document).ready(function(){

    //for mobile css
    if(/Android|webOS|iPhone|iPad|BlackBerry/i.test(navigator.userAgent)) {
    } else {
	    var css = $('#css').attr('href');
	    css = css.replace(/-mobile/g, '');
	    $('#css').attr('href', css);
    }
    window.myorder = {};
    var desk = $('.heading').attr('data-desk');
    var cid = $('.heading').attr('data-cid');
    $(document).on('click', '.left', function(){
	    window.location.replace('/customer-diet?desk='+desk+'&cid='+cid);
    });
    $(document).on('click', '.footer', function(){
	    //$(this).addClass('animation');
	    var did = $('.heading').attr('data-did');
	    var demand = $('.demand').val();
	    demand = trim(demand);
	    var ins = ['+', did, demand];
	    $.postJSON(
	        '/customer-ins',
	        {'desk': desk, 'ins': json(ins)},
	        function(response){
		        if(response.status != 'ok') return;
		        $('.demand').val('');
	        }
	    );
    });
    updater.poll();
});
function show_num(){
    var orders = myorder.orders;
    var left = myorder.left;
    var doing = myorder.doing;
    var done = myorder.done;
    var all = orders.concat(left, doing, done);

    var did = $('.heading').attr('data-did');
    var num = 0;
    for (i in all) {
	    if(all[i].did == did) {
	        num += all[i].num;
	        //$('.demand').val(all[i].demand);
	    }
    }
    $('.num').text(num);
}

var updater = {
    interval: 800,
    stamp: 0,
    cursor: 0,
    xhr: null,
    poll: function(){
	    var desk = $('.heading').attr('data-desk');
        console.log('polling', updater.cursor);
        updater.cursor += 1;
        updater.xhr = $.ajax({
            url: '/customer-update',
            type: 'POST',
            dataType: 'json',
            data: {'desk': desk, 'stamp': json(updater.stamp)},
            success: updater.onSuccess,
            error: updater.onError
        });

    },
    onSuccess: function(response){
        window.myorder = response.myorder;
        updater.stamp = myorder.stamp;
        show_num();
        updater.interval = 800;
        setTimeout(updater.poll, updater.interval);
    },
    onError: function(response, error) {
        console.log(error);
        updater.interval = updater.interval*2;
        setTimeout(updater.poll, updater.interval);
    },
    reset: function(){
        updater.stamp = 0;
        updater.cursor = 0;
        updater.interval = 800;
        updater.xhr.abort();
    }
};
