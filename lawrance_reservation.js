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
'<tab-content title="選擇預約項目" :before-change="checkStep1" :after-change="scroll_to_top">' +
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
'<div v-for="(item, items_index) in svc_dict.items" class="col p-2" v-if="item.add_on===null||(item.add_on===true&&(target_svc.dye||target_svc.perm))||(item.add_on===false&&!(target_svc.dye||target_svc.perm))">'+
'<div class="w-100 h-100 border border-3 border-dark btn btn-outline-light position-relative bg-gradient dim" :style="\'--bs-border-opacity: .15;min-height:145px;background-color:\'+svc_dict.color" @click="errorMsg=\'\';select_svc(svc_id, item);">' +
'<input type="radio" class="btn-check" :name="svc_id" :id="item.id" autocomplete="off" :value="item.id">' +
'<label role="button" class="w-100" :for="item.id" @click="errorMsg=\'\';select_svc(svc_id, item);">' +
'<p class="card-title h5 text-dark p-0">{{ item.name }}</p>' +
'<span class="font-italic fs-5 text-danger">{{ item.price ? "$"+item.price:"" }}</span>' +
'<p class="card-text text-secondary fs-6"><u>{{ item.detail }}</u></p>' +
'<div v-if="target_svc[svc_id]!==item.id" class="h-100 position-absolute top-0">' +
// '<h4 class="card-title text-light"></h4>' +
'</div>' +
'<div v-else class="w-100 h-100 position-absolute top-0" style="left: 0;background-color: rgb(33,37,41,0.6);">' +
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

'<tab-content title="選擇分店" :selected="true" :before-change="checkStep2" class="pb-4">' +
'<div class="btn-group top-100 start-50 translate-middle mt-5" role="group">' +
'<template v-for="(city, index) in city_list()">' +
'<input type="radio" class="btn-check" name="btnradio" :id="city" autocomplete="off" :value="city" v-model="region" @click="region=\'\';target_shop=\'\';errorMsg=\'\';">' +
'<label class="btn btn-outline-secondary" :for="city">{{ city }}</label>' +
'</template>' +
'</div>' +
'<div v-if="show_sort_btn"><a role="button" class="text-primary" @click="sort_by_position">排序最近分店</a></div>'+
'<div class="row row-cols-4" role="group">' +
'<template v-for="(shop, index) in shop_list" v-if="(region===\'\'||shop[3]===region)&&(!chk_pro()||shop[9]>=700)">' +
'<div class="btn btn-outline-light col m-1 position-relative card-body bg-gradient" :style="\'background-color: #\'+shop[2]" @click="target_shop=shop[9];designation=\'不指定設計師\';vue_designer.$refs.vue_designer.shop_designers=designer_price[shop[0]];$(\'#next\').click();">' +
'<input type="radio" class="btn-check" name="shop" :id="\'shop\'+index" autocomplete="off" v-model="target_shop" :value="shop[9]">' +
'<label role="button" class="w-100" :for="\'shop\'+index">' +
'<div class="w-100 bg-light p-1 mb-2 opacity-75">' +
'<span v-if="shop[9]>=700" class="badge bg-warning text-dark">Pro</span>'+
'<span class="card-title h5 p-1 text-dark">{{ shop[0] }}</span>' +
'</div>' +
'<p class="card-text text-light">{{ shop[1] }}</p>' +
'<div v-if="shop[9]!==target_shop" class="h-100 position-absolute top-0">' +
'<h5 class="card-title text-light"></h5>' +
'</div>' +
'<div v-else class="w-100 h-100 position-absolute top-0" style="left: 0;background-color: rgb(33,37,41,0.6);">' +
'<h5 class="card-title text-light position-absolute top-50 start-50 translate-middle"><i style="font-size:80px;" class="fa fa-check-circle text-light opacity-50" aria-hidden="true"></i></h5>' +
'</div>' +
'</label>' +
'<p class="w-100 text-start"><a class="text-light m-1 p-1 opacity-50" :href="shop[7]" target="_blank"><i class="fa fa-map-marker" aria-hidden="true"></i> {{ shop[8] }}</a></p>' +
// '<span v-if="chk_union() && shop[9]>=600" class="position-absolute top-0 start-0 m-1 badge rounded-pill bg-warning text-dark">聯盟</span>' +
'</div>' +
'</template>' +
'</div>' +
'</tab-content>' +
'<tab-content title="填寫表單" class="mt-4" :before-change="checkStep3">' +
'<div class="mx-auto px-3" style="max-width: 400px;">' +
'<form id="form-chk" class="needs-validation">'+
'<div class="row input-group mb-3 align-items-center" role="group" >'+
'<span class="col-4 input-group-text justify-content-center p-2"><strong>預約日期</strong></span>'+
'<input id="target_date" type="text" class="bg-light col form-control p-2" placeholder="請選擇" v-model="target_date" :value="target_date" @focus="errorMsg=\'\'" required inputmode="none" autocomplete="off">'+
'<div class="invalid-feedback invalid-tooltip position-relative text-center">未選取</div>'+
'</div>'+
'<div class="row input-group mb-3 align-items-center" role="group" >'+
'<span class="col-4 input-group-text justify-content-center p-2"><strong>預約時間</strong></span>'+
'<input id="target_time" type="text" class="bg-light col form-control p-2" placeholder="請選擇" v-model="target_time" :value="target_time" @focus="errorMsg=\'\'" required inputmode="none" autocomplete="off">'+
'<div class="invalid-feedback invalid-tooltip position-relative text-center">未選取</div>'+
'</div>'+
'<div class="row input-group mb-3 align-items-center" role="group" >'+
'<span class="col-4 input-group-text justify-content-center p-2"><strong>設計師</strong></span>'+
'<input id="designation" type="text" class="bg-light col form-control p-2" placeholder="請選擇" data-bs-toggle="modal" data-bs-target="#designer_list" v-model="designation" :value="designation" @focus="errorMsg=\'\'" required inputmode="none">'+
'<div class="invalid-feedback invalid-tooltip position-relative text-center">未選取</div>'+


