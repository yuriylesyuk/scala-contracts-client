/// <reference path="typings/angular2/ng2.d.ts"/>

import {bootstrap,Component,View,NgFor} from 'angular2/angular2'

@Component({
	selector: 'contract',
    properties: ['name', 'json']
})
@View({
	template: `
	<div style="color:red">{{errorMessage}}</div>
	<table border="0pt solid grey">

        <template [ng-for] #rv [ng-for-of]="_json.unPr" #n="index">
    	<tr>
            <td style="font-weight:bold">{{n}}</td>
            <td [col-span]="horizon-n"></td>
            <td *ng-for="var v of rv" colSpan="2">
                {{v.toFixed(3)}}
            </td>
            <td [col-span]="horizon-n+1"></td>
		</tr>
        </template>
	</table>`,
	directives: [NgFor]
})
export class ContractComponent {
	_json;
    horizon;

    errorMessage: string;

	constructor(){
		
		this.json = null;
	}
    set json(newValue){
        // TODO: Add exception proccessing; i.e., JSON -> SyntaxError 
        try{
            this._json = JSON.parse(newValue);
            if( (this._json != null) && ('unPr' in this._json) ) {
                this.horizon = this._json.unPr.length;
            }else{
                this.horizon = 0;
            }
        }catch(e){
            this.errorMessage = e.message;
            this.json = "{}"
        }
    }    
}
