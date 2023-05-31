function distance(lon1, lat1, shop_info) {
    var lon2 = shop_info[6];
    var lat2 = shop_info[5];
    var R = 6371; // Radius of the earth in km
    var dLat = (lat2-lat1).toRad();  // Javascript functions in radians
    var dLon = (lon2-lon1).toRad(); 
    var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(lat1.toRad()) * Math.cos(lat2.toRad()) * 
            Math.sin(dLon/2) * Math.sin(dLon/2); 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c; // Distance in km
    return d;
}

if (typeof(Number.prototype.toRad) === "undefined") {
    Number.prototype.toRad = function() {
      return this * Math.PI / 180;
    }
}

function post(path, params, method='post') {

    // The rest of this code assumes you are not using a library.
    // It can be made less verbose if you use one.
    const form = document.createElement('form');
    form.method = method;
    form.action = path;

    for (const key in params) {
        if (params.hasOwnProperty(key)) {
        const hiddenField = document.createElement('input');
        hiddenField.type = 'hidden';
        hiddenField.name = key;
        hiddenField.value = params[key];

        form.appendChild(hiddenField);
        }
    }

    document.body.appendChild(form);
    form.submit();
}


function sendPost(url, _params) {
	var form = document.createElement("form");
	form.setAttribute("method", "post");
	form.setAttribute("action", url);
	for (var key in _params) {
		var hiddenField = document.createElement("input");
		hiddenField.setAttribute("type", "hidden");
		hiddenField.setAttribute("name", key);
		hiddenField.setAttribute("value", _params[key]);
		form.appendChild(hiddenField);
	}
	var hiddenSubmit = document.createElement("input");
	hiddenSubmit.setAttribute("type", "submit");
	hiddenSubmit.setAttribute("style", "display:none;");
	form.appendChild(hiddenSubmit);
	document.body.appendChild(form);
	return new Promise(function(resolve,reject){
		$.post(url, _params).done(function(data){
			if (data.length>0 || Object.keys(data).length>0){
				resolve(data);
			}  else {
				reject('Error!');
			}
		}).fail(function(xhr, status, error) {
            reject(error    );
        });
	})
};


function translationStr(str) {
    if (parseInt(str)) {
        return parseInt(str)
    } else if (['', '\r'].includes(str)) {
        return null
    } else {
        return str
    }
};

function csvJSON(csv) {
    var lines=csv.split("\n");
    var result = [];
    var headers=lines[0].split(",");
    for(var i=1;i<lines.length;i++){
        var obj = {};
        var currentline=lines[i].split(",");
        for(var j=0;j<headers.length;j++){
            obj[headers[j].trim()] = translationStr(currentline[j].trim());
        }
        result.push(obj);
    }
    return JSON.stringify(result);
};


var income_form_template = '<div class="container p-3">'+
// '<div class="text-center justify-content-center w-100"><p class="fs-4" style="color: #a77f71;">１００％ 使用資生堂產品・染/燙不分長短均 <sapn style="color:#ea6e42;">＄1,499</span></p></div>' +
// '<div class="text-center" style="width:100%;padding-bottom: 12%; padding-top: 6%;;background-image: url(\'shiseido.png\'); background-repeat: no-repeat;background-attachment: inherit;background-size: 100% auto;">' +

// '<iframe width="60%" style="aspect-ratio: 16 / 9;" src="https://www.youtube.com/embed/ZC97SOmdWZU" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>' +
'<form-wizard ref="form_wizard" id="wizard-title" color="#fcba03" @on-error="handleErrorMessage" @on-complete="submit_record" :start-index="0" @on-change="scroll_to_top" @on-validate="errorMsg=\'\';">' +
'<h2 slot="title" class="text-info" style="position:relative;"></h2>' +
'<div v-show="errorMsg" class="text-center pt-5 pb-3" id="message">'+
'<span class="alert alert-danger" role="alert">{{errorMsg}}</span>'+
'</div>'+
'<tab-content title="髮況自我評估" :before-change="checkStep1" :after-change="scroll_to_top">' +
// '<div :class="\'mx-auto p-4 bg-\'+svc_dict.bg" v-for="(svc_dict, svc_id, index) in services">' +
'<div :class="\'mx-auto ps-4 py-4 bg-\'+svc_dict.bg" v-for="(svc_dict, svc_id, index) in services">' +
'<div colspan="1" role="group" class="row input-group mb-3 align-items-center">'+


'<template v-for="(row_style, style, style_i) in style_dict">' +

