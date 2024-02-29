

var income_form_template = '<div class="container p-3">'+
'<div class="row row-cols-2 row-cols-md-3 g-4">'+

'<div class="col" v-for="(img, key) in models" class="col p-2">'+
'<div class="card">'+
'<img :src="img" class="card-img-top" alt="...">'+
'<div class="card-body">'+
'<h5 class="card-title">{{ key }}</h5>'+
// '<p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>'+
'</div>'+
'</div>'+
'</div>'+
'</div>'+
'</div>';

Vue.component('booking', {
    template:income_form_template,
    props: ['models'],
    data: function() {
        return {
            errorMsg:"",
        }
    },
    filters: {
        no_data: function(str) {
            return str?str:"-" ;
        },
    },
    methods: {
        select_svc: function (svc_id, item) {
            var self = this;
            // this.suite = '';
            if (this.target_svc[svc_id].includes(item.id)) {
                this.target_svc[svc_id] = this.target_svc[svc_id].filter(_id => _id !== item.id);
            } else if (this.target_svc[svc_id].length < this.services[svc_id].max) {
                this.target_svc[svc_id].push(item.id);
            } else {
                this.target_svc[svc_id] = [item.id];
            }
            // this.select_suite(this.chk_suite());  
        }
    },
    mounted () {
    },
    created () {
    }
});

var vue_export;
vue_export = new Vue({
    el: "#vue",
    data: data,
});