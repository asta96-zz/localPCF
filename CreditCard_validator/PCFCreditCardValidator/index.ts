import { debug } from "console";
import {IInputs, IOutputs} from "./generated/ManifestTypes";

export class PCFCreditCardValidator implements ComponentFramework.StandardControl<IInputs, IOutputs> {

	/**
	 * Empty constructor.
	 */
	private _creditCardNumberElement: HTMLInputElement; 
private _creditCardTypeElement: HTMLElement; 
private _creditCardNumber: string; 
private _creditCardNumberChanged: EventListenerOrEventListenerObject; 
 private _context: ComponentFramework.Context<IInputs>; 
 private _notifyOutputChanged: () => void; 
 private _container: HTMLDivElement; 
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
		this._context = context;  
this._notifyOutputChanged = notifyOutputChanged
this._container = container; 
// input control  
this._creditCardNumberElement=document.createElement("input"); 
this._creditCardNumberElement.setAttribute("type", "text"); 
this._creditCardNumberElement.setAttribute("class", "CreditCardBox"); 
this._creditCardNumberElement.setAttribute("style", "width: 90%"); 
this._creditCardNumberElement.addEventListener("change", this._creditCardNumberChanged); 
 
// image control  
this._creditCardTypeElement = document.createElement("img"); 
this._creditCardTypeElement.setAttribute("height", "24px");

this._container.appendChild(this._creditCardNumberElement); 
 this._container.appendChild(this._creditCardTypeElement); 
		// Add control initialization code
	}


	/**
	 * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
	 * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
	 */
	public updateView(context: ComponentFramework.Context<IInputs>): void
	{
	//	@ts-ignore
		var crmCCNAttr = this._context.parameters.CreditCardNumber.attributes.LogicalName; 
		//@ts-ignore	
		Xrm.Page.getAttribute(crmCCNAttr).setValue(this._context.parameters.CreditCardNumber.formatted);
		// Add code to update control view
	}

	/** 
	 * It is called by the framework prior to a control receiving new data. 
	 * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as “bound” or “output”
	 */
	public getOutputs(): IOutputs
	{
		
	return { 
     CreditCardNumber: this._creditCardNumber 
 }; 
	}

	public creditCardChanged(evt: Event):void{
		debugger;
		var creditCardNumber = this._creditCardNumberElement.value; 
if (creditCardNumber != null && creditCardNumber.length > 0) 
         {if (creditCardNumber.length == 15 && (creditCardNumber.substring(0, 2) === "34" || 
creditCardNumber.substring(0, 2) === "37")) 
  this._creditCardTypeElement.setAttribute("src", "https://www.google.com/imgres?imgurl=https%3A%2F%2Fs1.q4cdn.com%2F692158879%2Ffiles%2Fimages%2Fbrand_imagery%2FAXP_BlueBoxLogo_EXTRALARGEscale_RGB_DIGITAL_1600x1600.png&imgrefurl=https%3A%2F%2Fabout.americanexpress.com%2Fnewsroom%2Fmedia-library%2Fmedia-library%2Fdefault.aspx&tbnid=1H4hvZ5uWgswpM&vet=12ahUKEwiy0PjP6o7tAhVPSysKHbNZD8cQMygAegUIARCVAQ..i&docid=H6tPLKGymR9pKM&w=1600&h=1600&q=amex%20logo&hl=en-US&ved=2ahUKEwiy0PjP6o7tAhVPSysKHbNZD8cQMygAegUIARCVAQ"); 
else if (creditCardNumber.substring(0, 1) === "4" && (creditCardNumber.length == 13 || 
creditCardNumber.length == 16)) 
  this._creditCardTypeElement.setAttribute("src", "https://www.google.com/imgres?imgurl=https%3A%2F%2Fusa.visa.com%2Fdam%2FVCOM%2Fregional%2Flac%2FENG%2FDefault%2FPartner%2520With%2520Us%2FPayment%2520Technology%2Fvisapos%2Ffull-color-800x450.jpg&imgrefurl=https%3A%2F%2Fusa.visa.com%2Frun-your-business%2Faccept-visa-payments%2Fposguidelines.html&tbnid=fyW5Q-01otuIiM&vet=12ahUKEwik5dzi6o7tAhVXNCsKHQmaAPMQMygBegUIARDRAQ..i&docid=YorbNwoJ03phzM&w=800&h=450&q=visa%20logo&hl=en-US&ved=2ahUKEwik5dzi6o7tAhVXNCsKHQmaAPMQMygBegUIARDRAQ"); 
else if (creditCardNumber.substring(0, 4) === "6011" && creditCardNumber.length == 16) 
  this._creditCardTypeElement.setAttribute("src", "https://www.google.com/imgres?imgurl=https%3A%2F%2Fwww.brandeps.com%2Flogo-download%2FD%2FDiscover-Card-logo-vector-01.svg&imgrefurl=https%3A%2F%2Fwww.brandeps.com%2Flogo%2FD%2FDiscover-Card-01&tbnid=REU5K8PJneMiRM&vet=12ahUKEwjz3oL_6o7tAhXAkUsFHQwbAYMQMygAegUIARCdAQ..i&docid=uHl1ajHI3DIh6M&w=800&h=800&q=discover%20logo&hl=en-US&ved=2ahUKEwjz3oL_6o7tAhXAkUsFHQwbAYMQMygAegUIARCdAQ"); 
else if (parseInt(creditCardNumber.substring(0, 2)) > 50 && parseInt(creditCardNumber.substring(0, 2)) 
< 56 && creditCardNumber.length == 16) 
  this._creditCardTypeElement.setAttribute("src", "https://bgx.blob.core.windows.net/imgs/ico/mc24.png"); 
else 
  this._creditCardTypeElement.setAttribute("src", "https://bgx.blob.core.windows.net/imgs/redwar.png"); 
  
this._creditCardNumber = creditCardNumber; }
else
{
	this._creditCardNumberElement.removeAttribute
this._creditCardNumber = ""; 
}
this._notifyOutputChanged(); 
	}
	/** 
	 * Called when the control is to be removed from the DOM tree. Controls should use this call for cleanup.
	 * i.e. cancelling any pending remote calls, removing listeners, etc.
	 */
	public destroy(): void
	{
		this._creditCardNumberElement.removeEventListener("change",this._creditCardNumberChanged);
		// Add code to cleanup control if necessary
	}
}