'<div v-if="style===\'zoss_ultra\'" class="zoss_ultra col4 zoss-svc-h card zoss-svc p-0 align-self-stretch" style="width: 18rem;">' +
'<img class="zoss-svc card-img-top" :src="svc_dict.bg_img" alt="Card image cap" style="object-fit: cover;height: 100%;"></img>' +
'</div>' +
'<div v-else class="zoss_lite col4 zoss-svc-h card zoss-svc p-0 pe-1 pb-1 align-self-stretch w-50 border-0">' +
'<img class="zoss-svc card-img-top" :src="svc_dict.bg_img" alt="Card image cap" style="object-fit: cover;height: 100%;"></img>' +
'</div>' +
'<div v-if="style===\'zoss_lite\'" class="zoss_lite col zoss-svc-h p-0 pb-1 row input-group align-items-center card mx-0 align-self-stretch border-0" role="group">' +
'<div class="zoss_lite card-header fs-6">' +
'<h3 class="d-inline pb-0 mb-0">{{ svc_dict.name }}</h3>' +
'<span>  {{ svc_dict.detail }}</span>' +
'</div>' +
'</div>' +
'<div :class="chk_style(style)+\' zoss-svc-h p-0 row input-group align-items-center card\'" role="group">' +
'<div class="zoss_ultra card-header fs-6">' +
'<h3 class="d-inline">{{ svc_dict.name }}</h3>' +
'<span>  {{ svc_dict.detail }}</span>' +
'</div>' +
'<div :class="style+\' card-body py-1 px-3\'">' +
'<div :class="\'row \'+row_style+\' justify-content-start\'" role="group">' +
'<div v-for="(item, items_index) in svc_dict.items" class="col p-2">'+
'<div class="w-100 h-100 border border-3 border-dark btn btn-dark position-relative bg-gradient dim align-items-center justify-content-center" :style="\'--bs-border-opacity: .15;display: flex;;min-height:80px;\'" @click="errorMsg=\'\';select_svc(svc_id, item);">' +
'<input type="radio" class="btn-check" :name="svc_id" :id="item.id" autocomplete="off" :value="item.id">' +
'<label role="button" class="w-100" :for="item.id" @click="errorMsg=\'\';select_svc(svc_id, item);">' +
'<p class="card-title h5 text-light p-0">{{ item.name }}</p>' +
// '<span class="font-italic fs-5 text-danger">{{ item.price ? "$"+item.price:"" }}</span>' +
// '<p class="card-text text-secondary fs-6"><u>{{ item.detail }}</u></p>' +
'<div v-if="!target_svc[svc_id].includes(item.id)" class="h-100 position-absolute top-0">' +
// '<h4 class="card-title text-light"></h4>' +
'</div>' +
'<div v-else class="w-100 h-100 position-absolute top-0 btn" style="left: 0;background-color: rgb(33,37,41,0.6);">' +
'<h5 class="card-title text-light position-absolute top-50 start-50 translate-middle"><i style="font-size:80px;" class="fa fa-check-circle text-light opacity-50" aria-hidden="true"></i></h5>' +
'</div>' +
'</label>' +
'</div>' +
'</div>' +
'</div>' +
'</div>' +
'</div>' +

'</template>' +

'</div>' +
'</div>' +
'</tab-content>' +


'<tab-content title="選擇療程" :selected="true" :before-change="checkStep2" class="pb-4">' +
'<div :class="\'mx-auto ps-4 py-4 \'" v-if="suite">' +
'<div colspan="1" role="group" class="row input-group mb-3 align-items-center">'+
'<template v-for="(row_style, style, style_i) in style_dict">' +

