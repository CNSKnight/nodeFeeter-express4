document.addEventListener('DOMContentLoaded', function() {
        document.body.addEventListener('submit', function(e) {
            e.preventDefault();
            var form = e.target || e.srcElement, 
                i = form.querySelectorAll('input')[0];
                handle = i && i.value;
                
            handle && (window.location.href=form.action+handle+'/');
        });
});
