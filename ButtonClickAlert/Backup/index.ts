import { table } from "console";
import {IInputs, IOutputs} from "./generated/ManifestTypes";

export class ButtonAlert implements ComponentFramework.StandardControl<IInputs, IOutputs> {

	/**
	 * Empty constructor.
	 */
	private _searchText:HTMLInputElement;
	private _clickme:HTMLButtonElement;
	private Recordid:HTMLLabelElement;
	private _notifyOutputChanged: () => void;
	 private _container: HTMLDivElement;
	private _fetchXmlRefreshButton: HTMLButtonElement;
		private _oDataRefreshButton: HTMLButtonElement;

		// References to div elements rendered by the example custom control
		private _odataStatusContainerDiv: HTMLDivElement;
		private _resultContainerDiv: HTMLDivElement;
 // Reference to ComponentFramework Context object
private _context: ComponentFramework.Context<IInputs>;
 // Flag if control view has been rendered
  private _controlViewRendered: Boolean;
	private _accountName: string;
	static AccountName: string;
	static Check: boolean=false;

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
		this._context=context;
		this._searchText=document.createElement("input");
		this._searchText.setAttribute("id","SearchText");	
		this._container=document.createElement("div");
		this._container.appendChild(this._searchText);
		this._notifyOutputChanged=notifyOutputChanged;
		this._clickme=document.createElement("button");
		this._clickme.innerText="Button click alert";
		
		this._container.appendChild(this._searchText);
		this._container.appendChild(this._clickme);
		
		this._clickme.addEventListener("click",this.refreshRecordCountButtonOnClickHandler);
		// let div:HTMLTableElement =this.createTable();
		// this._container.appendChild(div);
		container.appendChild(this._container);
		// Add control initialization code
			this._accountName = this._context.parameters.AccountName.raw ?? "";
			console.log("Account Name"+this._accountName);
	}

	private createTable():HTMLTableElement
	{
			let newTable:HTMLTableElement=document.createElement("table");
			let cellelment:HTMLTableRowElement=document.createElement("tr");
				cellelment.innerText="first row";
				newTable.appendChild(cellelment);
			return newTable;
	}
	private  Alertme() {
		ButtonAlert.Check=true;
		console.log("button called Alertme");
		console.log("this._searchText.value.toString()"+(document.getElementById("SearchText") as HTMLInputElement).value);
		alert((document.getElementById("SearchText") as HTMLInputElement).value);
	}

	private refreshRecordCountButtonOnClickHandler() : void
		{
			
			// Generate OData query string to retrieve the _currencyAttributeName field for all _entityName records
			// Add a filter to only retrieve records with _requiredAttributeName field which contains _requiredAttributeValue
			let queryString: string = "$select=accountnumber&$filter=contains(name,"+this._accountName+")";

			// store reference to 'this' so it can be used in the callback method
			var thisRef = this;
ButtonAlert.AccountName=this._accountName;
			// Invoke the Web API Retrieve Multiple call
			console.log("inside refreshRecordCountButtonOnClickHandler");
				console.log("before webAPI.retrieveMultipleRecords");
			this._context.webAPI.retrieveMultipleRecords("accounts", queryString).then
			(
				
			(response)=>
				{
					// Retrieve Multiple Web API call completed successfully
					let count1: number = 0;
				count1=response.entities.length
					// Loop through each returned record
					

					// Generate HTML to inject into the fetch xml status div to showcase the results of the OData retrieve example
					let innerHtml: string = "Use above buttons to create or delete a record to see count update";
					innerHtml += "<br />";
					innerHtml += "<br />";
					innerHtml += "Count of Accounts with Name" + ButtonAlert.AccountName + " records with " +  count1;
					innerHtml += "<br />";
					
					// Inject the HTML into the fetch xml status div
					if (thisRef._odataStatusContainerDiv)
					{
						thisRef._odataStatusContainerDiv.innerHTML = innerHtml;
					}

					// Inject a success message into the result div
					thisRef.updateResultContainerText("Record count refreshed");
				},
				function (errorResponse: any) 
				{
					// Error handling code here
					thisRef.updateResultContainerTextWithErrorResponse(errorResponse);
				}
			);
		console.log("after webAPI.retrieveMultipleRecords");
		}

			private updateResultContainerText(statusHTML: string) : void
		{	
			if (this._resultContainerDiv)
			{
				this._resultContainerDiv.innerHTML = statusHTML;
			}
		}
		private updateResultContainerTextWithErrorResponse(errorResponse: any) : void
		{
			if (this._resultContainerDiv)
			{
				// Retrieve the error message from the errorResponse and inject into the result div
				let errorHTML: string = "Error with Web API call:";
				errorHTML += "<br />"
				errorHTML += errorResponse.message;
				this._resultContainerDiv.innerHTML = errorHTML;
			}
		}

	/**
	 * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
	 * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
	 */
	public updateView(context: ComponentFramework.Context<IInputs>): void
	{
			this._accountName = this._context.parameters.AccountName.raw ?? "";
			
			if(ButtonAlert.Check)
			this.renderFetchXmlRetrieveMultipleExample();
		// Add code to update control view
	}
	private renderFetchXmlRetrieveMultipleExample() : void
		{
			let containerName: string = "fetchxml_status_container";

			// Create header label for Web API sample
			let statusDivHeader: HTMLDivElement = this.createHTMLDivElement(containerName, true, 
				"Click to retrieve count of Account Names" );	
			let statusDiv: HTMLDivElement = this.createHTMLDivElement(containerName, false, undefined);	

		

			// Append HTML Elements to custom control container div
			this._container.appendChild(statusDivHeader);
			this._container.appendChild(statusDiv);
			this._container.appendChild(this._oDataRefreshButton);
		}

private createHTMLDivElement(elementClassName: string, isHeader: boolean, innerText?: string): HTMLDivElement
		{
			let div: HTMLDivElement = document.createElement("div");
			
			if(isHeader)
			{
				div.classList.add("SampleControl_WebAPI_Header");
				elementClassName += "_header";
			}

			if (innerText)
			{
				div.innerText = innerText.toUpperCase();
			}

			div.classList.add(elementClassName);
			return div;
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