'<div v-if="style===\'zoss_lite\'" class="zoss_lite col4 zoss-svc-h.mini p-0 pb-1 row input-group align-items-center card mx-0 align-self-stretch border-0" role="group">' +
'<div class="zoss_lite card-header fs-6">' +
'<h3 class="d-inline pb-0 mb-0">請選擇療程</h3>' +
'<span>已依造您髮況所需，篩選三組適合的療程，請選擇其中一種</span>' +
'</div>' +
'</div>' +
'<div :class="chk_style(style)+\' zoss-svc-h p-0 row input-group align-items-center card\'" role="group">' +
'<div class="zoss_ultra card-header fs-6">' +
'<h3 class="d-inline">請選擇療程</h3>' +
'<span>已依造您髮況所需，篩選三組適合的療程，請選擇其中一種</span>' +
'</div>' +
'<div :class="style+\' card-body py-1 px-3\'">' +
'<div :class="\'row \'+row_style+\' justify-content-start\'" role="group">' +
'<div class="col p-2" v-for="(_suite_id, index) in top_suites()">'+
'<div class="w-100 h-100 border border-3 border-dark btn btn-dark position-relative bg-gradient dim align-items-center justify-content-center" :style="\'--bs-border-opacity: .15;display: flex;;min-height:80px;\'" @click="errorMsg=\'\';select_suite(_suite_id);">' +
'<input type="radio" class="btn-check" name="suite" :id="_suite_id" autocomplete="off" :value="_suite_id">' +
'<label role="button" class="w-100" :for="_suite_id" @click="errorMsg=\'\';select_suite(_suite_id);">' +
'<p class="card-title h5 text-light p-0">{{ suites[_suite_id] }}</p>' +
// '<span class="font-italic fs-5 text-danger">{{ item.price ? "$"+item.price:"" }}</span>' +
'<p class="card-text text-secondary fs-6"><u>{{ suites[_suite_id] }}</u></p>' +
'<div v-if="_suite_id !== suite" class="h-100 position-absolute top-0">' +
// '<h4 class="card-title text-light"></h4>' +
'</div>' +
'<div v-else class="w-100 h-100 position-absolute top-0 btn" style="left: 0;background-color: rgb(33,37,41,0.6);">' +
'<h5 class="card-title text-light position-absolute top-50 start-50 translate-middle"><i style="font-size:80px;" class="fa fa-check-circle text-light opacity-50" aria-hidden="true"></i></h5>' +
'</div>' +
'</label>' +
'</div>' +
'</div>' +
'</div>' +
'</div>' +
'</div>' +
'</template>' +
'</div>' +
'</div>' +
'</tab-content>' +

'<tab-content title="選擇需求" :selected="true" :before-change="checkStep3" class="pb-4">' +
'<div class="mx-auto mt-4 ps-4 py-4 alert alert-info w-50" v-if="suite===\'E\'"">' +
'<p>針對您的髮況，我們已為您規劃『(E) 頂級黑鑽奢養』，可以針對六大頭皮秀髮的問題進行改善，請點選『下一步』了解使用之產品內容</p>' +
'</div>' +
'<div :class="\'mx-auto ps-4 py-4 bg-\'+products[question].bg" v-if="suite && products[question].items.length > 1" v-for="(question, index) in suite_questions[suite]">' +
'<div colspan="1" role="group" class="row input-group mb-3 align-items-center">'+
'<template v-for="(row_style, style, style_i) in style_dict">' +

'<div v-if="style===\'zoss_lite\'" class="zoss_lite col4 zoss-svc-h.mini p-0 pb-1 row input-group align-items-center card mx-0 align-self-stretch border-0" role="group">' +
'<div class="zoss_lite card-header fs-6">' +
'<h3 class="d-inline pb-0 mb-0">{{ products[question].name }}</h3>' +
'<span>  {{ products[question].detail }}</span>' +
'</div>' +
'</div>' +
'<div :class="chk_style(style)+\' zoss-svc-h p-0 row input-group align-items-center card\'" role="group">' +
'<div class="zoss_ultra card-header fs-6">' +
'<h3 class="d-inline">{{ products[question].name }}</h3>' +
'<span>  {{ products[question].detail }}</span>' +
'</div>' +
'<div :class="style+\' card-body py-1 px-3\'">' +
'<div :class="\'row \'+row_style+\' justify-content-start\'" role="group">' +
'<div v-for="(item, items_index) in products[question].items" class="col p-2">'+
'<div class="w-100 h-100 border border-3 border-dark btn btn-dark position-relative bg-gradient dim align-items-center justify-content-center" :style="\'--bs-border-opacity: .15;display: flex;;min-height:80px;\'" @click="errorMsg=\'\';select_product(question, item);">' +
'<input type="radio" class="btn-check" :name="question" :id="item.id" autocomplete="off" :value="item.id">' +
'<label role="button" class="w-100" :for="item.id" @click="errorMsg=\'\';select_product(question, item);">' +
'<p class="card-title h5 text-light p-0">{{ item.name }}</p>' +
// '<span class="font-italic fs-5 text-danger">{{ item.price ? "$"+item.price:"" }}</span>' +
// '<p class="card-text text-secondary fs-6"><u>{{ item.detail }}</u></p>' +
'<div v-if="!target_products.includes(item.id)" class="h-100 position-absolute top-0">' +
// '<h4 class="card-title text-light"></h4>' +
'</div>' +
'<div v-else class="w-100 h-100 position-absolute top-0 btn" style="left: 0;background-color: rgb(33,37,41,0.6);">' +
'<h5 class="card-title text-light position-absolute top-50 start-50 translate-middle"><i style="font-size:80px;" class="fa fa-check-circle text-light opacity-50" aria-hidden="true"></i></h5>' +
'</div>' +
'</label>' +
'</div>' +
'</div>' +
'</div>' +
'</div>' +
'</div>' +
'</template>' +
'</div>' +
'</div>' +
'</tab-content>' +

