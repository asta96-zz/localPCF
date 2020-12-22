import {IInputs, IOutputs} from "./generated/ManifestTypes";

export class pcfCalc implements ComponentFramework.StandardControl<IInputs, IOutputs> {

private _HeaderLable:HTMLLabelElement;	
private _input1:HTMLInputElement;
private _lable1:HTMLLabelElement;
private _input2:HTMLInputElement;
private _lable2:HTMLLabelElement;
private _addButton:HTMLButtonElement;
private _container:HTMLDivElement;
private _Inputcontainer1:HTMLDivElement;
private _Inputcontainer2:HTMLDivElement;
private _Buttoncontainer:HTMLDivElement;
private _Outputcontainer:HTMLDivElement;
private _subtractButton:HTMLButtonElement;
private _multiplicationButton:HTMLButtonElement;
private _divisionButton:HTMLButtonElement;
private _context: ComponentFramework.Context<IInputs>;
private _output:HTMLInputElement;
	private _lblOutput:HTMLLabelElement;



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
this._input1.setAttribute("name","input 1");
this._input1.setAttribute("class","inputs");
this._lable1=document.createElement("label");
this._lable1.innerText="Input value 1";
this._lable1.setAttribute("name","Value 1");
this._lable1.setAttribute("id","label1");
this._lable1.setAttribute("for","_input1");
this._lable1.setAttribute("class","input-lable");
this._input2=document.createElement("input");
this._input2.setAttribute("id","_input2");
this._input2.setAttribute("class","inputs");
this._input2.setAttribute("name","input 2");
this._lable2=document.createElement("label");
this._lable2.innerText="Input value 2";
this._lable2.setAttribute("name","Value 2");
this._lable2.setAttribute("id","label2");
this._lable2.setAttribute("for","_input2");
this._lable2.setAttribute("class","input-lable");
this._output=document.createElement("input");
this._output.setAttribute("id","Output");
this._output.setAttribute("class","inputs");
this._output.setAttribute("name","Output");
this._lblOutput=document.createElement("label");
this._lblOutput.innerText="Total value";
this._lblOutput.setAttribute("name","Output Value");
this._lblOutput.setAttribute("id","lblOutput");
this._lblOutput.setAttribute("for","Output");
this._lblOutput.setAttribute("class","input-lable");
this._Buttoncontainer=document.createElement("div");
this._addButton=document.createElement("button");
this._addButton.setAttribute("id","Add");
this._addButton.innerText="Add";
this._addButton.addEventListener("click",this.Add);
this._addButton.setAttribute("class","Buttons");
this._subtractButton=document.createElement("button");
this._subtractButton.setAttribute("id","Subtract");
this._subtractButton.innerText="Subtract";
this._subtractButton.addEventListener("click",this.Subtract);
this._subtractButton.setAttribute("class","Buttons");
this._multiplicationButton=document.createElement("button");
this._multiplicationButton.setAttribute("id","Multiplication");
this._multiplicationButton.innerText="Multiplication";
this._multiplicationButton.addEventListener("click",this.Multiplication);
this._multiplicationButton.setAttribute("class","Buttons");
this._divisionButton=document.createElement("button");
this._divisionButton.setAttribute("id","Division");
this._divisionButton.innerText="Division";
this._divisionButton.addEventListener("click",this.Division);
this._divisionButton.setAttribute("class","Buttons");
this._Buttoncontainer.appendChild(this._addButton);
this._Buttoncontainer.appendChild(this._subtractButton);
this._Buttoncontainer.appendChild(this._multiplicationButton);
this._Buttoncontainer.appendChild(this._divisionButton);
this._container=document.createElement("div");
let TableContainer:HTMLDivElement= document.createElement("div");
let table1:HTMLTableElement=this.createHTMLTableElement();
TableContainer.appendChild(table1);
this._container.appendChild(TableContainer);
this._container.appendChild(this._Buttoncontainer);

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
	 * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
	 * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
	 */


	/** 
	 * It is called by the framework prior to a control receiving new data. 
	 * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as “bound” or “output”
	 */
	public getOutputs(): IOutputs
	{
		return {};
	}
private createHTMLTableElement(): HTMLTableElement
		{
			// Create HTML Table Element
let tableElement: HTMLTableElement = document.createElement("table");
let inputRow1:	 HTMLTableRowElement = document.createElement("tr");
let input1lable: HTMLTableCellElement=document.createElement("td");
input1lable.appendChild(this._lable1);
let input1Text: HTMLTableCellElement=document.createElement("td");
input1lable.appendChild(this._input1);
inputRow1.appendChild(input1lable);
inputRow1.appendChild(input1Text);
tableElement.appendChild(inputRow1);
let inputRow2:	 HTMLTableRowElement = document.createElement("tr");
let input2lable: HTMLTableCellElement=document.createElement("td");
input1lable.appendChild(this._lable2);
let input2Text: HTMLTableCellElement=document.createElement("td");
input1lable.appendChild(this._input2);
inputRow2.appendChild(input2lable);
inputRow2.appendChild(input2Text);
tableElement.appendChild(inputRow2);


let inputRow3:	 HTMLTableRowElement = document.createElement("tr");
let outputLable: HTMLTableCellElement=document.createElement("td");
outputLable.appendChild(this._lblOutput);
let outputText: HTMLTableCellElement=document.createElement("td");
outputText.appendChild(this._output);
inputRow3.appendChild(outputLable);
inputRow3.appendChild(outputText);
tableElement.appendChild(inputRow3);
		return tableElement;
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