'</div>'+
'<div class="row input-group mb-3 align-items-center" role="group" >'+
'<span class="col-4 input-group-text justify-content-center p-2"><strong>姓名</strong></span>'+
'<input type="text" class="col form-control p-2" placeholder="姓名" id="name" v-model="name" @focus="errorMsg=\'\'" required>'+
'<div class="invalid-feedback invalid-tooltip position-relative text-center">未填寫</div>'+
'</div>'+
'<div class="row input-group mb-3 align-items-center" role="group" >'+
'<span class="col-4 input-group-text justify-content-center p-2"><strong>性別</strong></span>'+
'<input type="radio" class="btn-check" name="btnradioa" id="_sex_f" autocomplete="off" value="女" v-model="sex" @focus="errorMsg=\'\'" required>'+
'<label class="col btn btn-outline-success p-2" for="_sex_f">女</label>'+
'<input type="radio" class="btn-check" name="btnradioa" id="_sex_m" autocomplete="off" value="男" v-model="sex" @focus="errorMsg=\'\'" required>'+
'<label class="col btn btn-outline-success p-2" for="_sex_m">男</label>'+
'<div class="invalid-feedback invalid-tooltip position-relative text-center">未選取</div>'+
'</div>'+
'<div class="row input-group mb-3 align-items-center" role="group" >'+
'<span class="col-4 input-group-text justify-content-center p-2"><strong>手機</strong></span>'+
'<input type="tel" class="col form-control p-2" placeholder="手機" id="tel" v-model="tel" @focus="errorMsg=\'\'" pattern="09\\d{8}" required>'+
'<div class="invalid-feedback invalid-tooltip position-relative text-center">請填寫完整電話</div>'+
'</div>'+
'<div class="row input-group mb-3 align-items-center" role="group" >'+
'<span class="col-4 input-group-text justify-content-center p-2"><strong>Email</strong></span>'+
'<input type="email" class="col form-control p-2" placeholder="電子信箱" id="email" v-model="email" @focus="errorMsg=\'\'" required>'+
'<div class="invalid-feedback invalid-tooltip position-relative text-center">請填寫正確電子信箱</div>'+
'</div>'+
'<div class="row input-group mb-3 align-items-center" role="group" >'+
'<span class="col-4 input-group-text justify-content-center p-2"><strong>備註</strong></span>'+
'<input type="text" class="col form-control p-2" placeholder="希望聯繫時間或其他需求" v-model="note" id="note" @focus="errorMsg=\'\'">'+
'</div>'+
'<div class="row input-group mb-3 align-items-center card border-success" role="group">' +
'<div class="card-header fs-6">' +
'溫馨小提醒' +
'</div>' +
'<div class="card-body">' +
'<blockquote class="blockquote mb-0 p-0 border-0">' +
'<p class="text-danger fs-6">送出表單後，我們3天內將會與您聯絡，如未聯繫上則視同未預約成功</p>' +
'<footer class="text-secondary fs-6">◎位置僅保留10分鐘，請務必準時，如超過時間將自動取消<br>◎防疫期間請配合配戴口罩，現已開放陪同及用餐(請儘速食用完畢後，佩戴口罩)<br>◎不提供孕婦染髮服務<br>◎如現場評估有使用過DIY產品或過度受損，可能無法操作，如無法接受請勿預約，感謝</footer>' +
'<div class="card-footer bg-transparent text-center fs-6"><input type="checkbox" class="form-check-input" v-model="understood" @focus="errorMsg=\'\'" required><span @focus="errorMsg=\'\'" @click="understood=!understood"> 我同意</span></input>' +
'<div class="invalid-feedback invalid-tooltip position-relative text-center">未勾選</div></div>' +
'</blockquote>' +
'</div>' +
'</div>' +
'</form>' +
'</div>' +
'</tab-content>'+
// '<button id="last" class="btn btn-secondary" slot="prev">上一步</button>' +
// '<button id="next" class="btn btn-primary" slot="next">下一步</button>' +
// '<button id="submit" type="submit" class="btn btn-primary" slot="finish">送出</button>' +
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
    props: ['name', 'sex', 'tel', 'email', 'title', 'plan_dict', 'shop_list', 'activity', 'services', 'designation'],
    data: function() {
        return {
            errorMsg:"",
            region: "",
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
            target_svc: Object.assign({}, ...Object.keys(data.services).map((x, idx) => ({[x]: null}))),
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
            if (!this.chk_pro()) {
                return [...new Set(this.shop_list.map(x => x[3]))]
            } else {
                return [...new Set(this.shop_list.filter(x => x[9]>=700).map(x => x[3]))]
            }            
        },
        chk_pro: function () {
            var self = this;
            var target_svcs = Object.keys(this.target_svc).filter(svc => this.target_svc[svc]!==null);
            var union_svcs = target_svcs.map(svc => self.services[svc]["items"].filter(item => this.target_svc[svc] === item.id)[0]["pro"]).filter(x => x===true);
            return union_svcs.length>0;
            
        },
        select_svc: function (svc_id, item) {
            this.region = '';
            if (this.target_svc[svc_id]===item.id) {
                this.target_svc[svc_id] = null;
            } else {
                for (const key in this.services) {
                    this.target_svc[key] = null;
                }
                this.target_svc[svc_id] = item.id;
            }
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
        get_suggestions: function() {
            var self = this;
            var items=this.sub_category!==''?this.i_e[this.select_i_e][this.category][this.sub_category].map((x) => (this.ids_map[x])):[];
            $( "#note" ).autocomplete({
                source: items,
                minLength: 0,
                change: function( event, ui ) {
                    self.income_name = $("#note").focus().val();
                }
            });
            this.show_suggestion();
        },
        checkStep1: function(){
            var self = this;
            return new Promise((resolve, reject) => {
                if (Object.values(self.target_svc).filter(item => item !== null).length===0) {
                    reject('請選擇服務項目！');
                } else {
                    var max_time = '20:00';
                    if (self.target_svc.dye !== null) {
                        max_time = '19:00';
                    } 
                    if (self.target_svc.perm !== null) {
                        max_time = '18:00';
                    }
                    
                    var ori_target_time = self.target_time;
                    $('#target_time').timepicker('option', 'maxTime', max_time);
                    if (max_time === '18:00' && ['18:30', '19:00', '19:30', '20:00', ''].includes(ori_target_time)) {
                        self.target_time = '';
                    } else {
                        self.target_time = ori_target_time;
                    }
                    resolve(true);
                }
             })
        },
        checkStep2: function(){
            var self = this;
            return new Promise((resolve, reject) => {
                if (this.target_shop === "") {
                    // $('body')[0].scrollIntoView();
                    reject('請選擇分店！');
                    // this.scrollTop();
                } else {
                    resolve(true);
                }
             })
        },
        checkStep3: function(){
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