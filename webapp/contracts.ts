/// <reference path="typings/angular2/ng2.d.ts"/>
/// <reference path="typings/es6-promise/es6-promise.d.ts"/>
/// <reference path="typings/whatwg-fetch/whatwg-fetch.d.ts"/>

import {bootstrap, Component, View, For, Validators} from "angular2/angular2";
import {bind} from 'angular2/di';
import {FormBuilder, formDirectives, ControlGroup} from 'angular2/forms';
import {Contracts} from 'services/contracts'

//{
//	"contract": "contrname",
//	"arg1": 5.33,
//	"arg2": 3.22,
//	"image": true
//	}


class ExContr {
	contract: string;
	arg1: number;
	arg2: number;
	image: boolean;
}

@Component({
	selector: 'contracts-app',
	appInjector: [FormBuilder,Contracts]
})
@View({
	templateUrl: 'contracts.html',
	directives: [formDirectives]	
})
class ContractsApp {
	exContr: ExContr; 
	jsongram: string;
	imageLink: string;
	errorMessage: string;
	
	exContrForm: ControlGroup;
	
	builder: FormBuilder;
	contracts: Contracts;
	
	constructor(b: FormBuilder, contracts: Contracts){
		this.exContr = new ExContr();
		
		this.exContr.contract = 'zcb';
		this.exContr.arg1 = 3.0;
		this.exContr.arg2 = 10;
		this.exContr.image = true;

		this.imageLink = ""

		this.builder = b;
		this.contracts = contracts;
		
		this.exContrForm = this.builder.group({
			contract: [this.exContr.contract],
			arg1: [this.exContr.arg1],
			arg2: [this.exContr.arg2],
			image: [this.exContr.image]
		});
		
		// this.exContrForm.valueChanges.forEach( ()=> this.exContrForm.writeTo(this.exContr));
	}
	
	updateModel(){
		this.exContr.contract = this.exContrForm.controls.contract.value;
		this.exContr.arg1 = parseInt( this.exContrForm.controls.arg1.value, 10 );
		this.exContr.arg2 = parseInt( this.exContrForm.controls.arg2.value, 10 );
		this.exContr.image = this.exContrForm.controls.image.value;
	}
	
	displayChart(form: ControlGroup){
		var me = this;

		// persist changes on the form
		this.updateModel()
		
		// request chart link
		this.jsongram = JSON.stringify(this.exContr);
		
		// call service
		this.contracts.getLatticeImage(this.exContr).then(function(response){
			return response.text()
		})
		.then(function(dot){
			console.log(dot)
			me.errorMessage = "";
			me.imageLink = "https://chart.googleapis.com/chart?"+"cht=gv&chl=" + escape(dot);
		})
        .catch(function(err) {
            me.errorMessage = err;
        });
	}
}

bootstrap(ContractsApp)