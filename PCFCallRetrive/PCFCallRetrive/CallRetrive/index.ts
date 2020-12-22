import React = require("react");
import {IInputs, IOutputs} from "./generated/ManifestTypes";
import {DetailsListBasicExample} from './DetailsListFabricUI';

import { render } from 'react-dom';
import { ModalApp } from './Modal';
import ReactDOM = require("react-dom");
import {BinGlobalSearch} from './GlobalSearchModal';
import { DetailsListBasicExampleAction } from "./DetailsListBasic";

export class CallRetrive implements ComponentFramework.StandardControl<IInputs, IOutputs> {
	
	setState(arg0: { showBinModal: boolean; }) {
		throw new Error("Method not implemented.");
	}
	private _container:HTMLDivElement;	
	private _context:ComponentFramework.Context<IInputs>;	
	private _notifyOutputChanged: () => void;	
	private _CaseInput: string;
	 
	public _dynamicsWebApi : ComponentFramework.WebApi;
   
	/**
	 * Empty constructor.
	 */
	constructor()
	{

	}

	/**
	 * Used to initialize the control instance. Controls can kick off remote server calls and other initialization actions here.
	 * Data-set values are not initialized here, use updateView.
	 * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to property names defined in the manifest, as well as utility functions.
	 * @param notifyOutputChanged A callback method to alert the framework that the control has new outputs ready to be retrieved asynchronously.
	 * @param state A piece of data that persists in one session for a single user. Can be set at any point in a controls life cycle by calling 'setControlState' in the Mode interface.
	 * @param container If a control is marked control-type='standard', it will receive an empty div element within which it can render its content.
	 */
	public init(context: ComponentFramework.Context<IInputs>, notifyOutputChanged: () => void, state: ComponentFramework.Dictionary, container:HTMLDivElement)
	{
		// Add control initialization code
		this._context = context;
		this._container = container;
		this._dynamicsWebApi=context.webAPI;
		//this._submitClicked = this.submitClick.bind(this);
		this._notifyOutputChanged = notifyOutputChanged;


		let containerDiv = document.createElement("div");
		this._container.appendChild(containerDiv);

		let buttonAction=document.createElement("input");
		buttonAction.setAttribute("type", "button");
		buttonAction.setAttribute("id","Click_Here");
		buttonAction.setAttribute("value", "Click Here to Retrive REcords");
		buttonAction.addEventListener("click", this.onButtonClick.bind(this));
		containerDiv.appendChild(buttonAction);
		
		// The following is for Numerics Instruction
		let numericsInstructionSpan = document.createElement("span");
		numericsInstructionSpan.setAttribute("id","numericsInstructionSpan");
		containerDiv.appendChild(numericsInstructionSpan);  

		// let divcon=document.createElement("div");
		// divcon.setAttribute("id","BinGlobalSearchResult");
		// divcon.setAttribute("style", "position:absolute;width:100%;min-width:290px;height:100%;");	
		
		// containerDiv.appendChild(divcon);
		
		let DivConDialog=document.createElement("div");
		DivConDialog.setAttribute("id","DIALOGGlobalSearchResult");
		DivConDialog.setAttribute("style", "position:center;width:100%;min-width:250px;height:100%;");
		//DivConDialog.setAttribute("open","open");	
		containerDiv.appendChild(DivConDialog);
        

	//  if(DivConDialog.innerText == "")
	//  {
	// 	let buttonAction=document.createElement("input");
	// 	buttonAction.setAttribute("type", "button");
	// 	buttonAction.setAttribute("value", "Click Here to Retrive REcords123.");
	// 	buttonAction.addEventListener("click", this.onButtonClick.bind(this));
	// 	containerDiv.appendChild(buttonAction);
		
	//  }
        
	

		this._CaseInput = this._context.parameters.caseInputId.raw ?? "";
		alert(this._CaseInput);

	}

