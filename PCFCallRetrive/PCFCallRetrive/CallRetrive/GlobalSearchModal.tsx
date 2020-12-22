import * as React from 'react'

import { render } from 'react-dom';
import { ModalApp } from './Modal';

import {DetailsListBasicExample} from './DetailsListFabricUI';

//const self: any = this;

export interface IBinGlobalSearch {
    showBinModal: boolean;
}
export class BinGlobalSearch extends React.Component<any,IBinGlobalSearch>{

    public state: IBinGlobalSearch = {
        showBinModal: false
    }
    public _dynamicsWebApi : ComponentFramework.WebApi;
//private self: any = this;
//private _dynamicsApi: ComponentFramework.WebApi;

constructor(props: any){
    super(props);

    this.state.showBinModal = props.showModal;
    
    //this.state = { dynamicsApi: props.dynamicsApi };
    //this._dynamicsApi = props.dynamicsApi;
    //this.setState({ dynamicsApi : props.dynamicsApi })
    this.CallAction();
}
private CallAction()
	{
		alert("test");
		let gridObject: any = [];
		let binservicecontactData: any = null;
	//	var RequestedServiceGUID = this._CaseInput;
	  //alert("RequestedServiceGUID" + RequestedServiceGUID);
	  let binservicecontactDetails = this._dynamicsWebApi.retrieveMultipleRecords("gcc_binservicecontact", "?$filter=_gcc_binserviceid_value eq 1D25B746-B9F3-EA11-A815-00224804996B").then(
			(results) => {
				for (var i = 0; i < results.entities.length; i++) {
					
					let itemObject: any = {};
					itemObject["BIN_id"] = results.entities[i]["gcc_binservicecontactid"];					
					itemObject["BIN"]=results.entities[i]["gcc_name"];					
					itemObject["binservicecontactnamecalc"] = results.entities[i]["gcc_binservicecontactnamecalc"];
					itemObject["binservicecontactid"] = results.entities[i]["gcc_binservicecontactid"];
					itemObject["binserviceid"] = results.entities[i]["gcc_binserviceid"];
					gridObject.push(itemObject);
					
				}
				let detailProps: any = {
					items: gridObject,
					//closeModalEvent: this._closeModal.bind(this),
					}
					alert(detailProps);
					render(React.createElement(DetailsListBasicExample,detailProps),document.getElementById("BinGlobalSearchResult"));
			
			},
			function(error) {
				
			}
		);
		
		//return binservicecontactData;
		//let detailProps: any = {
		//	items: gridObject,
		//	closeModalEvent: this._closeModal.bind(this),
		//	}
		//	alert(detailProps);
		//	render(React.createElement(DetailsListBasicExample,detailProps),document.getElementById("BinGlobalSearchResult"));
    }
    

    

}