'<tab-content title="療程內容" class="mt-4" :before-change="checkStep4">' +
'<div class="mx-auto px-3" style="max-width: 400px;">' +
'<div class="row input-group mb-3 align-items-center card border-success" role="group">' +
'<div class="card-header fs-6">' +
'您的專屬療程為: {{ suites[suite] }}' +
'</div>' +
'<div class="card-body">' +
'<blockquote class="blockquote mb-0 p-0 border-0">' +
'<p class="text-danger fs-6" v-if="need_suggestions().length>0">以下項目請稍待服務人員給予專業建議：'+
'<template v-for="(suggestion, suggestion_index) in need_suggestions()">'+
'<br>&emsp;◎{{ suggestion }}'+
'</template>'+
'</p>' +
'<footer class="text-secondary fs-6">療程使用之產品如下：'+
'<template v-for="(product, product_index) in selected_products()">'+
'<br>&emsp;◎{{ product }}'+
'</template>'+
'</footer>' +
'<div class="card-footer bg-transparent text-center fs-6"><input type="checkbox" class="form-check-input" v-model="understood" @focus="errorMsg=\'\'" required><span @focus="errorMsg=\'\'" @click="understood=!understood"> 我同意</span></input>' +
'<div class="invalid-feedback invalid-tooltip position-relative text-center">未勾選</div></div>' +
'</blockquote>' +
'</div>' +
'</div>' +
'</div>' +
'</tab-content>'+
'<template slot="footer" scope="props" class="bg-danger">' +
'<div class=wizard-footer-left>' +
'<wizard-button id="last" v-if="props.activeTabIndex > 0" @click.native="props.prevTab()" class="btn btn-secondary bg-secondary">上一步</wizard-button>' +
'</div>' +
'<div class="wizard-footer-right">' +
'<wizard-button id="next" v-if="!props.isLastStep" @click.native="console.log(props);props.nextTab();" class="btn btn-primary bg-primary">下一步</wizard-button>' +
'<wizard-button id="submit" v-else @click.native="props.nextTab()" class="btn btn-primary bg-primary">{{props.isLastStep ? "送出" : "下一步"}}</wizard-button>' +
'</div>' +
'</template>' +
'</form-wizard>'+
'</div>';

