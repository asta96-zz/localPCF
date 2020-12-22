import {IInputs, IOutputs} from "./generated/ManifestTypes";

export class CalculatorPCF implements ComponentFramework.StandardControl<IInputs, IOutputs> {

	private _input1:HTMLInputElement;
	private _input2:HTMLInputElement;
	private _addButton:HTMLButtonElement;
	private _container:HTMLDivElement;
		private _Inputcontainer:HTMLDivElement;
			private _Buttoncontainer:HTMLDivElement;
				private _Outputcontainer:HTMLDivElement;
	private _subtractButton:HTMLButtonElement;
	private _multiplicationButton:HTMLButtonElement;
	private _divisionButton:HTMLButtonElement;
	private _context: ComponentFramework.Context<IInputs>;
	private _output:HTMLInputElement;
	private _notifyOutputChanged: () => void;
	/**
	 * Empty constructor.
	 */
	constructor()
	{

	}

	public init(context: ComponentFramework.Context<IInputs>, notifyOutputChanged: () => void, state: ComponentFramework.Dictionary, container:HTMLDivElement)
	{
this._context=context;
this._notifyOutputChanged=notifyOutputChanged;
this._input1=document.createElement("input");
this._input1.setAttribute("id","_input1");

this._input1.name="input 1";
this._input2=document.createElement("input");
this._input2.setAttribute("id","_input2");
this._input1.setAttribute("name","input 2");
this._output=document.createElement("input");
this._output.setAttribute("id","Output");
this._container=document.createElement("div");
this._Inputcontainer=document.createElement("div");
this._Buttoncontainer=document.createElement("div");
this._Outputcontainer=document.createElement("div");

this._addButton=document.createElement("button");
this._addButton.setAttribute("id","Add");
this._addButton.classList.add("Buttons");
this._addButton.innerText="Add";
this._addButton.addEventListener("click",this.Add);

this._subtractButton=document.createElement("button");
this._subtractButton.classList.add("Buttons");
this._subtractButton.setAttribute("id","Subtract");
this._subtractButton.innerText="Subtract";
this._subtractButton.addEventListener("click",this.Subtract);

this._multiplicationButton=document.createElement("button");
this._multiplicationButton.setAttribute("id","Multiplication");
this._multiplicationButton.classList.add("Buttons");
this._multiplicationButton.innerText="Multiplication";
this._multiplicationButton.addEventListener("click",this.Multiplication);

this._divisionButton=document.createElement("button");
this._divisionButton.setAttribute("id","Division");
this._divisionButton.classList.add("Buttons");
this._divisionButton.innerText="Division";
this._divisionButton.addEventListener("click",this.Division);

this._Inputcontainer.appendChild(this._input1);
this._Inputcontainer.appendChild(this._input2);

this._Buttoncontainer.appendChild(this._addButton);
this._Buttoncontainer.appendChild(this._subtractButton);
this._Buttoncontainer.appendChild(this._multiplicationButton);
this._Buttoncontainer.appendChild(this._divisionButton);

this._Outputcontainer.appendChild(this._output);
this._container.classList.add("Container");

this._container.appendChild(this._Inputcontainer);
this._container.appendChild(this._Buttoncontainer);
this._container.appendChild(this._Outputcontainer);
container.appendChild(this._container);												
	}


	/**
	 * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
	 * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
	 */
	public updateView(context: ComponentFramework.Context<IInputs>): void
	{
			(document.getElementById("Output") as HTMLInputElement).disabled = true;
		// Add code to update control view
	}

	private Add():void
	{
			console.log("inside add");
		var a=((document.getElementById("_input1") as HTMLInputElement).value);
		var b=((document.getElementById("_input2") as HTMLInputElement).value);
		(document.getElementById("Output") as HTMLInputElement).value=(parseInt(a)+parseInt(b)).toString();
			console.log((parseInt(a)-parseInt(b)).toString());
		(document.getElementById("Output") as HTMLInputElement).disabled = true;
		this._notifyOutputChanged;
	}

		private Subtract():void
	{
		console.log("inside subtract");
		var a=((document.getElementById("_input1") as HTMLInputElement).value);
		var b=((document.getElementById("_input2") as HTMLInputElement).value);
		(document.getElementById("Output") as HTMLInputElement).value=(parseInt(a)-parseInt(b)).toString();
		console.log((parseInt(a)-parseInt(b)).toString());
			(document.getElementById("Output") as HTMLInputElement).disabled = true;
		this._notifyOutputChanged;
	}

		private Multiplication():void
	{
			console.log("inside Multiplication");
		var a=((document.getElementById("_input1") as HTMLInputElement).value);
		var b=((document.getElementById("_input2") as HTMLInputElement).value);
		(document.getElementById("Output") as HTMLInputElement).value=(parseInt(a)*parseInt(b)).toString();
			console.log("(parseInt(a)*parseInt(b)).toString()"+(parseInt(a)*parseInt(b)).toString());
		(document.getElementById("Output") as HTMLInputElement).disabled = true;
		this._notifyOutputChanged;
	}
		private Division():void
	{
			console.log("inside Division");
		var a=((document.getElementById("_input1") as HTMLInputElement).value);
		var b=((document.getElementById("_input2") as HTMLInputElement).value);
		(document.getElementById("Output") as HTMLInputElement).value=(parseInt(a)/parseInt(b)).toString();
			console.log((parseInt(a)/parseInt(b)).toString());
		(document.getElementById("Output") as HTMLInputElement).disabled = true;
		this._notifyOutputChanged;
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