	private onButtonClick(event: Event): void {        
        
		this._notifyOutputChanged();
		var binservicecontact = this.CallAction();

		
		
       

		// var flag =  document.getElementById("DIALOGGlobalSearchResult");

		// if(flag?.innerHTML)
		// if(this.flag != "")
		// {
		// 	let childConDialog=document.createElement("div");
		// 	let buttonAction=document.createElement("input");
		// 	buttonAction.setAttribute("type", "button");
		// 	buttonAction.setAttribute("value", "Click Here records.");
		// 	buttonAction.addEventListener("click", this.onButtonClick.bind(this));
		// 	childConDialog.appendChild(buttonAction);
		// }
		
		// let rootElement = document.createElement("div");
		
		// this._container.appendChild(rootElement);

		// let props = {
		// 	showModal: true,
		// 	test:this._CaseInput,
		// };
		// ReactDOM.render(React.createElement(BinGlobalSearch,props),rootElement);
		

	}
	private _closeModal = () : void => {

        this.setState({showBinModal: false});
    }
	
	private CallAction()
	{		
		this._CaseInput = this._context.parameters.caseInputId.raw ?? "";
		let gridObject: any = [];
		let binservicecontactData: any = null;
		var RequestedServiceGUID = this._CaseInput;	  
	  let binservicecontactDetails = this._dynamicsWebApi.retrieveMultipleRecords("gcc_binservicecontact", "?$filter=_gcc_binserviceid_value eq "+RequestedServiceGUID+"").then(
			(results) => {
				for (var i = 0; i < results.entities.length; i++) {
					
					let itemObject: any = {};
					itemObject["BIN_Service_Contact"] = results.entities[i]["gcc_binservicecontactid"];					
					itemObject["BIN_Service_Contact_Name"]=results.entities[i]["gcc_binservicecontactnamecalc"];					
					itemObject["BIN_Service"] = results.entities[i]["_gcc_binserviceid_value@OData.Community.Display.V1.FormattedValue"];
					itemObject["Contact"] = results.entities[i]["_gcc_contactid_value@OData.Community.Display.V1.FormattedValue"];
					itemObject["Created_By"] = results.entities[i]["_createdby_value@OData.Community.Display.V1.FormattedValue"];
					itemObject["Line_Order"] = results.entities[i]["gcc_lineorder"];
					itemObject["Status"] = results.entities[i]["statecode@OData.Community.Display.V1.FormattedValue"];
					itemObject["Status_Reason"] = results.entities[i]["statuscode@OData.Community.Display.V1.FormattedValue"];
					gridObject.push(itemObject);
					
				}
				let detailProps: any = {
					items: gridObject,
					//closeModalEvent: this._closeModal.bind(this),
					}					
					render(React.createElement(DetailsListBasicExampleAction,detailProps),document.getElementById("DIALOGGlobalSearchResult"));
			
					let tsnString = (document.getElementById("Click_Here") as HTMLTextAreaElement).value;		
					if(tsnString == "Click Here to Retrive REcords")
					{
						
						(document.getElementById("Click_Here") as HTMLTextAreaElement).value ="Click Here to Hide Records";
						(document.getElementById("DIALOGGlobalSearchResult") as HTMLDivElement).hidden=false;			
					}
					else{
						
						(document.getElementById("Click_Here") as HTMLTextAreaElement).value ="Click Here to Retrive REcords";
						(document.getElementById("DIALOGGlobalSearchResult") as HTMLDivElement).hidden=true;	
					}		

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



	/**
	 * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
	 * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
	 */
	public updateView(context: ComponentFramework.Context<IInputs>): void
	{
		this._context = context;
		
		// Add code to update control view
		this._CaseInput = this._context.parameters.caseInputId.raw ?? "";
		
		var te123=document.getElementById("DIALOGGlobalSearchResult");

		
		
	}

	/** 
	 * It is called by the framework prior to a control receiving new data. 
	 * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as “bound” or “output”
	 */
	public getOutputs(): IOutputs
	{
		return {};
	}

	/** 
	 * Called when the control is to be removed from the DOM tree. Controls should use this call for cleanup.
	 * i.e. cancelling any pending remote calls, removing listeners, etc.
	 */
	public destroy(): void
	{
		// Add code to cleanup control if necessary
	}
}