Vue.component('booking', {
    template:income_form_template,
    props: ['name', 'sex', 'tel', 'email', 'title', 'plan_dict', 'shop_list', 'activity', 'services', 'designation', 'suite_questions', 'products', 'suites'],
    data: function() {
        return {
            errorMsg:"",
            suite: "",
            target_shop: "",
            // target_date: moment().add(3, 'd').format("YYYY-MM-DD"),
            target_date: "",
            // name: "工程師測試",
            // sex: "男",
            // tel: "0912345678",
            // email: "",
            target_time: "",
            plan: "",
            note: "",
            understood: false,
            show_sort_btn: true,
            target_svc: Object.assign({}, ...Object.keys(data.services).map((x, idx) => ({[x]: []}))),
            target_products: [],
            style_dict: {"zoss_ultra": "row-cols-4", "zoss_lite": "row-cols-2"},
            shop_designers: {},
        }
    },
    filters: {
        no_data: function(str) {
            return str?str:"-" ;
        },
    },
    methods: {
        chk_style: function (style_str) {
            if (style_str==="zoss_ultra") {
                return `${style_str} col`;
            } else {
                return `${style_str}`;
            }
        },
        city_list: function () {
            return [...new Set(this.shop_list.map(x => x[3]))]       
        },
        select_svc: function (svc_id, item) {
            var self = this;
            this.suite = '';
            if (this.target_svc[svc_id].includes(item.id)) {
                this.target_svc[svc_id] = this.target_svc[svc_id].filter(_id => _id !== item.id);
            } else if (this.target_svc[svc_id].length < this.services[svc_id].max) {
                this.target_svc[svc_id].push(item.id);
            }
            this.select_suite(this.chk_suite());  
        },
        select_product: function (question_id, item) {
            var self = this;
            self.target_products = self.target_products.filter(p => !self.products[question_id].items.map((x) => x.id).includes(p));
            self.target_products.push(item.id);
            // var chk = this.target_products.some(function (element) {return self.products[question_id].items.map((x) => x.id).includes(element);});
            // if (!chk) {
            //     self.target_products.push(item.id);
            // } else if (chk && self.target_products.includes(item.id)) {
            //     self.target_products = self.target_products.filter(x => x !== item.id);
            // }
        },
        select_suite: function(suite_id) {
            var self = this;
            this.suite = suite_id;
            if (this.suite === '') {
                self.target_products = [];
            } else {
                self.target_products = self.suite_questions[this.suite].filter(x => self.products[x].items.length === 1).map(x => self.products[x].items[0].id);
            }
        },
        top_suites: function() {
            var self = this;
            var suites = "ABCDE".split('');
            var result = Array(suites.length).fill(0);
            Object.keys(self.target_svc).forEach((svc_id, svc_id_idx) =>  {
                if (self.target_svc[svc_id]) {
                    var items = self.services[svc_id].items.filter(item => self.target_svc[svc_id].includes(item.id));
                    items.forEach((item, item_idx) =>  {
                        item.score.split('').forEach((score, index) => {
                            result[index] += parseInt(score);
                        })
                    })
                }
            })
            top_suite = suites.map(function(el, i) {return { index: i, value: el };});
            top_suite.sort(function(a, b) {return result[a.index] - result[b.index];});
            console.log(top_suite.map(x => x.value).reverse().slice(0,3));
            console.log(result);
            return top_suite.map(x => x.value).reverse().slice(0,3);
            //this.suite = suite_id;
        },
        chk_suite: function() {
            return this.top_suites()[0]
        },
        onChangeRegion: function (event) {
            console.log(this.region);
            console.log(event.target.value);
            if (this.region === event.target.value) {
                this.region = "";
                $("#"+event.target.id)[0].checked = false;
            } else {
                this.region = event.target.value;
            }
        },
        selectAll: function (option) {
            if (option === 'all') {
                var selected = Array.prototype.concat(...Object.values(this.cols));
            } else {
                var selected = [...this.cols[option]];
            }
            if (this.chk_selectAll(option)) {
                this.selected_cols = [...this.selected_cols.filter(col => !selected.includes(col))];
            } else {
                this.selected_cols = [...this.selected_cols.filter(col => !selected.includes(col)) ,...selected];
            }
        },
        selected_products: function() {
            var self = this;
            var ids = self.target_products.filter(x => !["0", "N"].includes(x.substr(x.length - 1)))
            ids.sort(function(a, b) {return self.suite_questions[self.suite].indexOf(a.slice(0,2)) - self.suite_questions[self.suite].indexOf(b.slice(0,2));});
            var prod = ids.map(x => self.products[x.slice(0,2)].items.filter(y => y.id === x)[0]);
            var names = [].concat(...prod.map(x => x.product?[x.product]:x.suites.map(y => y.product)));
            return names
        },
        need_suggestions: function() {
            var self = this;
            var svc = Object.keys(self.target_svc).filter(x => self.target_svc[x].filter(y => y.substr(y.length - 1) === "0").length === 1).map(x => self.services[x].name);
            var prod = self.target_products.filter(x => x.substr(x.length - 1) === "0").map(x => self.products[x.slice(0,2)].name);
            var items=[...svc, ...prod];
            return items
        },
        checkStep1: function(){
            var self = this;
            return new Promise((resolve, reject) => {
                var chk = Object.keys(self.target_svc).every(function (svc_id) { return  self.target_svc[svc_id].length >= self.services[svc_id].min && self.target_svc[svc_id].length <= self.services[svc_id].max});
                if (!chk) {
                    reject('每一問題至少選擇一項！');
                } else {
                    resolve(true);
                }
             })
        },
        checkStep2: function(){
            var self = this;
            return new Promise((resolve, reject) => {
                if (self.suite === "") {
                    // $('body')[0].scrollIntoView();
                    reject('需選擇一項療程！');
                    // this.scrollTop();
                } else {
                    resolve(true);
                }
             })
        },
        checkStep3: function(){
            var self = this;
            return new Promise((resolve, reject) => {
                if (self.target_products.length !== self.suite_questions[this.suite].length) {
                    // $('body')[0].scrollIntoView();
                    reject('每一需求至少選擇一項！');
                    // this.scrollTop();
                } else {
                    resolve(true);
                }
             })
        },
        checkStep4: function(){
            var self = this;
            $('#form-chk').addClass('was-validated');
            return new Promise((resolve, reject) => {
                if ($('#form-chk')[0].checkValidity()) {
                    resolve(true);
                } else {
                    reject('資料未填寫完整！');
                }
            })
        },
        login: function() {
            liff.init({
                liffId: liffId
            }).then(function() {
                if (!liff.isLoggedIn()) {
                    // liff.login({ redirectUri: "https://localhost:3000/" });
                    var timestamp = new Date();
                    window.zt = timestamp.getTime().toString();
                    setStringifiedStorageItem(window.messagesKey, "");
                    window.addEventListener('storage', window.handleNewMessage);
                    // var liff_url = `https://liff.line.me/${liffId}?zt=${window.zt}`;
                    var liff_url = `${window.location.href.split('?')[0]}?zt=${window.zt}`;
                    window.liff_auth = window.open(liff_url, "_new", "width=480,height=639,left=0,0,top=0,status=0,");
                } else {
                    var timestamp = new Date();
                    window.zt = timestamp.getTime().toString();
                    setStringifiedStorageItem(window.messagesKey, window.zt);
                    vue_export.$refs.report_report.$refs.form_wizard.nextTab();
                };
            }).catch(function(error) {
                console.log(`liff.state init error ${error}`);
            });
		},
        handleErrorMessage: function(errorMsg){
            // window.scrollTo({ top: 0, behavior: 'smooth' });
            this.errorMsg = errorMsg;
            if (!["", null].includes(this.errorMsg)) {
                this.scroll_to_top();
            }
        },
        scroll_to_top:function(){
            // document.body.scrollTop = 0; // For Safari
            // document.documentElement.scrollTop = 0;
            // window.location.href="#wizard-title";
            document.getElementById('wizard-title').scrollIntoView();
            // let item = document.getElementById('wizard-title');
            // let wrapper = $(window)[0];
            // let count = item.offsetTop - wrapper.scrollTop;
            // wrapper.scrollBy({top: count, left: 0, behavior: 'smooth'});
        },
        submit_record: function() {
            loading.isLoading = true;
            $('#submit').prop( "disabled", true );
            var self = this;
            self.errorMsg = "";
            const target_svcs = Object.keys(self.target_svc).filter(svc => self.target_svc[svc]!==null);
            const reserved_svcs = target_svcs.map(svc => {return {svc_name:self.services[svc]["name"], ...self.services[svc]["items"].filter(item => self.target_svc[svc] === item.id)[0]}}).map(x => `${x.svc_name}(${x.name}: \$${x.price})`).join("、");
            return new Promise(function (resolve, reject) {
                var post_body = {
                    "reserve_type": "official",
                    "_vfb-form-id": self.target_shop,
                    "_vfb-submit": "",
                    "vfb-field-142": self.target_date,
                    "vfb-field-143": moment($("#target_time").timepicker().getTime()).format("HH:mm"),
                    "vfb-field-144": self.name,
                    "vfbp-spam": "",
                    "email": self.email,
                    "vfb-field-145": self.sex,
                    "vfb-field-146": self.tel,
                    // "vfb-field-147": self.plan_dict[self.plan],
                    "vfb-field-147": reserved_svcs,
                    "vfb-field-148": self.note,
                    "designation": self.designation,
                };
                // post(data.post_url, post_body);
                // var post_body = {
                //     shop: self.target_shop,
                //     time: moment($("#target_time").timepicker().getTime()).format("HH:mm"),
                //     date: self.target_date,
                //     name: self.name,
                //     tel: self.tel,
                //     note: self.note,
                //     sex: self.sex,
                //     plan: self.plan_dict[self.plan],
                // };
                // vue_export.isLoading=true;
                // var url = data.post_url;
                $.post( data.post_url, post_body ).done(function( data ) {
                    loading.isLoading=false;
                    Swal.fire({
                        text: "已送出！",
                        icon: 'success',
                        confirmButtonText: "關閉",
                    }).then((result) => {
                        // window.location.href = "https://www.zoss.com.tw/about/";
                        resolve(true);
                    })
                }).fail(function (jqXHR, textStatus, errorThrown) { 
                    loading.isLoading=false;
                    $('#submit').prop( "disabled", false);
                    if (typeof textStatus !== "undefined") {
                        Swal.fire({
                            title: '系統錯誤',
                            text: textStatus,
                            icon: "error",
                            timer: 5000
                        }).then((result) => {
                            resolve(true);
                        });
                    } else {
                        // Swal.showValidationMessage(`系統錯誤，請重新操作，若持續發生請通知總公司資訊部`);
                        Swal.fire({
                            title: '系統錯誤',
                            text: `系統錯誤，請重新操作，若持續發生請通知總公司資訊部`,
                            icon: "error",
                            timer: 5000
                        }).then((result) => {
                            resolve(true);
                        });
                    }
                    resolve(true);
                });
            }).catch(error => {
                console.log(error)
                loading.isLoading=false;
                $('#submit').prop( "disabled", false);
                if (typeof error.msg !== "undefined") {
                    Swal.fire({
                        title: '系統錯誤',
                        text: error.msg,
                        icon: "error",
                        timer: 5000
                    });
                } else {
                    // Swal.showValidationMessage(`系統錯誤，請重新操作，若持續發生請通知總公司資訊部`);
                    Swal.fire({
                        title: '系統錯誤',
                        text: `系統錯誤，請重新操作，若持續發生請通知總公司資訊部`,
                        icon: "error",
                        timer: 5000
                    });
                }
            })
        },
        show_suggestion: function() {
            this.reset_err();
            var items=this.sub_category!==''?this.i_e[this.select_i_e][this.category][this.sub_category].map((x) => (this.ids_map[x])):[];
            if (items.length>0 && $("#note").focus().val().length===0) {
                $("#note").focus().val("");
                $("#note").trigger({type: 'keydown', which: 39});
            } else {
                this.income_name = $("#note").focus().val();
            }
        },
        reset_err: function() {
            this.errorMsg = "";
            $( "#category" ).removeClass( "is-invalid" );
            $( "#sub_category" ).removeClass( "is-invalid" );
            $( "#note" ).removeClass( "is-invalid" );
        },
        sort_by_position() {
            var self = this;
            window.navigator.geolocation.getCurrentPosition(function(pos) {
                console.log(pos);
                var lon = pos.coords.longitude;
                var lat = pos.coords.latitude;
                self.shop_list.sort(function(a, b) {
                    return distance(lon, lat, a) - distance(lon, lat, b);
                });
                self.show_sort_btn = false
            }, function(err) {}, {maximumAge:0, timeout:10000, enableHighAccuracy: false});
        },
    },
    mounted () {
        var self = this;
        self.money_src= "";
        self.money_type= "";
        var format = "YYYY-MM-DD";
        var chk_next = parseInt(moment().format("DD")) > 25;
        $("#target_date").on('keydown paste focus', function(e){
            if(e.keyCode != 9) // ignore tab
                e.preventDefault();
        });
        $("#target_date").datepicker({
            format: "yyyy-mm-dd",
            // startDate: moment().format(format),
            startDate: moment().add(3, 'd').format(format),
            // endDate: chk_next?moment().add(1, 'M').endOf('month').format(format):moment().endOf('month').format(format),
            endDate: moment.max([chk_next?moment().add(1, 'M').endOf('month'):moment().add(33, 'd'),moment("2023-01-21", format)]).format(format),
            maxViewMode: 1,
            language: "zh-TW",
            daysOfWeekHighlighted: "0,6",
            autoclose: true,
            immediateUpdates: true,
            zIndexOffset:99990,
            orientation: "bottom",
        }).on('changeDate', function (e) {
            // console.log(month);
            self.target_date = e.format(0, "yyyy-mm-dd");
            var _3d_ymd = parseInt(moment().add(3, 'd').format("YYYYMMDD"));
            var _target_ymd = parseInt(e.format(0,"yyyymmdd"));
            if (_3d_ymd > _target_ymd) {
                var _shop = self.shop_list.filter(x=> x[0]===self.target_shop)[0];
                Swal.fire({
                    icon: 'warning',
                    title: `3天內預約，請直接聯繫分店!`,
                    text:  `${_shop[0]} ${_shop[4]}`,
                    showDenyButton: true,
                    showCancelButton: true,
                    confirmButtonText: `撥打到 ${_shop[0]}`,
                    denyButtonText: `重新選擇日期`,
                    cancelButtonText: `關閉`,
                  }).then((result) => {
                    if (result.isConfirmed) {
                        window.open(`tel:${_shop[4]}`);
                    } else if (result.isDenied) {
                        $("#target_date").datepicker("show");
                    }
                  })
            } else {
                $("#target_time").timepicker().open();
            }
        }).on('hide', function (e) {

            // console.log(e.date);
            // $(datepicker_div).datepicker('destroy').off('changeDate');
        });
        $("#target_time").on('keydown paste focus', function(e){
            if(e.keyCode != 9) // ignore tab
                e.preventDefault();
        });
        $('#target_time').timepicker({
            timeFormat: 'HH:mm',
            interval: 30,
            minTime: '11:30',
            maxTime: '19:00',
            // defaultTime: '11:30',
            startTime: '11:30',
            dynamic: false,
            dropdown: true,
            scrollbar: true,
            zindex: 9999,
            change: function(e) {
                self.target_time = moment(e).format("HH:mm");
            }
        });

        $("#designation").on('keydown paste focus', function(e){
            if(e.keyCode != 9) // ignore tab
                e.preventDefault();
        });

        loading.isLoading = false;
        vue_designer = new Vue({
            el: "#vue_designer",
        });
        // $('#top-menu > * > a').attr("target", "_blank");
        // $('#main-header > div.container.clearfix.et_menu_container > div.logo_container > a').attr("target", "_blank");
    },
    created () {
    }
});

// const designer_html = '<div class="modal fade" id="designer_list" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" data-bs-backdrop="false">' +
const designer_html = '<div class="modal fade" id="designer_list" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">' +
'<div class="modal-dialog modal-dialog-centered modal-lg justify-content-center">' +
'<div class="modal-content">'+
'<div class="container text-center mb-2">' +
'<div class="row row-cols-3">' +
'<div class="col p-2 disigner_mobile" data-bs-dismiss="modal" @click="vue_export.$refs.report_report.designation=\'不指定設計師\';">' +
'<div class="btn btn-outline-light position-relative bg-gradient h-100 w-100" style="min-height:120px;background-color:#e9edc9">' +
'<input type="radio" class="btn-check" name="designer_n" id="designer_n" autocomplete="off" value="不指定設計師">' +
'<label role="button" class="w-100 h-100" for="designer_n">' +
'<h5 class="card-title h4 text-dark py-4">不指定設計師</h5>' +
'</label>' +
'</div>' +
'</div>' +
'<template v-if="shop_designers">' +
'<div class="col p-2 disigner_mobile" data-bs-dismiss="modal" @click="vue_export.$refs.report_report.designation=\'指定女性設計師\';">' +
'<div class="btn btn-outline-light position-relative bg-gradient h-100 w-100" style="min-height:120px;background-color:#e9edc9">' +
'<input type="radio" class="btn-check" name="designer_m" id="designer_m" autocomplete="off" value="指定女性設計師">' +
'<label role="button" class="w-100 h-100" for="designer_m">' +
'<h5 class="card-title h4 text-dark p-0">女性設計師</h5>' +
'<p class="card-text text-secondary text-start my-0 disigner_mobile_fs disigner_mobile_fs">◉ 剪髮費用：<span class="text-danger">比照指定設計師剪髮費用收費</span></p>' +
'</label>' +
'</div>' +
'</div>' +
'<div class="col p-2 disigner_mobile" data-bs-dismiss="modal" @click="vue_export.$refs.report_report.designation=\'指定男性設計師\';">' +
'<div class="btn btn-outline-light position-relative bg-gradient h-100 w-100" style="min-height:120px;background-color:#e9edc9">' +
'<input type="radio" class="btn-check" name="designer_f" id="designer_f" autocomplete="off" value="指定男性設計師">' +
'<label role="button" class="w-100 h-100" for="designer_f">' +
'<h5 class="card-title h4 text-dark p-0">男性設計師</h5>' +
'<p class="card-text text-secondary text-start my-0 disigner_mobile_fs disigner_mobile_fs">◉ 剪髮費用：<span class="text-danger">比照指定設計師剪髮費用收費</span></p>' +
'</label>' +
'</div>' +
'</div>' +
'</template>' +
'<div v-for="(price_dict, designer, designer_idx) in shop_designers" class="col p-2 disigner_mobile" data-bs-dismiss="modal" @click="vue_export.$refs.report_report.designation=designer;">' +
'<div class="btn btn-outline-light position-relative bg-gradient h-100 w-100" style="min-height:120px;background-color:#e9edc9">' +
'<input type="radio" class="btn-check" :name="designer" :id="designer" autocomplete="off" :value="designer">' +
'<label role="button" class="w-100 h-100" :for="designer">' +
'<h5 class="card-title h4 text-dark p-0">{{ designer }}</h5>' +
'<p class="card-text text-secondary text-start my-0 disigner_mobile_fs">◉ 剪髮費用：<span class="text-danger">${{ price_dict.剪髮費用 }}</span></p>' +
'<p v-if="price_dict.指定費 > 0 && price_dict.指定費 < 1000" class="card-text text-secondary text-start disigner_mobile_fs">◉ 染/燙費用異動為 $1499 ➔ <span class="text-danger">${{ 1499+price_dict.指定費 }}</span> ． $1999 ➔  <span class="text-danger">${{ 1999+price_dict.指定費 }}</span></p>' +
'<p v-if="price_dict.指定費 >= 1000" class="card-text text-secondary text-start disigner_mobile_fs">◉ 染/燙費用為 <span class="text-danger">${{ 1499+price_dict.指定費 }}</span> 起，預約前請先與設計師諮詢</p>' +
'</label>' +
'</div>' +
'</div>' +
'</div>' +
'</div>' +
'</div></div></div>';
Vue.component('vue_designer', {
    template:designer_html,
    data: function() {
        return {
            shop_designers: {},
        }
    }
})

Vue.use(VueLoading);
Vue.component('loading', VueLoading)

var loading = new Vue({
    el: "#loading",
    data: {isLoading: false}
});

var designer_price = {};
var vue_export;
var vue_designer;
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
force_continue = true;
vue_export = new Vue({
    el: "#vue",
    data: data,
});
